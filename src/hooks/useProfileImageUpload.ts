import { useRef } from 'react';
import { useUploadProfileImage } from './useMyPageQueries';
import useUserStore from '@/stores/authStore'; // authStore import

/**
 * 프로필 이미지 업로드를 위한 커스텀 훅
 *
 * @returns {Object} fileInputRef, handleImageEdit, handleFileChange
 * @returns {React.RefObject<HTMLInputElement>} fileInputRef - 파일 입력 요소 참조
 * @returns {() => void} handleImageEdit - 편집 버튼 클릭 핸들러
 * @returns {(event: React.ChangeEvent<HTMLInputElement>) => void} handleFileChange - 파일 선택 핸들러
 */

export const useProfileImageUpload = () => {
  const { mutate: uploadProfileImage } = useUploadProfileImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필 이미지 편집 버튼
  const handleImageEdit = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      uploadProfileImage(file);
    }

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    event.target.value = '';
  };

  return {
    fileInputRef,
    handleImageEdit,
    handleFileChange,
  };
};
