'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { privateInstance } from '@/apis/privateInstance';
import { uploadImage } from '../../utils/uploadImage';
import { ActivityDetailEdit, Schedule } from '@/types/activityDetailType';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { parse } from 'path';

interface SubImageType {
  id?: number;
  url: string | File;
}

export const useEditActivityForm = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [originalSubImages, setOriginalSubImages] = useState<SubImageType[]>(
    [],
  );
  const [subImages, setSubImages] = useState<SubImageType[]>([]);
  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
  const [dates, setDates] = useState<Schedule[]>([]);

  const { data, isLoading, isError } = useQuery<ActivityDetailEdit, Error>({
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
      setPrice(data.price.toString());
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

      const newSchedules = dates.filter((d) => !d.id);

      const scheduleIdsToRemove = originalSchedules
        .filter((orig) => !dates.some((d) => d.id === orig.id))
        .map((d) => d.id)
        .filter((id): id is number => id !== undefined);

      const parsedPrice = parseInt(price, 10);

      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        toast.error('유효한 가격을 입력해주세요.');
        return;
      }
      const payload = {
        title,
        category,
        description,
        address,
        price: parsedPrice,
        bannerImageUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        schedulesToAdd: newSchedules,
        scheduleIdsToRemove,
      };

      await privateInstance.patch(`/editActivity/${id}`, payload);

      toast.success('수정되었습니다!'); //토스트로 대체
      queryClient.invalidateQueries({ queryKey: ['activity', id] });
      router.push(`/activities/${id}`);
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      console.error('전체 에러:', error);

      toast.error(
        responseData?.error ||
          responseData?.message ||
          error.message ||
          '수정에 실패했습니다.',
      );
    }
  };

  return {
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
  };
};
