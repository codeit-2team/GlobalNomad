export interface ImageGridProps {
  mainImage: string;
  subImages: string[];
}

export interface ReviewCardProps {
  userName: string;
  date: string;
  reviewText: string;
  avatarSrc: string;
}

export interface TitleProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  isDropDown?: boolean;
}

export interface ActivitySchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export type TimeSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

export type GroupedSchedule = {
  date: string;
  times: TimeSlot[];
};

export type SchedulesProps = GroupedSchedule[];

export interface ActivitySubImage {
  imageUrl: string;
}

export interface ActivityDetail {
  id: number;
  isOwner: boolean;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string | undefined;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: ActivitySubImage[];
  schedules: ActivitySchedule[];
}

export interface BookinDateProps {
  schedules: ActivitySchedule[];
}

export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityDetailEdit {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: Schedule[];
}
