import Modal from '..';

export default function UncontrolledModal() {
  return (
    <Modal>
      <Modal.Trigger>비제어 모달 열기</Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>제목</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Item>비제어모달</Modal.Item>

        <Modal.Footer></Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
