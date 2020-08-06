import Head from 'next/head'
import { useState, useEffect } from 'react'
import { doctors } from '../../../shared/data/doctors'

import request from '../../../shared/helpers/request'

import * as appointment from '../../../api/shared/appointment'

import { DoctorSelection } from '../../components/DoctorSelection'
import { TimeSelection } from '../../components/TimeSelection'

import * as Styles from './TimeTablePage.styles'

export const TimeTablePage = () => {
  const [fields, setFields] = useState<appointment.ListProps>({
    doctorID: doctors[0].id,
    date: null,
  })
  function updateFields (props: Partial<appointment.ListProps>) {
    setFields({...fields, ...props})
  }

  const [error, setError] = useState<string>(null)
  const [list, setList] = useState<appointment.ListResponse>(null)
  const [waitDelete, setWaitDelete] = useState(false)


  useEffect(() => {
    if (fields.date == null) {
      return
    }

    requestList({fields, setList, setError})
  }, [fields])

  return (
    <>
      <Head>
        <title>St Group Test: Расписание врача</title>
      </Head>
      <Styles.Layout>
        <Styles.DoctorSelection>
          <DoctorSelection
            onChange={async doctorID => {
              updateFields({doctorID})
            }}
          />
        </Styles.DoctorSelection>
        <Styles.TimeSelection>
          <TimeSelection
            onChange={(date) => {
              updateFields({date})
            }}
          />
        </Styles.TimeSelection>
        {list && (
          <table>
            <thead>
              <tr>
                <td>ФИО</td>
                <td>Время</td>
                <td>Жалобы</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {list.map(({name, time, complaints}) => {
                return (
                  <tr key={`${name}-${time}`}>
                    <td>{name}</td>
                    <td>{time}</td>
                    <td>{complaints}</td>
                    <td>
                      <button
                        onClick={() => {
                          setError(null)
                          setWaitDelete(true)
                          request(`delete`, appointment.api, {
                            doctorID: fields.doctorID,
                            date: fields.date,
                            time,
                          }, () => {
                            setWaitDelete(false)
                            requestList({fields, setList, setError})
                          }, error => {
                            setWaitDelete(false)
                            setError(error)
                          })
                        }}
                        disabled={waitDelete}
                      >
                        Отменить
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        {error && (
          <Styles.Error>
            {error}
          </Styles.Error>
        )}
      </Styles.Layout>
    </>
  )
}

function requestList ({fields, setList, setError}) {
  request(`get`, `${appointment.api}/list`, fields, (data) => {
    setList(data.result)
  }, error => {
    setError(error)
  })
}
