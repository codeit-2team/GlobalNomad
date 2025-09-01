'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ImageGridProps } from '@/types/activityDetailType';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '@/components/Modal';
import { DEFAULT_BG } from '@/constants/AvatarConstants';

function ImageGrid({ mainImage, subImages }: ImageGridProps) {
  const [image, setImage] = useState([mainImage, ...subImages]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleImageError = (index: number) => {
    setImage((prev) => prev.map((src, i) => (i === index ? DEFAULT_BG : src)));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? image.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === image.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* 모바일 */}
      <div className='relative block aspect-square h-[300px] w-full overflow-hidden rounded-lg md:hidden'>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className='absolute inset-0'
          >
            <Image
              src={image[currentIndex]}
              alt={`${currentIndex + 1}`}
              fill
              className='rounded-lg object-cover'
              priority
              unoptimized
              onError={() => handleImageError(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          aria-label='이전 이미지'
          className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 px-6 py-10 text-white'
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          aria-label='다음 이미지'
          className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 px-6 py-10 text-white'
        >
          ›
        </button>

        <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
          {image.map((_, i) => (
            <div
              key={i}
              className={`h-10 w-10 rounded-full ${
                i === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* PC/태블릿 */}
      <div className='hidden h-[500px] grid-cols-4 grid-rows-4 gap-6 md:grid'>
        <div
          onClick={() => handleImageClick(mainImage)}
          className='relative col-span-2 row-span-4 hover:animate-pulse'
        >
          <Image
            src={image[0]}
            alt='메인이미지'
            fill
            className='rounded-lg object-cover'
            onError={() => handleImageError(0)}
          />
        </div>
        {image.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            onClick={() => handleImageClick(image)}
            className='relative col-span-1 row-span-2 h-full hover:animate-pulse'
          >
            <Image
              src={image}
              alt={`서브이미지 ${index + 1}`}
              fill
              className='rounded-lg object-cover'
              onError={() => handleImageError(index + 1)}
            />
          </div>
        ))}
      </div>
      <Modal onOpenChange={setIsOpen} isOpen={isOpen}>
        <Modal.Content className='rounded-md'>
          <Modal.Header>
            <Modal.Close />
          </Modal.Header>
          <Modal.Item className='flex items-center justify-center'>
            <div className='relative aspect-square w-[1200px]'>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt='확대 이미지'
                  fill
                  className='rounded-lg object-cover p-18'
                />
              )}
            </div>
          </Modal.Item>

          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default React.memo(ImageGrid);
