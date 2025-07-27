export default function PriceDisplay({ price }: { price: number }) {
  return (
    <div className='mt-15 mb-6'>
      <div className='mb-1 text-2xl font-bold text-black'>
        ₩{price} <span className='text-xl font-bold text-gray-800'>/ 인</span>
      </div>
    </div>
  );
}
