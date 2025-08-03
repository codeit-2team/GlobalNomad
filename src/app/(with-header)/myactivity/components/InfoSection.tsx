'use client';

import Input from '@/components/Input';
import AddressInput from './AddressInput';
import CategoryInput from './CategoryInput';
import Textarea from '@/components/Textarea';

interface InfoSectionProps {
  title?: string;
  category?: string;
  price?: string;
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
  price = '',
  description = '',
  address = '',
  onTitleChange,
  onCategoryChange,
  onPriceChange,
  onDescriptionChange,
  onAddressChange,
}: InfoSectionProps) {
  return (
    <section className='flex flex-col gap-24 space-y-6 pt-24'>
      <div>
        <Input
          id='title'
          type='text'
          placeholder='제목'
          className='w-full'
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div>
        <CategoryInput
          category={category}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div>
        <Textarea
          placeholder='설명'
          className='w-full'
          rows={10}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      <div className='relative flex flex-col gap-12 text-xl font-bold text-black'>
        <p>가격</p>
        <Input
          type='number'
          placeholder='가격'
          className='w-full appearance-none'
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
        />
      </div>

      <div className='relative flex flex-col gap-12 text-xl font-bold text-black'>
        <p>주소</p>
        <AddressInput onAddressChange={onAddressChange} address={address} />
      </div>
    </section>
  );
}
