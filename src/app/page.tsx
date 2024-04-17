import { TodoForm, TodoList } from '@/components';
import { createTodo } from './actions/todos';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-4'>
        <TodoForm formAction={createTodo} initialData={{ title: '' }} />
      </div>
      <div className='mb-4'>
        <TodoList />
      </div>
    </main>
  );
}
