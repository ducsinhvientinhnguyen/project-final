import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function getImageUrl(id) {
  const bucketUrl = process.env.TODOS_S3_BUCKET
  const key = id
  const expire = process.env.SIGNED_URL_EXPIRATION
  const ObjectCommand = {
    Bucket: bucketUrl,
    Key: key,
  }
  const putCommand = new PutObjectCommand(ObjectCommand)
  return await getSignedUrl(new S3Client(), putCommand, { expiresIn: expire,})
}
