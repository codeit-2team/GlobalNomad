interface CategoryProps {
  category?: string;

  onCategoryChange: (value: string) => void;
}

export default function CategoryInput({
  category,
  onCategoryChange,
}: CategoryProps) {
  return (
    <div>
      {/* <label className='font-regular flex flex-col text-lg text-black'>
        카테고리
      </label> */}
      <div className='w-full'>
        <select
          className='w-full rounded-md border border-gray-800 bg-white px-20 py-17 text-gray-700 placeholder:text-gray-700'
          id='category'
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value='' disabled hidden>
            카테고리
          </option>
          <option value='문화 · 예술'>문화 · 예술</option>
          <option value='식음료'>식음료</option>
          <option value='스포츠'>스포츠</option>
          <option value='투어'>투어</option>
          <option value='관광'>관광</option>
          <option value='웰빙'>웰빙</option>
        </select>
      </div>
    </div>
  );
}
