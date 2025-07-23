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