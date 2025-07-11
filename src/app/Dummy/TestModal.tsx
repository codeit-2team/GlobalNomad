'use client';

import Modal from '@/Components/Modal';

export default function TestModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal onOpenChange={setIsOpen} isOpen={isOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>제목</Modal.Title>
        </Modal.Header>
        <Modal.Item>안녕하세요</Modal.Item>

        <Modal.Footer>
          <Modal.Close />
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            눌러
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
