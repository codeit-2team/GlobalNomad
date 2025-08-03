'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import { uploadImage } from '../utils/uploadImage';
import { privateInstance } from '@/apis/privateInstance';

export interface DateSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export const useCreateActivityForm = () => {
  const [dates, setDates] = useState<DateSlot[]>([
    { date: '', startTime: '', endTime: '' },
  ]);
  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [subImage, setSubImage] = useState<(File | string)[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!mainImage) {
        throw new Error('메인 이미지를 업로드해주세요.');
      }

      const parsedPrice = parseInt(price, 10);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new Error('유효한 가격을 입력해주세요.');
      }

      const payload = {
        title,
        category,
        description,
        address,
        price: parsedPrice,
        schedules: dates,
        bannerImageUrl: mainImage,
        subImageUrls: subImage,
      };

      const res = await privateInstance.post('/addActivity', payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('체험이 성공적으로 등록되었습니다!');
      router.push(`/activities/${data.id}`);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const detail =
          err.response?.data?.detail?.message ||
          err.response?.data?.message ||
          '체험 등록 중 오류가 발생했습니다.';
        toast.error(detail);
      } else {
        toast.error(
          err instanceof Error ? err.message : '알 수 없는 오류 발생',
        );
      }
    },
  });

  const handleAddDate = () => {
    setDates((prev) => [...prev, { date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveDate = (index: number) => {
    setDates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDateChange = (
    index: number,
    field: keyof DateSlot,
    value: string,
  ) => {
    setDates((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)),
    );
  };

  const handleMainImageSelect = async (file: File) => {
    try {
      const url = await uploadImage(file);
      setMainImage(url);
    } catch {
      toast.error('메인 이미지 업로드에 실패했습니다.');
    }
  };

  const handleMainImageRemove = () => {
    setMainImage(null);
  };

  const handleSubImagesAdd = async (newFiles: File[]) => {
    const remaining = 4 - subImage.length;
    const filesToUpload = newFiles.slice(0, remaining);
    try {
      const uploadedUrls = await Promise.all(
        filesToUpload.map((file) => uploadImage(file)),
      );
      setSubImage((prev) => [...prev, ...uploadedUrls]);
    } catch {
      toast.error('서브 이미지 업로드 중 문제가 발생했습니다.');
    }
  };

  const handleSubImageRemove = (index: number) => {
    setSubImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !category ||
      !description ||
      !address ||
      !price ||
      dates.length === 0
    ) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }
    mutation.mutate();
  };

  return {
    title,
    category,
    price,
    description,
    address,
    dates,
    mainImage,
    subImage,
    setTitle,
    setCategory,
    setPrice,
    setDescription,
    setAddress,
    handleAddDate,
    handleRemoveDate,
    handleDateChange,
    handleMainImageSelect,
    handleMainImageRemove,
    handleSubImagesAdd,
    handleSubImageRemove,
    handleSubmit,
    isLoading: mutation.isPending,
  };
};
