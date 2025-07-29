'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Button';
import { InfoSection } from '../../components/InfoSection';
import { ScheduleSelectForm } from '../../components/ScheduleSelectForm';
import { ImageSection } from '../../components/ImageSection';
import { uploadImage } from '../../utils/uploadImage';
import { privateInstance } from '@/apis/privateInstance';
import { ActivityDetailEdit, Schedule } from '@/types/activityDetailType';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface SubImageType {
  id?: number;
  url: string | File;
}

export default function EditActivityForm() {
  const { id } = useParams() as { id: string };

  const router = useRouter();
  const queryClient = useQueryClient();


  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const [mainImage, setMainImage] = useState<File | string | null>(null);


  const [originalSubImages, setOriginalSubImages] = useState<SubImageType[]>(
    [],
  );
  const [subImages, setSubImages] = useState<SubImageType[]>([]);

  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
  const [dates, setDates] = useState<Schedule[]>([]);

 
  const { data, isLoading, error } = useQuery<ActivityDetailEdit, Error>({
    queryKey: ['edit-activity', id],
    queryFn: async () => {
      const res = await privateInstance.get(`/activities/${id}`);
      return res.data;
    },
    enabled: !!id,
  });


  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.category);
      setPrice(data.price);
      setDescription(data.description);
      setAddress(data.address);
      setMainImage(data.bannerImageUrl);

      const mappedSubImages: SubImageType[] =
        data.subImages?.map((img) => ({
          id: img.id,
          url: img.imageUrl,
        })) ?? [];

      setOriginalSubImages(mappedSubImages);
      setSubImages(mappedSubImages);

      setOriginalSchedules(data.schedules ?? []);
      setDates(data.schedules ?? []);
    }
  }, [data]);


  const handleSubImageRemove = (index: number) => {
    setSubImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubImagesAdd = (newFiles: File[]) => {
    const remainingSlots = 4 - subImages.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    const newSubImages = filesToAdd.map((file) => ({ url: file }));
    setSubImages((prev) => [...prev, ...newSubImages]);
  };

 
  const handleAddDate = () => {
    setDates([...dates, { date: '', startTime: '', endTime: '' }]);
  };

 
  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleDateChange = (
    index: number,
    field: keyof Schedule,
    value: string,
  ) => {
    setDates((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };


  const handleMainImageSelect = (file: File) => {
    setMainImage(file);
  };

 
  const handleMainImageRemove = () => {
    setMainImage(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    
      let bannerImageUrl = '';
      if (typeof mainImage === 'string') {
        bannerImageUrl = mainImage;
      } else if (mainImage instanceof File) {
        bannerImageUrl = await uploadImage(mainImage);
      }

      // 삭제될 서브 이미지 id
      const subImageIdsToRemove = originalSubImages
        .filter((orig) => !subImages.some((img) => img.id === orig.id))
        .map((img) => img.id)
        .filter((id): id is number => id !== undefined);

 
      const subImageUrlsToAdd: string[] = [];

      for (const img of subImages) {
        if (!img.id) {
          if (img.url instanceof File) {
            const uploadedUrl = await uploadImage(img.url);
            subImageUrlsToAdd.push(uploadedUrl);
          } else if (typeof img.url === 'string') {
            subImageUrlsToAdd.push(img.url);
          }
        }
      }

      //id가 없으면 새로 생긴 일정
      const newSchedules = dates.filter((d) => !d.id);

      // 삭제할 일정
      const scheduleIdsToRemove = originalSchedules
        .filter((orig) => !dates.some((d) => d.id === orig.id))
        .map((d) => d.id)
        .filter((id): id is number => id !== undefined);

      // 페이로드 구성
      const payload = {
        title,
        category,
        description,
        address,
        price,
        bannerImageUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        schedulesToAdd: newSchedules,
        scheduleIdsToRemove,
      };

      await privateInstance.patch(`/editActivity/${id}`, payload);

      alert('수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['activity', id] });
      router.push(`/activities/${id}`);
    } catch (err) {
      const error = err as AxiosError;

      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      alert(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '예약에 실패했습니다.',
      );
    }
  };

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
            onPriceChange={(v) => setPrice(Number(v))}
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
            subImage={subImages.map((img) => img.url)}
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
