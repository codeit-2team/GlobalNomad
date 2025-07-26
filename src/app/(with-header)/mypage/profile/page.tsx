'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';

export default function ProfilePage() {
  const { user } = useMyPageStore();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    nickname: user?.nickname || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: '',
  });

  // 입력 값 변경 핸들러
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // 저장 핸들러
  const handleSave = () => {
    console.log('저장할 데이터:', formData);
    alert('저장되었습니다!');
  };

  return (
    <div className='w-full max-w-none lg:max-w-[792px]'>
      {/* 제목과 저장하기 버튼 */}
      <div className='mb-24 flex items-center justify-between'>
        <h1 className='text-nomad text-[32px] leading-[42px] font-bold'>
          내 정보
        </h1>
        <Button
          variant='primary'
          className='text-md h-56 w-100 rounded md:w-120 md:text-lg'
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>

      {/* 폼 섹션 */}
      <div className='space-y-32'>
        {/* 닉네임 */}
        <div>
          <label className='mb-16 block text-[24px] leading-[32px] font-bold text-black'>
            닉네임
          </label>
          <Input
            type='text'
            value={formData.nickname}
            onChange={handleInputChange('nickname')}
            placeholder='닉네임을 입력해주세요'
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className='mb-16 block text-[24px] leading-[32px] font-bold text-black'>
            이메일
          </label>
          <Input
            type='email'
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder='이메일을 입력해주세요'
            disabled
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className='mb-16 block text-[24px] leading-[32px] font-bold text-black'>
            비밀번호
          </label>
          <Input
            type='password'
            value={formData.newPassword}
            onChange={handleInputChange('newPassword')}
            placeholder='8자 이상 입력해 주세요'
          />
        </div>

        {/* 비밀번호 재입력 */}
        <div>
          <label className='mb-16 block text-[24px] leading-[32px] font-bold text-black'>
            비밀번호 재입력
          </label>
          <Input
            type='password'
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder='비밀번호를 한번 더 입력해 주세요'
          />
        </div>
      </div>
    </div>
  );
}
