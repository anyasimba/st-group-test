import Ajv from 'ajv'
import { NextApiResponse } from 'next'

export default Ajv

export function ajvValidate (ajv: Ajv.Ajv, response: NextApiResponse, validate, props) {
  if (!validate(props)) {
    response.send({error: ajv.errorsText(validate.errors)})
    return false
  }
  return true
}