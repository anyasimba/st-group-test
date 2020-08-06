import { NextApiResponse } from 'next'
import Ajv, { ajvValidate } from './@base/ajv'

import dbPromise from './@base/db'

import * as appointment from './shared/appointment'
export * from './shared/appointment'

const ajv = new Ajv()
const collectionName = 'appointment'

const ajvPost = ajv.compile({
  properties: {
    name: {type: 'string'},
    doctorID: {type: 'number'},
    date: {type: 'string'},
    time: {type: 'string'},
    complaint: {type: 'string'},
  }
})
export async function post (props: appointment.PostProps, response: NextApiResponse) {
  if (!ajvValidate(ajv, response, ajvPost, props)) {
    return
  }
  const error = appointment.validatePost(props)
  if (error) {
    response.send({error})
    return
  }

  const db = await dbPromise
  const collection = db.collection(collectionName)
  
  const exists = await collection.findOne({
    doctorID: props.doctorID,
    date: props.date,
    time: props.time
  })
  if (exists != null) {
    response.status(400).end()
    return
  }
  
  await collection.insertOne(props)
  response.status(200).end()
}

const ajvDelete = ajv.compile({
  properties: {
    doctorID: {type: 'number'},
    date: {type: 'string'},
    time: {type: 'string'},
  }
})
export async function remove (props: appointment.DeleteProps, response: NextApiResponse) {
  if (!ajvValidate(ajv, response, ajvDelete, props)) {
    return
  }
  const error = appointment.validateDelete(props)
  if (error) {
    response.send({error})
    return
  }

  const db = await dbPromise
  const collection = db.collection(collectionName)
  
  await collection.deleteOne(props)
  response.status(200).end()
}

const ajvBusies = ajv.compile({
  properties: {
    doctorID: {type: 'number'},
  }
})
export async function busies (props: appointment.BusiesProps, response: NextApiResponse) {
  if (!ajvValidate(ajv, response, ajvBusies, props)) {
    return
  }

  const {doctorID} = props

  const db = await dbPromise
  const collection = db.collection(collectionName)
  const today = new Date
  today.setHours(0, 0, 0, 0)
  const result = (await collection.find({
    doctorID,
    date: {
      $gte: today
    }
  }).toArray()).map(entry => {
    return {
      date: entry.date,
      time: entry.time,
    }
  })
  response.send({result})
}

const ajvList = ajv.compile({
  properties: {
    doctorID: {type: 'number'},
    date: {type: 'string'},
  }
})
export async function list (props: appointment.ListProps, response: NextApiResponse) {
  if (!ajvValidate(ajv, response, ajvList, props)) {
    return
  }
  const error = appointment.validateList(props)
  if (error) {
    response.send({error})
    return
  }

  const {doctorID, date} = props

  const db = await dbPromise
  const collection = db.collection(collectionName)
  const result = (await collection.find({
    doctorID,
    date,
  }).toArray()).map(entry => {
    return {
      name: entry.name,
      time: entry.time,
      complaints: entry.complaints,
    }
  }).sort((a, b) => a.time.localeCompare(b.time))
  response.send({result})
}
