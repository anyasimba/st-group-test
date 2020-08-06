import Axios, { Method } from 'axios';

export default function request (method: Method, url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) {
  const body: {params?, data?} = {}
  switch (method) {
    case 'get':
    case 'GET':
      body.params = {json: JSON.stringify(data)}
      break
    default:
      body.data = data
  }
  return Axios.request({
    method,
    url,
    headers: { 'Content-Type': 'application/json' },
    ...body,
  }).then(({data}) => {
    if (data.error != null) {
      onError(data.error)
    } else {
      onSuccess(data)
    }
  }, error => {
    onError(error.toString())
  })
}