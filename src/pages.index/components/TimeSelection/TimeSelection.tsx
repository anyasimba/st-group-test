import { useState, useEffect } from 'react'

import { times } from '../../../shared/data/times'

import { formatDate } from '../../../shared/helpers/formatDate'

import * as Styles from './TimeSelection.styles'

type Props = {
  busies: Busies
  onChange?: (date: Date, time: string) => void
}
export type Busies = {
  [x: string]: {
    [x: string]: boolean
  }
}

export const TimeSelection = ({busies, onChange}: Props) => {
  const [selected, setSelected] = useState<number>(null)
  const [datesState, setDatesState] = useState<DateState[]>([])

  useEffect(() => {
    setDatesState(InitialDatesState())
  }, [])

  const dateState = selected != null?datesState[selected]:null
  function setDateState (dateState) {
    const newDatesState = [...datesState]
    newDatesState[selected] = dateState
    setDatesState(newDatesState)
  }
  const times = dateState?.times

  function Time (time: string) {
    const isSelected = dateState.selectedTime === time
    const isBusy = busies[dateState.date.toJSON()]?
      busies[dateState.date.toJSON()][time]:false

    return (
      <div
        key={time}
        className={`
          time
          ${isSelected?'selected':''}
          ${isBusy?'busy':'free'}
        `}
        onClick={isBusy?null:() => {
          const newDateState = {
            ...dateState,
            selectedTime: time,
          }
          setDateState(newDateState)
          onChange && onChange(newDateState.date, newDateState.selectedTime)
        }}
      >
        {time}
      </div>
    )
  }

  return (
    <>
      <div className="title">Выберите время приема*:</div>
      <Styles.TimeSelectionSelect>
        <div className="tabs">
          {datesState.map((dateState, i) =>
            <div
              key={dateState.dateString}
              className={`tab ${selected === i?'selected':''}`}
              onClick={() => {
                setDatesState(datesState.map(dateState => {
                  return {...dateState, selectedTime: null}
                }))
                setSelected(i)
                onChange && onChange(dateState.date, dateState.selectedTime)
              }}
            >
              {dateState.dateString}
            </div>)}
        </div>
        {selected != null && <div className="times">
          {times?.map(time => Time(time))}
        </div>}
      </Styles.TimeSelectionSelect>
    </>
  )
}

type TimeState = string

type DateState = {
  date: Date
  dateString: string
  times: TimeState[]
  selectedTime: string
}

function InitialDatesState () {
  const dateNow = new Date()

  const dates: DateState[] = []
  for (let i = 0; i < 7; ++i) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(dateNow.getDate() + i)

    dates.push({
      date,
      dateString: formatDate(date),
      times: [...times],
      selectedTime: null,
    })
  }
  return dates;
}
