import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Divider,
  Text,
  IconButton,
  Input,
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
  editTodo: TodoStore['editTodo'];
}

const TodoItem: React.FC<ITodoItemProps> = ({
  id,
  title,
  completed,
  hasDivider,
  removeTodo,
  toggleTodo,
  editTodo,
}) => {
  const toast = useToast();
  const { onCopy, hasCopied } = useClipboard(title);
  const [is3dCheckBox, setAgreement] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(title);

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

  const handleEditTodo = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      editTodo(id, editedText);
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Todo updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditedText(title);
    setIsEditing(false);
  };

  return (
    <>
      <Flex p="10px" alignItems="center">
        <IconButton
          aria-label="Complete"
          icon="check"
          onClick={() => toggleTodo(id)}
          textDecoration={completed ? 'line-through' : 'none'}
        />

        {isEditing ? (
          <Input
            ml="2"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              }
              if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
          />
        ) : (
          <Text
            ml="2"
            cursor="pointer"
            onClick={() => toggleTodo(id)}
            isTruncated
            textDecoration={completed ? 'line-through' : 'none'}
          >
            {title}
          </Text>
        }

        <Box>


          {isEditing ? (
            <>
              <IconButton
                ml="2"
                aria-label="Save edit"
                icon="check"
                onClick={handleSaveEdit}
              />
              <IconButton
                ml="2"
                aria-label="Cancel edit"
                icon="close"
                onClick={handleCancelEdit}
              />
            </>
          ) : (
            <>
              <IconButton
                ml="2"
                aria-label="Edit todo"
                icon="edit"
                onClick={handleEditTodo}
              />
              <IconButton
                ml="2"
                aria-label="Delete todo"
                icon="delete"
                variantColor="red"
                onClick={() => handleRemoveTodo(id)}
              />
            </>
          )}
        </Box>
      </Flex>
      {hasDivider && <Divider />}
    </>
  );
};

export default TodoItem;