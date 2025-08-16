'use client';

import Modal from '@/components/Modal';
import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { AddressInputProps } from '@/types/addEditExperienceType';
import { PostcodeData } from '@/types/addEditExperienceType';

export default function AddressInput({
  onAddressChange,
  address,
}: AddressInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onAddressChange(fullAddress);
    setIsOpen(false);
  };

  return (
    <div>
      <Input
        id='address'
        placeholder='주소를 입력해주세요'
        value={address}
        onClick={() => setIsOpen(true)}
        readOnly
      />
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>주소 검색</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Item>
            <DaumPostcode onComplete={handleComplete} />
          </Modal.Item>
          <Modal.Footer>
            <Button
              variant='primary'
              className='py-8'
              onClick={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
