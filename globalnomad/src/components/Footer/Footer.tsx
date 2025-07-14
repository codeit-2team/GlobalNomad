// components/Footer.tsx

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0C1B0D] text-white px-4 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
        
        {/* 좌측: 저작권 */}
        <div className="text-center md:text-left">
          ©codeit - 2023
        </div>

        {/* 중앙: 내비게이션 */}
        <div className="flex gap-4 justify-center">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* 우측: SNS 아이콘 */}
        <div className="flex gap-3 justify-center">
          <a href="#"><Image src="/img/icon/facebook.svg" alt="facebook" width={18} height={18} /></a>
          <a href="#"><Image src="/img/icon/twitter.svg" alt="twitter" width={18} height={18} /></a>
          <a href="#"><Image src="/img/icon/youtube.svg" alt="youtube" width={18} height={18} /></a>
          <a href="#"><Image src="/img/icon/instagram.svg" alt="instagram" width={18} height={18} /></a>
        </div>
      </div>
    </footer>
  );
}
