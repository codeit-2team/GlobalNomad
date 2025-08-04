'use client';

import { useCreateActivityForm } from '../hooks/useCreateActivityForm';
import { InfoSection } from './InfoSection';
import { ScheduleSelectForm } from './ScheduleSelectForm';
import { ImageSection } from './ImageSection';
import Button from '@/components/Button';

export default function ReservationForm() {
  const {
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
    isLoading,
  } = useCreateActivityForm();

  return (
    <div className='bg-gray-white min-h-screen px-0 py-24 sm:px-6 md:py-0 lg:px-8'>
      <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-black'>내 체험 등록</h1>
            <div className='border-none'>
              <Button
                variant='primary'
                type='submit'
                isLoading={isLoading}
                className='bg-nomad w-full rounded-[4px] px-32 py-11 text-lg'
              >
                등록하기
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
            onPriceChange={setPrice}
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
