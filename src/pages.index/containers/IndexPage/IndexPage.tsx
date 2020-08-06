import Head from 'next/head'
import { useState, useEffect } from 'react'
import { doctors } from '../../../shared/data/doctors'

import request from '../../../shared/helpers/request'

import * as appointment from '../../../api/shared/appointment'

import { DoctorSelection } from '../../components/DoctorSelection'
import { TimeSelection, Busies } from '../../components/TimeSelection'

import * as Styles from './IndexPage.styles'

type SubmitState = {
  wait: boolean
  success: boolean
}
type BusiesState = {
  wait: boolean
  busies: Busies
}

export const IndexPage = () => {
  const [error, setError] = useState<string>(null)

  const {
    fields, updateFields,
    submitState,
    submit
  } = getFieldsAndSubmit({setError})

  const [busiesState, setBusiesState] = useState<BusiesState>({
    wait: true,
    busies: null
  })
  function updateBusiesState (props: Partial<BusiesState>) {
    setBusiesState({...busiesState, ...props})
  }
  useEffect(() => {
    updateBusiesState({
      wait: true,
    })
    getBusies({
      doctorID: fields.doctorID,
      setError,
      }).then(busies => {
        updateBusiesState({
          wait: false,
          busies, 
        })
      })
  }, [fields.doctorID])

  return (
    <>
      <Head>
        <title>
          St Group Test: Запись на прием
        </title>
      </Head>
      <Styles.Layout>
        <Styles.NameInput
          type="text"
          placeholder="ФИО*"
          value={fields.name}
          onChange={(e) => {
            if (validateNameInput(e.target.value)) {
              updateFields({name: e.target.value})
            }
          }}
        />
        <Styles.DoctorSelection>
          <DoctorSelection
            onChange={async doctorID => {
              updateFields({doctorID})
            }}
          />
        </Styles.DoctorSelection>
        <Styles.TimeSelection>
          {busiesState.wait? (
            'Загрузка...'
          ):(
            <TimeSelection
              busies={busiesState.busies}
              onChange={(date, time) => {
                updateFields({
                  date,
                  time,
                })
              }}
            />
          )}
        </Styles.TimeSelection>
        <Styles.Complaints>
          <div className="title">
            Жалобы:
          </div>
          <textarea
            onChange={(e) => {
              updateFields({complaints: e.target.value})
            }}
          />
        </Styles.Complaints>
        {error && (
          <Styles.Status className="error">
            {error}
          </Styles.Status>
        )}
        {submitState.success && (
          <Styles.Status className="success">
            Запись успешна создана
          </Styles.Status>
        )}
        <Styles.Submit onClick={submit}>
          {submitState.wait?'Отправка...':'Отправить'}
        </Styles.Submit>
        <Styles.Info>
          * - поля, обязательные для заполнения/выбора
        </Styles.Info>
      </Styles.Layout>
    </>
  )
}

function getFieldsAndSubmit ({setError}) {
  const [fields, setFields] = useState<appointment.PostProps>({
    name: '',
    doctorID: doctors[0].id,
    date: null,
    time: null,
  })
  function updateFields (props: Partial<appointment.PostProps>) {
    setFields({...fields, ...props})
  }

  const [submitState, setSubmitState] = useState<SubmitState>({
    wait: false,
    success: false,
  })
  function updateSubmitState (props: Partial<SubmitState>) {
    setSubmitState({...submitState, ...props})
  }

  function submit () {
    if (submitState.wait || submitState.success) {
      return
    }
    const error = appointment.validatePost(fields)
    if (error) {
      setError(error)
      return
    }
    setError(null)
    updateSubmitState({wait: true})
    request(`post`, appointment.api, fields, () => {
      setError(null)
      updateSubmitState({
        success: true,
        wait: false,
      })
    }, error => {
      setError(error)
      updateSubmitState({wait: false})
    })
  }

  return {
    fields, updateFields,
    submitState,
    submit
  }
}

function validateNameInput (name: string) {
  return /^[a-zA-Zа-яА-Я ]*$/.test(name)
}

function getBusies ({doctorID, setError}) {
  return new Promise<Busies>(resolve => {
    request(`get`, `${appointment.api}/busies`, {doctorID}, (data) => {
      const map = {}
      data.result.forEach(entry => {
        map[entry.date] = map[entry.date] || {}
        map[entry.date][entry.time] = true
      })
      resolve(map)
    }, error => {
      resolve()
      setError(error)
    })
  })
}
