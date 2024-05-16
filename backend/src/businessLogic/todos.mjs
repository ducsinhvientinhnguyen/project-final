import { DBCRUD } from '../dataLayer/todosAccess.mjs'
import { v4 as uuidv4 } from 'uuid';


const CRUD = new DBCRUD()

export const getTaskList = async (userId) => await CRUD.getListTaskNeedTodo(userId)

export const deleteTaskTodo = async (todoId, userId) =>{
  await CRUD.deleteOldTask(todoId, userId)
}

export const updateNewToDoTask = async (input, todoId, userId) =>{
  const updateTask = {
    todoId: todoId,
    name: input.name,
    dueDate: input.dueDate,
    done: input.done,
    userId: userId
  }
  await CRUD.updateOldTask(updateTask)
}
  

export const createNewToDoTask = async (input, userId) => {
  const todoId = uuidv4()
  const bucketUrl =  `https://${process.env.TODOS_S3_BUCKET}.s3.amazonaws.com/${todoId}`
  const createdAt = new Date().toISOString()
  const isDone = false
  const newTaskToDo = {
    todoId: todoId,
    name: input.name,
    userId: userId,
    dueDate: input.dueDate,
    createdAt: createdAt,
    done: isDone,
    attachmentUrl: bucketUrl
  }
  await CRUD.createNewTask(newTaskToDo)
  return newTaskToDo
}


