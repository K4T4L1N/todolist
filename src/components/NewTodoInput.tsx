import React, { useState } from 'react';
import { Flex, Input, IconButton, useToast } from '@chakra-ui/core';
import { TodoStore } from '../stores/todo-store';


interface INewTodoInputProps {
  addTodo: TodoStore['addTodo'];
}

const NewTodoInput: React.FC<INewTodoInputProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const toast = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      return toast({
        title: 'Sorry',
        description: 'Todo text is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    addTodo(title);
    toast({
      title: 'Success',
      description: 'Todo added',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setTitle('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Flex as="form" onSubmit={onSubmit}>
      <Input
        flex="1"
        placeholder="Enter todo..."
        value={title}
        onChange={onChange}
      />
      <IconButton
        type="submit"
        variantColor="purple"
        ml="3"
        aria-label="Add todo"
        icon="add"
      />
    </Flex>
  );
};

export default NewTodoInput;
