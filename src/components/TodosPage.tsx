import React from 'react';
import { Box, Flex, Text, Tag } from '@chakra-ui/core';

import { useObserver } from 'mobx-react-lite';

import NewTodoInput from './NewTodoInput';
import TodoItem from './TodoItem';
import { useStores } from '../hooks/use-stores';
import { Filters } from '../stores/todo-store';

const TodosPage = () => {
  const { todoStore } = useStores();
  const filterTypes = ['All', 'Completed', 'Active'];

  const filterTodos = (filter: Filters) => {
    todoStore.setFilter(filter);
  };

  return useObserver(() => (
    <Flex p="5" justifyContent="center">
      <Box
        borderWidth="1px"
        width={{ base: '100%', md: '40%' }}
        rounded="lg"
        overflow="hidden"
      >
        <Box p="4">
          <NewTodoInput addTodo={todoStore.addTodo} />
          <Box mt="3">
            {filterTypes.map((filter) => (
              <Tag
                mr="2"
                key={filter}
                as="button"
                onClick={() => filterTodos(filter as Filters)}
              >
                {filter}
              </Tag>
            ))}
          </Box>
          <Box mt="3">
            {!todoStore.total && (
              <Box textAlign="center">
                <Text>Todos empty.</Text>
              </Box>
            )}
            {todoStore.filteredTodos.map((todo, idx) => (
              <TodoItem
                key={todo.id}
                {...todo}
                hasDivider={todoStore.total !== idx + 1}
                removeTodo={todoStore.removeTodo}
                toggleTodo={todoStore.toggleTodo}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Flex>
  ));
};

export default TodosPage;
