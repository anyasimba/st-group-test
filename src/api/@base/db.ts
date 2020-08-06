import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB_HOST!)
const dbPromise = (async () => {
  await client.connect();
  return client.db(process.env.DB_NAME)
})()
export default dbPromise