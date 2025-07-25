'use client';

import { useState, useEffect } from 'react';

import type React from 'react';
import { InfoSection } from './InfoSection';
import { ScheduleSelectForm } from './ScheduleSelectForm';
import { ImageSection } from './ImageSection';
import Button from '@/components/Button';

interface DateSlot {
  date: string;
  startTime: string;
  endTime: string;
}
const mockData = {
  title: '함께 배우면 즐거운 스트릿댄스',
  category: '투어',
  description: '둠칫 둠칫 두둠칫',
  address: '서울특별시 강남구 테헤란로 427',
  price: 10000,
  schedules: [
    { date: '2023-12-01', startTime: '12:00', endTime: '13:00' },
    { date: '2023-12-05', startTime: '12:00', endTime: '13:00' },
    { date: '2023-12-05', startTime: '13:00', endTime: '14:00' },
    { date: '2023-12-05', startTime: '14:00', endTime: '15:00' },
  ],
  bannerImageUrl: '/test/image1.png',
  subImageUrls: [
    '/test/image2.png',
    '/test/image3.png',
    '/test/image4.png',
    '/test/image5.png',
  ],
};

export default function ReservationForm() {
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

  useEffect(() => {
    // mock데이터로 수정페이지용 테스트
    setTimeout(() => {
      setTitle(mockData.title);
      setCategory(mockData.category);
      setPrice(mockData.price);
      setDescription(mockData.description);
      setAddress(mockData.address);
      setDates(mockData.schedules);
      setMainImage(mockData.bannerImageUrl);
      setSubImage(mockData.subImageUrls);
    }, 500);
  }, []);

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

  const handleMainImageSelect = (file: File) => {
    setMainImage(file);
  };

  const handleMainImageRemove = () => {
    setMainImage(null);
  };

  const handleSubImagesAdd = (newFiles: File[]) => {
    const remainingSlots = 4 - subImage.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    setSubImage([...subImage, ...filesToAdd]);
  };

  const handleSubImageRemove = (index: number) => {
    setSubImage(subImage.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('title:', title);
    console.log('category:', category);
    console.log('price:', price);
    console.log('description:', description);
    console.log('address:', address);
    console.log('dates:', dates);
    console.log('mainImage:', mainImage);
    console.log('subImage:', subImage);
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='mb-2 text-3xl font-bold text-gray-900'>
              내 체험 등록
            </h1>
            <div className='border-t border-gray-200 pt-6'>
              <Button
                variant='primary'
                type='submit'
                className='w-full px-5 py-10'
              >
                체험 등록하기
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
