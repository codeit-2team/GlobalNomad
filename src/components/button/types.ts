import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'category';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  selected?: boolean;
}
