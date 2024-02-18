import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodo(activityId: number) {
    return axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${activityId}`);
  }

  getTodoDetail(todoId: number) {
    return axios.get(`https://todo.api.devcode.gethired.id/todo-items/${todoId}`);
  }

  createTodo(activityId: number, todoTitle: string, todoPriority: string) {
    return axios.post('https://todo.api.devcode.gethired.id/todo-items', {
        activity_group_id: activityId,
        title: todoTitle,
        _comment: todoPriority
    })
  }

  updateTodo(todoId: number, todoTitle: string, todoPriority: string) {
    return axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${todoId}`, {
        title: todoTitle,
        priority: todoPriority
    })
  }

  removeTodo(id: number) {
    return axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
  }
}
