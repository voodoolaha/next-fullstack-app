import type { Todo } from '@prisma/client';
import { db } from '@/db';
import { notFound } from 'next/navigation';

export async function fetchTodos(): Promise<Todo[]> {
  return await db.todo.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  const todo = await db.todo.findFirst({
    where: {
      id,
    },
  });

  if (!todo) {
    notFound();
  }
  return todo;
}
