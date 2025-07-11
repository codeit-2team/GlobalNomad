'use client';

import { useState } from 'react';
import TestModal from './TestModal';

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        모달열기
      </button>

      <TestModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
