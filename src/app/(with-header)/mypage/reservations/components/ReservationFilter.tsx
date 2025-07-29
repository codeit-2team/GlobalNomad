'use client';

import Dropdown from '@/components/Dropdown';
import {
  FilterOption,
  FILTER_OPTIONS,
  FILTER_LABELS,
} from '@/constants/reservationConstants';

interface ReservationFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
}

export default function ReservationFilter({
  value,
  onChange,
}: ReservationFilterProps) {
  // 표시용 라벨 옵션 배열
  const labelOptions = FILTER_OPTIONS.map((option) => FILTER_LABELS[option]);

  // 라벨 선택 시 실제 값으로 변환
  const handleChange = (selectedLabel: string) => {
    const selectedOption = FILTER_OPTIONS.find(
      (option) => FILTER_LABELS[option] === selectedLabel,
    );
    if (selectedOption !== undefined) {
      onChange(selectedOption);
    }
  };

  return (
    <Dropdown
      options={labelOptions}
      value={FILTER_LABELS[value]}
      onChange={handleChange}
      placeholder='필터'
      className='h-[53px] w-[160px]'
      disableScroll={true}
    />
  );
}
