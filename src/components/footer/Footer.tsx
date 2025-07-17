import IconFacebook from '@assets/svg/facebook';
import IconInstagram from '@assets/svg/instagram';
import IconYouTube from '@assets/svg/youtube';
import IconTwitter from '@assets/svg/twitter';

export default function Footer() {
  return (
    <footer className='bg-nomad w-full pt-32 pb-66 text-lg text-[#676767] md:px-111 md:pb-111'>
      <div className='mx-auto flex max-w-1200 flex-col items-center justify-between gap-4 md:flex-row'>
        {/* mobile 버전 */}
        <div className='flex flex-row gap-12 md:hidden'>
          {/* 좌측: 저작권 */}
          <div className='text-center md:text-left'>©codeit - 2023</div>

          {/* 중앙: 내비게이션 */}
          <div className='flex justify-center gap-30'>
            <a href='#' className='transition-colors hover:text-white'>
              Privacy Policy
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              FAQ
            </a>
          </div>
        </div>

        {/* pc,tablet 버전 */}
        {/* 좌측: 저작권 */}
        <div className='hidden text-center md:block md:text-left'>
          ©codeit - 2023
        </div>

        {/* 중앙: 내비게이션 */}
        <div className='hidden justify-center gap-30 md:flex'>
          <a href='#' className='transition-colors hover:text-white'>
            Privacy Policy
          </a>
          <a href='#' className='transition-colors hover:text-white'>
            FAQ
          </a>
        </div>

        {/* 우측: SNS 아이콘 */}
        <div className='mt-24 flex justify-center gap-12 md:mt-0'>
          <a href='#'>
            <IconFacebook />
          </a>
          <a href='#'>
            <IconTwitter />
          </a>
          <a href='#'>
            <IconYouTube />
          </a>
          <a href='#'>
            <IconInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
