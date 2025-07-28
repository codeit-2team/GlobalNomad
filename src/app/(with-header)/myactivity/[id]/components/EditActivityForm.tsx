'use client';

import { useState } from 'react';
import axios from 'axios';

import type React from 'react';
import { InfoSection } from '../../components/InfoSection';
import { ScheduleSelectForm } from '../../components/ScheduleSelectForm';
import { ImageSection } from '../../components/ImageSection';
import Button from '@/components/Button';
import { uploadImage } from '../../utils/uploadImage';
import { privateInstance } from '@/apis/privateInstance';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface DateSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export default function ReservationForm() {
  const { id } = useParams();

  const { data: activityData, isLoading } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => privateInstance.get(`/activities/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });

  const [dates, setDates] = useState<DateSlot[]>([
    { date: '', startTime: '', endTime: '' },
  ]);
  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [subImage, setSubImage] = useState<(File | string)[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleAddDate = () => {
    setDates([...dates, { date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleDateChange = (
    index: number,
    field: keyof DateSlot,
    value: string,
  ) => {
    const updatedDates = dates.map((date, i) =>
      i === index ? { ...date, [field]: value } : date,
    );
    setDates(updatedDates);
  };

  const handleMainImageSelect = async (file: File) => {
    try {
      const url = await uploadImage(file);
      setMainImage(url);
    } catch (err) {
      console.error(err);
      alert('메인 이미지 업로드에 실패했습니다.');
    }
  };

  const handleMainImageRemove = () => {
    setMainImage(null);
  };

  const handleSubImagesAdd = async (newFiles: File[]) => {
    const remainingSlots = 4 - subImage.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    try {
      const uploadPromises = filesToAdd.map((file) => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      setSubImage([...subImage, ...uploadedUrls]);
    } catch (err) {
      console.error('서브 이미지 업로드 실패', err);
      alert('서브 이미지 업로드 중 문제가 발생.');
    }
  };

  const handleSubImageRemove = (index: number) => {
    setSubImage(subImage.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainImage) {
      alert('메인 이미지를 업로드해주세요.'); //추후 토스트나 팝업으로 대체
      return;
    }

    if (
      !title ||
      !category ||
      !description ||
      !address ||
      !price ||
      dates.length === 0
    ) {
      alert('모든 필드를 입력해주세요.'); //추후 토스트나 팝업으로 대체
      return;
    }

    const payload = {
      title,
      category,
      description,
      address,
      price,
      schedules: dates,
      bannerImageUrl: mainImage,
      subImageUrls: subImage,
    };

    try {
      const response = await privateInstance.post('/addActivity', payload);
      console.log('등록 성공:', response.data);
      alert('체험이 성공적으로 등록되었습니다!'); //추후 토스트나 팝업으로 대체
    } catch (err) {
      console.error('체험 등록 실패:', err);

      if (axios.isAxiosError(err)) {
        const detailMessage =
          err.response?.data?.detail?.message ||
          err.response?.data?.message ||
          '체험 등록 중 오류가 발생했습니다.';

        alert(detailMessage); //추후 토스트나 팝업으로 대체
      } else {
        alert('알 수 없는 오류가 발생했습니다.'); //추후 토스트나 팝업으로 대체
      }
    }
  };
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='mb-2 text-3xl font-bold text-gray-900'>
              내 체험 수정
            </h1>
            <div className='border-t border-gray-200 pt-6'>
              <Button
                variant='primary'
                type='submit'
                className='w-full px-5 py-10'
              >
                체험 수정하기
              </Button>
            </div>
          </div>
          <InfoSection
            title={title}
            category={category}
            price={price}
            description={description}
            address={address}
            onTitleChange={setTitle}
            onCategoryChange={setCategory}
            onPriceChange={(value) => setPrice(Number(value))}
            onDescriptionChange={setDescription}
            onAddressChange={setAddress}
          />

          <ScheduleSelectForm
            dates={dates}
            onAddDate={handleAddDate}
            onRemoveDate={handleRemoveDate}
            onDateChange={handleDateChange}
          />

          <ImageSection
            mainImage={mainImage}
            subImage={subImage}
            onMainImageSelect={handleMainImageSelect}
            onMainImageRemove={handleMainImageRemove}
            onSubImageAdd={handleSubImagesAdd}
            onSubImageRemove={handleSubImageRemove}
          />
        </form>
      </div>
    </div>
  );
}
