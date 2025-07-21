'use client';

import { useState } from 'react';
import Dropdown from '@components/Dropdown';
import { ACTIVITY_CATEGORIES, ActivityCategory } from '@/constants/categories';

export default function DropdownExample() {
  const [category, setCategory] = useState<ActivityCategory | ''>('');

  return (
    <div className='min-h-screen p-40'>
      <h1 className='text-24 mb-40 font-bold'>Dropdown 테스트</h1>

      {/* 카테고리 드롭다운 UI 확인 */}
      <Dropdown
        className='h-56 w-800'
        options={ACTIVITY_CATEGORIES}
        value={category}
        onChange={setCategory}
        placeholder='카테고리'
      />
    </div>
  );
}
