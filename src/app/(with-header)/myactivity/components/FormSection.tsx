import type React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export function FormSection({
  title,
  children,
  description,
}: FormSectionProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='border-b border-gray-200 pb-2 text-xl font-semibold text-gray-900'>
          {title}
        </h2>
        {description && (
          <p className='mt-2 text-sm text-gray-600'>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
