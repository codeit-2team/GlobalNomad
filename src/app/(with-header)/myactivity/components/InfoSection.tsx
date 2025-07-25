'use client';

import Input from '@/components/Input';
import AddressInput from './AddressInput';
import CategoryInput from './CategoryInput';

interface InfoSectionProps {
  title?: string;
  category?: string;
  price?: number;
  description?: string;
  address?: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export function InfoSection({
  title = '',
  category = '',
  price = 0,
  description = '',
  address = '',
  onTitleChange,
  onCategoryChange,
  onPriceChange,
  onDescriptionChange,
  onAddressChange,
}: InfoSectionProps) {
  return (
    <section className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <Input
            label='제목'
            id='title'
            type='text'
            placeholder='체험의 제목을 입력해주세요'
            className='w-full'
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>

        <CategoryInput
          category={category}
          onCategoryChange={onCategoryChange}
        />

        <div>
          <div className='relative'>
            <Input
              label='가격'
              type='number'
              placeholder='0'
              className='w-full appearance-none'
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
            />
            <span className='absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500'>
              원
            </span>
          </div>
        </div>
      </div>

      <div>
        <Input
          label='설명'
          type='textarea'
          placeholder='체험에 대한 자세한 설명을 입력해주세요'
          className='w-full'
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div>
        <AddressInput onAddressChange={onAddressChange} address={address} />
      </div>
    </section>
  );
}
