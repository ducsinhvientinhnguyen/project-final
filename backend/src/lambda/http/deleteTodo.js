import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTaskTodo } from '../../businessLogic/todos.mjs'
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
    const {pathParameters} = event
    const userId = getUserId(event)
    const key = pathParameters.todoId
    await deleteTaskTodo(key, userId)
    return {
      statusCode: STATUS_CODE_SUCCESS
    }
  })
