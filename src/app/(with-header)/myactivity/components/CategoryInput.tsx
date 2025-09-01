import ChevronIcon from '@assets/svg/chevron'; // 아이콘 경로는 맞게 조정
import { CategoryProps } from '@/types/addEditExperienceType';

export default function CategoryInput({
  category,
  onCategoryChange,
}: CategoryProps) {
  return (
    <div>
      {/* <label className='font-regular flex flex-col text-lg text-black'>
        카테고리
      </label> */}
      <div className='relative w-full'>
        <select
          className={`w-full appearance-none rounded-md border border-gray-800 bg-white px-20 py-17 ${
            category ? 'text-black' : 'text-gray-400'
          }`}
          id='category'
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value='' disabled hidden>
            카테고리
          </option>
          <option className='text-black' value='문화 · 예술'>
            문화 · 예술
          </option>
          <option className='text-black' value='식음료'>
            식음료
          </option>
          <option className='text-black' value='스포츠'>
            스포츠
          </option>
          <option className='text-black' value='투어'>
            투어
          </option>
          <option className='text-black' value='관광'>
            관광
          </option>
          <option className='text-black' value='웰빙'>
            웰빙
          </option>
        </select>

        {/* 커스텀 화살표 아이콘 */}
        <div className='pointer-events-none absolute top-1/2 right-12 -translate-y-1/2'>
          <ChevronIcon size={20} />
        </div>
      </div>
    </div>
  );
}
