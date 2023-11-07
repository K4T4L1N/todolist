import { observable, action, computed } from "mobx"
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type Filters = 'All' | 'Completed' | 'Active'

export class TodoStore {
  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false },
  ]

  @observable filter: Filters = 'All';

  @action setFilter = (filter: Filters) => {
    this.filter = filter;
  }

  @action addTodo = (title: string) => {
    this.todos.push({ title, id: uuidv4(), completed: false })
  }

  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
  }

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
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
