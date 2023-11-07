import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Divider,
  Text,
  IconButton,
  useToast,
  useClipboard,
} from '@chakra-ui/core';
import { useState } from "react";
import { Todo } from '../stores/todo-store';
import { TodoStore } from '../stores/todo-store';
import { Checkbox } from './checkbox';

interface ITodoItemProps extends Todo {
  hasDivider: boolean;
  removeTodo: TodoStore['removeTodo'];
  toggleTodo: TodoStore['toggleTodo'];
}

const TodoItem: React.FC<ITodoItemProps> = ({
  id,
  title,
  completed,
  hasDivider,
  removeTodo,
  toggleTodo,
}) => {
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(title);
  const [is3dCheckBox, setAgreement] = useState(false);

  const handleChange = (event) => {
    setAgreement(event.target.checked);
  }

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Success',
        description: 'Copied to clipboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [hasCopied]);

  const handleRemoveTodo = (id: string) => {
    removeTodo(id);
    toast({
      title: 'Success',
      description: 'Todo removed',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    
  };

  return (
    <>
      <Flex  p="10px" alignItems="center">
         <input id="is3dCheckBox" type="checkbox" onChange={handleChange} onClick={() => toggleTodo(id)} />
        <Text
          ml="2"
          cursor="pointer"
          onClick={() => toggleTodo(id)}
          isTruncated
          flex="1"
          textDecoration={completed ? 'line-through' : 'none'}
        >
          {title}
        </Text>
        <Box>
          <IconButton
            aria-label="Copy to clipboard"
            icon="copy"
            onClick={onCopy}
          />
          <IconButton
            ml="2"
            aria-label="Delete todo"
            icon="delete"
            variantColor="red"
            onClick={() => handleRemoveTodo(id)}
          />
        </Box>
      </Flex>
      {hasDivider && <Divider />}
    </>
  );
};

export default TodoItem;
