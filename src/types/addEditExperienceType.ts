import { Schedule } from '@/types/activityDetailType';

export interface SubImageType {
  id?: number;
  url: string | File;
}

export interface AddressInputProps {
  onAddressChange: (address: string) => void;
  address: string;
}

export interface PostcodeData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
  zonecode: string;
  userSelectedType: string;
}

export interface CategoryProps {
  category?: string;
  onCategoryChange: (value: string) => void;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export interface ImagePreviewProps {
  image: File | string;
  onRemove: () => void;
  alt: string;
  className?: string;
}

export interface ImagesSectionProps {
  mainImage: string | File | null;
  subImage: (string | File)[];
  onMainImageSelect: (file: File) => void;
  onMainImageRemove: () => void;
  onSubImageAdd: (files: File[]) => void;
  onSubImageRemove: (index: number) => void;
}

export interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface InfoSectionProps {
  title?: string;
  category?: string;
  price?: string;
  description?: string;
  address?: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export interface MainImageSelectProps {
  mainImage: File | string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}


export interface SubImageSelectProps {
  subImage: (string | File)[];
  onImagesAdd: (files: File[]) => void;
  onImageRemove: (index: number) => void;
}

export interface ScheduleSelectProps {
  index: number;
  isRemovable: boolean;
  onAddDate: () => void;
  onRemove: (index: number) => void;
  onDateChange: (index: number, value: string) => void;
  onStartTimeChange: (index: number, value: string) => void;
  onEndTimeChange: (index: number, value: string) => void;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleSelectFormProps {
  dates: Schedule[];
  onAddDate: () => void;
  onRemoveDate: (index: number) => void;
  onDateChange: (
    index: number,
    field: keyof Omit<Schedule, 'id'>,
    value: string,
  ) => void;
}


export interface DateSlot {
  date: string;
  startTime: string;
  endTime: string;
}
