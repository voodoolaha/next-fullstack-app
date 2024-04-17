'use client';
import { deleteTodo, getTodos } from '@/app/actions/todos';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  createdAt: Date;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const getTodoList = async () => {
    try {
      const response = await getTodos();
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const onTodoDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <>
      {todos &&
        todos.map((todo) => {
          return (
            <div key={todo.id}>
              <div className='mb-4 flex items-center'>
                <h2 className={`mb-3 text-2xl font-semibold`}>{todo.title}</h2>
                <Button color='primary' onClick={() => onTodoDelete(todo.id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
}
