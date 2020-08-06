import { doctors } from '../../shared/data/doctors'
import { times } from '../../shared/data/times'

export const api = '/api/appointment'

export type PostProps = {
  name: string
  doctorID: number
  date: Date
  time: string
  complaints?: string
}
export function validatePost (props: PostProps): string|false {
  props.date = new Date(props.date)
  const {
    name,
    doctorID,
    date,
    time,
  } = props

  let error
  if (name == null || name === '') {
    return 'Введите имя'
  }
  error = validateName(name)
  if (error) {
    return error
  }

  if (doctorID == null) {
    return 'Выберите врача'
  }
  if (!doctors.find(doctor => doctor.id === doctorID)) {
    return 'Нет такого врача'
  }
  
  if (date == null) {
    return 'Выберите день записи'
  }
  error = validateDate(date)
  if (error) {
    return error
  }
  
  if (time == null) {
    return 'Выберите время записи'
  }
  error = validateTime(time)
  if (error) {
    return error
  }
  return false
}

function validateName (name: string) {
  if (!/^[a-zA-Zа-яА-Я ]+\ [a-zA-Zа-яА-Я ]+\ [a-zA-Zа-яА-Я ]+$/.test(name)) {
    return 'Некорректное имя'
  }
  return false
}

function validateDate (date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const week = new Date()
  week.setHours(0, 0, 0, 0)
  week.setDate(week.getDate() + 6)

  if (date < today || date > week) {
    return 'Неправильный день записи'
  }
  return false
}

function validateTime (time: string) {
  if (times.indexOf(time) === -1) {
    return 'Неправильное время'
  }
  return false
}

export type BusiesProps = {
  doctorID: number
}

export type ListProps = {
  doctorID: number
  date: Date
}
export type ListResponse = {
  name: string
  time: string
  complaints: string
}[]
export function validateList (props: ListProps): string|false {
  props.date = new Date(props.date)
  return false
}

export type DeleteProps = {
  doctorID: number
  date: Date
  time: string
}
export function validateDelete (props: DeleteProps): string|false {
  props.date = new Date(props.date)
  return false
}
