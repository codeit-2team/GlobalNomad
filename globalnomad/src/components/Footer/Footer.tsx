// components/Footer.tsx

import IconFacebook from '@/app/assets/icons/facebook';
import IconInstagram from '@/app/assets/icons/instagram';
import IconYouTube from '@/app/assets/icons/youtube';
import IconTwitter from '@/app/assets/icons/twitter';

export default function Footer() {
  return (
    <footer className="w-full bg-nomad text-[#676767] pt-32 pb-66 md:px-111 md:pb-111 text-lg">
      <div className="max-w-1200 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* mobile 버전 */}
        <div className="md:hidden flex flex-row gap-12">
          {/* 좌측: 저작권 */}
          <div className="text-center md:text-left">
            ©codeit - 2023
          </div>

          {/* 중앙: 내비게이션 */}
          <div className="flex justify-center gap-30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>

        {/* pc,tablet 버전 */}
          {/* 좌측: 저작권 */}
          <div className="hidden md:block text-center md:text-left">
            ©codeit - 2023
          </div>

          {/* 중앙: 내비게이션 */}
          <div className="hidden md:flex justify-center gap-30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>

        {/* 우측: SNS 아이콘 */}
        <div className="flex gap-12 justify-center mt-24 md:mt-0">
          <a href="#"><IconFacebook /></a>
          <a href="#"><IconTwitter /></a>
          <a href="#"><IconYouTube /></a>
          <a href="#"><IconInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
