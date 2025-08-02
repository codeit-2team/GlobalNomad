'use client';

import Button from '@/components/Button';
import { InfoSection } from '../../components/InfoSection';
import { ScheduleSelectForm } from '../../components/ScheduleSelectForm';
import { ImageSection } from '../../components/ImageSection';
import { useEditActivityForm } from '../hooks/useEditActivityForm';
import EditActivityFormSkeleton from '../../loading';

interface SubImageType {
  id?: number;
  url: string | File;
}

export default function EditActivityForm() {
  const {
    title,
    category,
    price,
    description,
    address,
    mainImage,
    subImages,
    dates,
    isLoading,
    isError,
    setTitle,
    setCategory,
    setPrice,
    setDescription,
    setAddress,
    handleSubImageRemove,
    handleSubImagesAdd,
    handleAddDate,
    handleRemoveDate,
    handleDateChange,
    handleMainImageSelect,
    handleMainImageRemove,
    handleSubmit,
  } = useEditActivityForm();

  if (isLoading)
    return (
      <div>
        <EditActivityFormSkeleton />
      </div>
    );

  if (isError) return <div>오류가 발생했습니다: {isError}</div>;

  return (
    <div className='bg-gray-white min-h-screen px-16 py-24 sm:px-6 md:py-0 lg:px-8'>
      <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-black'>내 체험 수정</h1>
            <div className='border-none'>
              <Button
                variant='primary'
                type='submit'
                className='bg-nomad w-full rounded-[4px] px-32 py-11 text-lg'
              >
                수정하기
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
            subImage={subImages.map((img: SubImageType) => img.url)}
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
