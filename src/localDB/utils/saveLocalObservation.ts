import { RequestBody } from '@src/types/observation';
import database from '../index';

const saveLocalObservation = async (query: string, body: RequestBody) => {
    await database.write(async () => {
      const observations = await database.get(query).create(observation => {
        observation.body = JSON.stringify(body) 
        observation.created_at = new Date()
      })
      return observations
    })
}

const resetLocalDB = async () => {
    await database.write(async () => {
      await database.unsafeResetDatabase()
    })
}

export {
    saveLocalObservation,
    resetLocalDB
};
