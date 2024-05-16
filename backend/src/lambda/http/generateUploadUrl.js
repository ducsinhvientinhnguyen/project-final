import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getImageUrl } from '../../fileStorage/attachmentUtils.mjs'

const STATUS_CODE_SUCCESS = 200
export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const { todoId } = event.pathParameters
    const imageUrl = await getImageUrl(todoId)
    return {
      statusCode: STATUS_CODE_SUCCESS,
      body: JSON.stringify({
        uploadUrl: imageUrl
      })
    }
  })
