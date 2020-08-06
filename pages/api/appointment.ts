import { NextApiRequest, NextApiResponse } from 'next';

import * as appointment from '../../src/api/appointment'

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    switch (request.method) {
      case 'POST':
        await appointment.post(request.body, response)
        break
      case 'DELETE':
        await appointment.remove(request.body, response)
        break
      default:
        response.status(400).end()
    }
  } catch (error) {
    response.send({error: error.toString()})
  }
}
