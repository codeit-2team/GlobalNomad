// 'use client';

// import useBookingStore from '@/stores/Booking/useBookingStore';
// import IconClose from '@assets/svg/close';
// import DatePicker from '../DatePicker/DatePicker';
// import TimeSelector from './TimeSelector';
// import { SchedulesProps } from '@/types/activityDetailType';

// export default function TabletPopup({schedules}:SchedulesProps) {
//   const isOpen = useBookingStore((state) => state.isOpen);
//   const setIsOpen = useBookingStore((state) => state.setIsOpen);

//   if (!isOpen) return null;

//   return (
//     <div className='absolute z-50 flex flex-col items-center justify-center'>
//       <div className='flex justify-between'>
//         <h2>날짜</h2>
//         <button onClick={() => setIsOpen(false)}>
//           <IconClose />
//         </button>
//       </div>

//       <DatePicker  schedules={schedules}/>

//       <TimeSelector />
//     </div>
//   );
// }
