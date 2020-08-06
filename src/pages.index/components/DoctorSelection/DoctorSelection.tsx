import { Dispatch, SetStateAction, useState } from 'react'

import { doctors } from '../../../shared/data/doctors'

import request from '../../../shared/helpers/request'

import * as appointment from '../../../api/shared/appointment'

type Props = {
  onChange?: (doctorID: number) => void
}

export const DoctorSelection = ({onChange}: Props) => {
  const [doctorID, setDoctorID] = useState(doctors[0].id)

  return (
    <>
      <div className="title">
        Выберите врача*:
      </div>
      <select
        className="select"
        name="doctor"
        value={doctorID}
        onChange={(e) => {
          const newDoctorID = parseInt(e.target.value)
          setDoctorID(newDoctorID)
          onChange(newDoctorID)
        }}
      >
        {doctors.map(doctor =>
          <option
            value={doctor.id}
            key={doctor.id}
          >
            {doctor.name}
          </option>)}
      </select>
    </>
  )
}