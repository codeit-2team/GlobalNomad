'use client';

import Modal from '@/components/Modal';
import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface AddressInputProps {
  onAddressChange: (address: string) => void;
  address: string;
}

export default function AddressInput({
  onAddressChange,
  address,
}: AddressInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data: any) => {
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
        label='주소'
        id='address'
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
