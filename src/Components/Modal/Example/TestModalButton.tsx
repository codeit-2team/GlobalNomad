'use client';

import { useState } from 'react';
import TestModal from './TestModal';

export default function TestModalButton() {
  const [isOpen, setIsOpen] = useState(false); //외부에서 모달을 제어하기위한 state 정의

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        제어모달 예시
      </button>

      {/* props로 state를 내려줌 */}
      <TestModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
