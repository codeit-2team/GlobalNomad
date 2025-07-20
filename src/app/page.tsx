'use client';

import BellIcon from '@assets/svg/bell';
import CheckIcon from '@assets/svg/check';
import ChevronIcon from '@assets/svg/chevron';
import CloseEyeIcon from '@assets/svg/close-eye';
import CloseIcon from '@assets/svg/close';
import IconDropdown from '@assets/svg/dropdown';
import IconFacebook from '@assets/svg/facebook';
import IconInstagram from '@assets/svg/instagram';
import LeftArrowIcon from '@assets/svg/left-arrow';
import LocationIcon from '@assets/svg/location';
import LogoIcon from '@assets/svg/logo';
import OpenEyeIcon from '@assets/svg/open-eye';
import RightArrowIcon from '@assets/svg/right-arrow';
import IconTwitter from '@assets/svg/twitter';
import IconYoutube from '@assets/svg/youtube';

export default function Home() {
  const icons = [
    { name: 'BellIcon', component: <BellIcon size={32} /> },
    { name: 'CheckIcon', component: <CheckIcon size={32} /> },
    {
      name: 'CheckIcon (no bg)',
      component: <CheckIcon size={32} showBackground={false} />,
    },
    {
      name: 'ChevronIcon (down)',
      component: <ChevronIcon size={32} direction='down' />,
    },
    {
      name: 'ChevronIcon (up)',
      component: <ChevronIcon size={32} direction='up' />,
    },
    { name: 'CloseEyeIcon', component: <CloseEyeIcon size={32} /> },
    { name: 'CloseIcon', component: <CloseIcon size={32} /> },
    {
      name: 'DropdownIcon',
      component: <IconDropdown size={32} color='#1B1B1B' />,
    },
    {
      name: 'FacebookIcon',
      component: <IconFacebook size={32} color='#1B1B1B' />,
    },
    {
      name: 'InstagramIcon',
      component: <IconInstagram size={32} color='#1B1B1B' />,
    },
    { name: 'LeftArrowIcon', component: <LeftArrowIcon size={32} /> },
    { name: 'LocationIcon', component: <LocationIcon size={32} /> },
    { name: 'LogoIcon', component: <LogoIcon size={80} /> },
    { name: 'OpenEyeIcon', component: <OpenEyeIcon size={32} /> },
    { name: 'RightArrowIcon', component: <RightArrowIcon size={32} /> },
    {
      name: 'TwitterIcon',
      component: <IconTwitter size={32} color='#1B1B1B' />,
    },
    {
      name: 'YoutubeIcon',
      component: <IconYoutube size={32} color='#1B1B1B' />,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 p-40'>
      <div className='mx-auto max-w-1200'>
        <h1 className='text-32 mb-40 text-center font-bold'>
          GlobalNomad 아이콘 샘플
        </h1>

        <div className='grid grid-cols-2 gap-24 md:grid-cols-3 lg:grid-cols-4'>
          {icons.map(({ name, component }, index) => (
            <div
              key={index}
              className='rounded-8 flex min-h-120 flex-col items-center justify-center border border-gray-300 bg-white p-16'
            >
              <div className='mb-12 flex items-center justify-center'>
                {component}
              </div>
              <p className='text-14 text-center font-medium break-all text-gray-700'>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
