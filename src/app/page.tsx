import Modal from '@/Components/Modal';
import Test from './Dummy/Test';

export default function Home() {
  return (
    <>
      <Modal>
        <Modal.Trigger>열기</Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>제목</Modal.Title>
          </Modal.Header>
          <Modal.Item></Modal.Item>

          <Modal.Footer>
            <button className='text-bold mb-4 w-500 bg-green-100 text-xl'>
              삭제하기
            </button>
          </Modal.Footer>
          <Modal.Close></Modal.Close>
        </Modal.Content>
      </Modal>

      <h2 className='cursor-pointer text-blue-300'>안녕하세요</h2>

      <Test />
    </>
  );
}
