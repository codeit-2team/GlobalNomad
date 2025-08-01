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
    <section className='flex flex-col gap-24 space-y-6'>
      <div className='grid gap-24 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <Input
            id='title'
            type='text'
            placeholder='제목'
            className='w-full'
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>

        <CategoryInput
          category={category}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div>
        <Input
          type='textarea'
          placeholder='체험에 대한 자세한 설명을 입력해주세요'
          className='w-full'
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div className='relative'>
        <p></p>
        <Input
          type='number'
          placeholder='가격'
          className='w-full appearance-none'
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
        />
      </div>

      <div>
        <AddressInput
          onAddressChange={onAddressChange}
          address={address}
        />
      </div>
    </section>
  );
}
