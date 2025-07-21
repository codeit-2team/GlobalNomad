'use client';

import { useState, FormEvent } from 'react';
import cn from '@lib/cn';
import Input from '@components/Input';
import Button from '@components/Button';
import IconBed from '@assets/svg/bed';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('검색어:', searchValue); // 검색 로직은 추후 API 연동
  };

  return (
    <section className="flex justify-center mt-8 px-4 bg-yellow-200 p-4 text-xl text-center">
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex w-full max-w-2xl rounded-full bg-white shadow-md overflow-hidden',
        )}
      >
        <div className="flex-1">
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="무엇을 체험하고 싶으신가요?"
            className="text-sm px-5 py-3 border-none"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          className="px-4 py-3 text-sm font-semibold rounded-none rounded-r-full"
        >
          검색
        </Button>
      </form>
    </section>
  );
}
