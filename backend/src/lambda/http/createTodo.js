import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createNewToDoTask } from '../../businessLogic/todos.mjs'
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
    const { body } = event
    const newTaskToDo = JSON.parse(body)
    const useId = getUserId(event)
    const response = await createNewToDoTask(newTaskToDo, useId)
    return {
      statusCode: STATUS_CODE_SUCCESS,
      body: JSON.stringify({
        item: response
      })
    }
  })
