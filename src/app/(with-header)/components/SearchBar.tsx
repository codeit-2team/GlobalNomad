'use client';

import { useState, FormEvent } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('검색어:', searchValue); // 검색 로직은 추후 API 연동
  };

  return (
    <section className='flex lg:w-full lg:max-w-1200 lg:ml-auto lg:mr-auto justify-center px-16 lg:px-0'>
      <div className='flex flex-col w-full gap-15 md:gap-32 px-24 py-16 md:px-24 md:py-32 rounded-[16px] bg-white shadow-md'>
        <div className='flex items-start gap-2 mb-4'>
          <h3 className='text-lg md:text-xl font-bold text-left'>
            무엇을 체험하고 싶으신가요?
          </h3>
        </div>
        <div className='text-center mb-6'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-row gap-12 h-56'
          >
            <div className='relative flex-1'>
              <Input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='내가 원하는 체험은'
              />
            </div>
            <Button
              type='submit'
              variant='primary'
              className='w-96 h-56 rounded-[4px] md:w-136 md:h-56'
            >
              검색하기
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
