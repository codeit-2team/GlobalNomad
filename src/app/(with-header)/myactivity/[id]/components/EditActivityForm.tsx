'use client';

import Button from '@/components/Button';
import { InfoSection } from '../../components/InfoSection';
import { ScheduleSelectForm } from '../../components/ScheduleSelectForm';
import { ImageSection } from '../../components/ImageSection';
import { useEditActivityForm } from '../hooks/useEditActivityForm';

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
    error,
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-1200 p-4 sm:px-20 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>체험 수정</h1>
            <Button type='submit' variant='primary' className='px-6 py-3'>
              수정 완료
            </Button>
          </div>

          <InfoSection
            title={title}
            category={category}
            price={price}
            description={description}
            address={address}
            onTitleChange={setTitle}
            onCategoryChange={setCategory}
            onPriceChange={(price) => setPrice(Number(price))}
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
