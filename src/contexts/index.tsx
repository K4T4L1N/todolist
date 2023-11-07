import React from 'react'
import { TodoStore } from '../stores/todo-store'

export const storesContext = React.createContext({
  todoStore: new TodoStore(),
});