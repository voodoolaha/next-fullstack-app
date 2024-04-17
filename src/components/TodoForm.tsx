'use client';

import { useState } from 'react';
import { Input } from '@mui/material';

interface CreateFormProps {
  formAction: any;
  initialData: {
    title: string;
  };
}

export interface FormData {
  title: string;
}

export function TodoForm({ formAction, initialData }: CreateFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, title: e.target.value }));
  };

  const onSubmithandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      formAction(formData);
    }
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-6'>Create Todo</h1>
      <div>
        <div className='mb-4'>
          <Input
            type='text'
            value={formData.title}
            onKeyDown={onSubmithandler}
            onChange={onInputChange}
          />
        </div>
      </div>
    </>
  );
}
