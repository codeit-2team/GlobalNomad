'use client';

import Modal from '@/components/modal';

export default function TestModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //예시 동작
  function TestAction() {
    window.alert('리뷰 작성');
    setIsOpen(false);
  }

  return (
    // 외부에서 정의된 모달 제어 state를 받아서 사용
    <Modal onOpenChange={setIsOpen} isOpen={isOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>제목</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Item>제어모달예시</Modal.Item>

        <Modal.Footer>
          <button
            className='w-full bg-green-300 px-4 py-5 text-xl font-semibold text-white'
            onClick={TestAction}
          >
            리뷰 작성
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
