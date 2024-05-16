import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getTaskList } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'

const STATUS_CODE_SUCCESS = 200

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const userId = getUserId(event)
    const listTask = await getTaskList(userId)
    return {
      statusCode: STATUS_CODE_SUCCESS,
      body: JSON.stringify({ items: listTask })
    }
  })
