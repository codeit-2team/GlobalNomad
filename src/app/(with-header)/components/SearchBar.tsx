'use client';

import Button from '@components/Button';
import Input from '@components/Input';
import { useRouter } from 'next/navigation'; // ✅ App Router에서 import
import { FormEvent, useState, useEffect } from 'react';

interface SearchBarProps {
  keyword: string;
}

export default function SearchBar({ keyword }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(keyword);
  const router = useRouter(); // useRouter는 반드시 클라이언트에서 선언되어야 함

  // ✅ 검색 버튼 클릭 시 쿼리 파라미터 변경
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    router.push(`/?q=${encodeURIComponent(trimmed)}`);
  };

  // 외부에서 keyword prop이 바뀌면 input도 동기화
  useEffect(() => {
    setSearchValue(keyword);
  }, [keyword]);

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
            className='flex flex-row gap-12 h-56'
            onSubmit={handleSubmit}
          >
            <div className='relative flex-1'>
              <Input
                placeholder='내가 원하는 체험은'
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Button
              className='w-96 h-56 rounded-[4px] md:w-136 md:h-56'
              type='submit'
              variant='primary'
            >
              검색하기
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
