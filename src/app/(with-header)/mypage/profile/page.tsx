'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';
import {
  validatePassword,
  validatePasswordConfirmation,
} from '@/utils/validateInput';
import { useUpdateProfile } from '@/hooks/useMyPageQueries';
import { UpdateProfileRequest } from '@/types/mypageTypes';

export default function ProfilePage() {
  const { user } = useMyPageStore();

  const updateProfileMutation = useUpdateProfile();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 에러 상태 추가
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  // user 데이터가 로드되면 폼 업데이트
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nickname: user.nickname || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  // 입력 값 변경 핸들러
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // 비밀번호 유효성 검사
  const handlePasswordBlur = () => {
    setErrors((prev) => ({
      ...prev,
      newPassword: validatePassword(formData.newPassword),
    }));
  };

  // 비밀번호 확인 유효성 검사
  const handleConfirmPasswordBlur = () => {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validatePasswordConfirmation(
        formData.confirmPassword,
        formData.newPassword,
      ),
    }));
  };

  // 저장 핸들러
  const handleSave = () => {
    // 저장 전 최종 유효성 검사
    const passwordError = formData.newPassword
      ? validatePassword(formData.newPassword)
      : '';
    const confirmPasswordError = formData.newPassword
      ? validatePasswordConfirmation(
          formData.confirmPassword,
          formData.newPassword,
        )
      : '';

    if (passwordError || confirmPasswordError) {
      setErrors({
        newPassword: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    const updateData: UpdateProfileRequest = {
      nickname: formData.nickname,
    };

    // 비밀번호가 입력된 경우에만 포함
    if (formData.newPassword && formData.newPassword.trim() !== '') {
      updateData.newPassword = formData.newPassword;
    }

    updateProfileMutation.mutate(updateData);
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
            onBlur={handlePasswordBlur}
            error={errors.newPassword}
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
            onBlur={handleConfirmPasswordBlur}
            error={errors.confirmPassword}
            placeholder='비밀번호를 한번 더 입력해 주세요'
          />
        </div>
      </div>
    </div>
  );
}
