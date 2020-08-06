import { NextApiRequest, NextApiResponse } from 'next';

import * as appointment from '../../../src/api/appointment'

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    switch (request.method) {
      case 'GET':
        await appointment.list(JSON.parse(request.query.json as string), response)
        break
      default:
        response.status(400).end()
    }
  } catch (error) {
    response.send({error: error.toString()})
  }
};
