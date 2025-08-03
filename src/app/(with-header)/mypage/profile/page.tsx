'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useMyPageStore from '@/stores/MyPage/useMyPageStore';
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from '@/utils/validateInput';
import { useUpdateProfile, useMyProfile } from '@/hooks/useMyPageQueries';
import { UpdateProfileRequest } from '@/types/mypageTypes';

export default function ProfilePage() {
  const { user } = useMyPageStore();
  const { isLoading, error } = useMyProfile();

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
    nickname: '',
    newPassword: '',
    confirmPassword: '',
  });

  // API 요청 완료 후 비밀번호 필드 초기화
  useEffect(() => {
    if (updateProfileMutation.isSuccess || updateProfileMutation.isError) {
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      setErrors((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
    }
  }, [updateProfileMutation.isSuccess, updateProfileMutation.isError]);

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

  // 닉네임 유효성 검사
  const handleNicknameBlur = () => {
    setErrors((prev) => ({
      ...prev,
      nickname: validateNickname(formData.nickname),
    }));
  };

  // 비밀번호 유효성 검사
  const handlePasswordBlur = () => {
    // 비밀번호를 입력한 경우에만 검증
    if (formData.newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: validatePassword(formData.newPassword),
      }));
    }
  };

  // 비밀번호 확인 유효성 검사
  const handleConfirmPasswordBlur = () => {
    // 비밀번호나 비밀번호 확인을 입력한 경우에만 검증
    if (formData.newPassword || formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validatePasswordConfirmation(
          formData.confirmPassword,
          formData.newPassword,
        ),
      }));
    }
  };

  // 저장 버튼 비활성화
  const isButtonDisabled = () => {
    // API 요청 중이면 비활성화
    if (updateProfileMutation.isPending) return true;

    // 닉네임 에러가 있으면 비활성화
    if (errors.nickname) return true;

    // 비밀번호를 입력했는데 에러가 있으면 비활성화
    if (formData.newPassword && errors.newPassword) return true;

    // 비밀번호 확인 에러가 있으면 비활성화
    if (formData.newPassword && errors.confirmPassword) return true;

    return false;
  };

  // 저장 핸들러
  const handleSave = () => {
    // 저장 전 최종 유효성 검사
    const nicknameError = validateNickname(formData.nickname);
    const passwordError = formData.newPassword
      ? validatePassword(formData.newPassword)
      : '';
    const confirmPasswordError = formData.newPassword
      ? validatePasswordConfirmation(
          formData.confirmPassword,
          formData.newPassword,
        )
      : '';

    if (nicknameError || passwordError || confirmPasswordError) {
      setErrors({
        nickname: nicknameError,
        newPassword: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    const updateData: UpdateProfileRequest = {
      nickname: formData.nickname.trim(),
    };

    // 비밀번호가 입력된 경우에만 포함
    if (formData.newPassword && formData.newPassword.trim() !== '') {
      updateData.newPassword = formData.newPassword;
    }

    updateProfileMutation.mutate(updateData);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className='w-full max-w-none lg:max-w-792'>
        {/* 제목과 저장하기 버튼 */}
        <div className='mb-24 flex items-center justify-between'>
          <div className='h-42 w-24 animate-pulse rounded bg-gray-200' />
          <div className='h-56 w-100 animate-pulse rounded bg-gray-200 md:w-120' />
        </div>

        {/* 폼 섹션 스켈레톤 */}
        <div className='space-y-32'>
          {/* 닉네임 스켈레톤 */}
          <div>
            <div className='mb-16 h-32 w-16 animate-pulse rounded bg-gray-200' />
            <div className='h-56 w-full animate-pulse rounded bg-gray-200' />
          </div>

          {/* 이메일 스켈레톤 */}
          <div>
            <div className='mb-16 h-32 w-16 animate-pulse rounded bg-gray-200' />
            <div className='h-56 w-full animate-pulse rounded bg-gray-200' />
          </div>

          {/* 비밀번호 스켈레톤 */}
          <div>
            <div className='mb-16 h-32 w-20 animate-pulse rounded bg-gray-200' />
            <div className='h-56 w-full animate-pulse rounded bg-gray-200' />
          </div>

          {/* 비밀번호 재입력 스켈레톤 */}
          <div>
            <div className='mb-16 h-32 w-28 animate-pulse rounded bg-gray-200' />
            <div className='h-56 w-full animate-pulse rounded bg-gray-200' />
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <>
        {/* 제목과 저장하기 버튼 */}
        <div className='mb-24 flex items-center justify-between'>
          <h1 className='text-nomad text-3xl leading-42 font-bold'>내 정보</h1>
          <Button
            variant='primary'
            className='text-md h-56 w-100 rounded md:w-120 md:text-lg'
            disabled
          >
            저장하기
          </Button>
        </div>

        {/* 에러 메시지 */}
        <div className='text-center text-red-500'>
          <p>사용자 정보를 불러오는데 실패했습니다.</p>
          <p className='mt-2 text-sm text-gray-600'>{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <div className='w-full max-w-none lg:max-w-792'>
      {/* 제목과 저장하기 버튼 */}
      <div className='mb-24 flex items-center justify-between'>
        <h1 className='text-nomad text-3xl leading-42 font-bold'>내 정보</h1>
        <Button
          variant='primary'
          className='text-md h-56 w-100 rounded md:w-120 md:text-lg'
          onClick={handleSave}
          disabled={isButtonDisabled()}
        >
          {updateProfileMutation.isPending ? '저장 중...' : '저장하기'}
        </Button>
      </div>

      {/* 폼 섹션 */}
      <div className='space-y-32'>
        {/* 닉네임 */}
        <div>
          <label className='mb-16 block text-2xl leading-32 font-bold text-black'>
            닉네임
          </label>
          <Input
            type='text'
            value={formData.nickname}
            onChange={handleInputChange('nickname')}
            onBlur={handleNicknameBlur}
            error={errors.nickname}
            placeholder='닉네임을 입력해주세요'
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className='mb-16 block text-2xl leading-32 font-bold text-black'>
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
          <label className='mb-16 block text-2xl leading-32 font-bold text-black'>
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
          <label className='mb-16 block text-2xl leading-32 font-bold text-black'>
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
