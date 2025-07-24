'use client';

import Input from '@/components/Input';
import AddressInput from './AddressInput';

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

        <div>
          <label
            htmlFor='category'
            className='mb-2 block text-sm font-medium text-gray-700'
          >
            카테고리 *
          </label>
          <select
            id='category'
            className='w-full rounded-md border bg-white px-20 py-15 placeholder-gray-600'
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value=''>카테고리를 선택해주세요</option>
            <option value='outdoor'>문화/예술</option>
            <option value='culture'>식음료</option>
            <option value='food'>스포츠</option>
            <option value='craft'>투어</option>
            <option value='craft'>관광</option>
            <option value='craft'>웰빙</option>
          </select>
        </div>

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
