import { DynamoDB } from '@aws-sdk/client-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'


export class DBCRUD {
  constructor() {
    this.tableName = process.env.TODOS_TABLE
    this.index = process.env.TODOS_CREATED_AT_INDEX
    this.DB = DynamoDBDocument.from(
      AWSXRay.captureAWSv3Client(new DynamoDB())
    )
  }

  async getListTaskNeedTodo(userId) {
    const {Items} = await this.DB.query({
      TableName: this.tableName,
      IndexName: this.index,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    return Items
  }

  async createNewTask(newTask) {
    await this.DB.put({
      TableName: this.tableName,
      Item: newTask})
  }

  async deleteOldTask(todoId, userId) {
    const keyDelete = { todoId, userId }
    await this.DB.delete({
      TableName: this.tableName,
      Key: keyDelete
    })
  }

  async updateOldTask(newUpdateTask) {
    const keyUpdate = {
      todoId: newUpdateTask.todoId,
      userId: newUpdateTask.userId
    }
    const Expression = 'set #name = :name, dueDate = :dueDate, done = :done'
    const ExpressionInfo = {
      ':name': newUpdateTask.name,
      ':dueDate': newUpdateTask.dueDate,
      ':done': newUpdateTask.done
    }
    const NameExpression = {
      '#name': 'name'
    }
    await this.DB.update({
      TableName: this.tableName,
      Key: keyUpdate,
      UpdateExpression: Expression,
      ExpressionAttributeValues: ExpressionInfo,
      ExpressionAttributeNames: NameExpression
    })
  }
  
}
