import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Divider,
  Text,
  IconButton,
  useToast,
  useClipboard,
} from '@chakra-ui/core';
import { Todo } from '../stores/todo-store';
import { TodoStore } from '../stores/todo-store';
import { Checkbox } from './checkbox';

interface ITodoItemProps extends Todo {
  hasDivider: boolean;
  removeTodo: TodoStore['removeTodo'];
  toggleTodo: TodoStore['toggleTodo'];
  editTodo: TodoStore['editTodo']
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

  function editTodo(title: string): React.MouseEventHandler<any> | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Flex  p="10px" alignItems="center">
         <IconButton
            aria-label="Complete"
            icon="check"
            onClick={() => toggleTodo(id)}
            textDecoration={completed ? 'line-through' : 'none'}
          />
          
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
