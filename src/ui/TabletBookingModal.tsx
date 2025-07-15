import useBookingStore from '@/stores/Booking/useBookingStore';
import Modal from '@/components/modal';
import Calendar from '@/components/floating-box/Calender';
import TimeSelector from '@/components/floating-box/TimeSelector';

export default function TabletModal() {
  const isOpen = useBookingStore((state) => state.isOpen);
  const setIsOpen = useBookingStore((state) => state.setIsOpen);

  return (
    <Modal onOpenChange={setIsOpen} isOpen={isOpen}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>날짜</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Item>
          <div className='flex justify-center'>
            <Calendar />
          </div>
          <TimeSelector />
        </Modal.Item>

        <Modal.Footer></Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
