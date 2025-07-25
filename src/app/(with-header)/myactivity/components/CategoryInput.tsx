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
      <label
        htmlFor='category'
        className='font-regular flex flex-col text-lg text-black'
      >
        카테고리
      </label>
      <div>
        <select
          id='category'
          className='w-full rounded-md border border-gray-800 bg-white px-20 py-17 placeholder-gray-600'
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value=''>카테고리를 선택해주세요</option>
          <option value='문화예술'>문화/예술</option>
          <option value='푸드'>푸드</option>
          <option value='스포츠'>스포츠</option>
          <option value='투어'>투어</option>
          <option value='관광'>관광</option>
          <option value='웰빙'>웰빙</option>
        </select>
      </div>
    </div>
  );
}
