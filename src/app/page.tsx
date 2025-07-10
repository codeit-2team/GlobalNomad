import Modal from '@/Components/Modal';

export default function Home() {
  return (
    <Modal>
      <Modal.Trigger>열기</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>제목</Modal.Title>
        </Modal.Header>
        <Modal.Item>본문</Modal.Item>
        <Modal.Footer>
          <Modal.Close>닫기</Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
