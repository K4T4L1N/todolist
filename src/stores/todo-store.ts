import { observable, action, computed } from "mobx"
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  icon: string;
}

export type Filters = 'All' | 'Completed' | 'Active'

export class TodoStore {
  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Task #1", completed: false , icon: "check-circle" },
    { id: uuidv4(), title: "Task #2", completed: false , icon: "check-circle"},
    { id: uuidv4(), title: "Task #3", completed: false , icon: "check-circle"},
    { id: uuidv4(), title: "Task #4", completed: false , icon: "check-circle"},
    { id: uuidv4(), title: "Task #5", completed: false , icon: "check-circle"},
    { id: uuidv4(), title: "Task #6", completed: false , icon: "check-circle"},
  ]

  @observable filter: Filters = 'All';

  @action setFilter = (filter: Filters) => {
    this.filter = filter;
  }

  @action addTodo = (title: string) => {
    this.todos.push({ title, id: uuidv4(), completed: false , icon: "close"})
  }
  @action changeIcon = (title: string, icon: string) => {
    this.todos.push({ title, id: uuidv4(), completed: false , icon: "check-circle"})
  }
  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed, icon: "repeat"

        }
      }
      return todo
    })
  }

  
  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  @action editTodo = (title: string) => {
    this.todos.push({ title, id: uuidv4(), completed: false , icon: "close"})
  }

  @computed get total() {
    return this.todos.length;
  }

  @computed get filteredTodos() {
    switch(this.filter) {
      case 'All': {
        return this.todos
      }

      case 'Completed': {
        return this.todos.filter(i => i.completed);
      }

      case 'Active': {
        return this.todos.filter(i => !i.completed);
      }

      default: {
        return this.todos;
      }
    }
  }
}
