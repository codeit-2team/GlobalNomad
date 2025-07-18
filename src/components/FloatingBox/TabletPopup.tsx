import DatePicker from '../DatePicker/DatePicker';

export default function TabletPopup() {
  return (
    <div className='flex items-center justify-center'>
      <div
        className={
          'relative m-auto flex h-fit max-h-[85%] w-screen min-w-[375] flex-col bg-white p-8 px-10 shadow-2xl inset-shadow-sm inset-shadow-gray-300 md:h-fit md:w-[50%] md:max-w-600'
        }
      >
        <DatePicker />
      </div>
    </div>
  );
}
