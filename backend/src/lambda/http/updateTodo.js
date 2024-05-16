import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateNewToDoTask } from '../../businessLogic/todos.mjs'
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
    const { pathParameters, body } = event
    const userId = getUserId(event)
    await updateNewToDoTask(JSON.parse(body), pathParameters.todoId, userId)
    return {
      statusCode: 200
    }
  })