import { useState, useEffect } from 'react'

import { formatDate } from '../../../shared/helpers/formatDate'

import * as Styles from './TimeSelection.styles'

type Props = {
  onChange?: (date: Date) => void
}

export const TimeSelection = ({onChange}: Props) => {
  const [selected, setSelected] = useState<number>(null)
  const [datesState, setDatesState] = useState<DateState[]>([])

  useEffect(() => {
    setDatesState(InitialDatesState())
  }, [])

  return (
    <>
      <div className="title">Выберите дату приема*:</div>
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
                onChange && onChange(dateState.date)
              }}
            >
              {dateState.dateString}
            </div>)}
        </div>
      </Styles.TimeSelectionSelect>
    </>
  )
}

type DateState = {
  date: Date
  dateString: string
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
    })
  }
  return dates;
}
