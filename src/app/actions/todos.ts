'use server';

// Import the database client and the Post type from Prisma
import { db } from '@/db';
import type { Todo } from '@prisma/client';
import { FormData } from '@/components';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const todoSchema = z.object({
  title: z.string().min(3).max(255),
});

export async function createTodo(formData: FormData) {
  const result = todoSchema.safeParse({
    title: formData.title,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let todo: Todo;
  try {
    todo = await db.todo.create({
      data: {
        title: result.data.title,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }
}

export async function getTodos() {
  try {
    const todos = db.todo.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return todos;
  } catch (error: unknown) {
    throw new Error();
  }
}

export async function updateTodo(id: string, formData: FormData) {
  const result = todoSchema.safeParse({
    title: formData.title,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let todo: Todo;
  try {
    todo = await db.todo.update({
      where: { id },
      data: {
        title: result.data.title,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteTodo(id: string) {
  try {
    await db.todo.delete({
      where: { id },
    });

    return { message: `Item ${id} succesfully deleted` };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }
}
