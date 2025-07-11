'use client';

import { InputHTMLAttributes, useId, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const [showPw, setShowPw] = useState(false);
  const id = useId();

  return;
}
