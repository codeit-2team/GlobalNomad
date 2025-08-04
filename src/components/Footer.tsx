import IconGithub from '@assets/svg/github';

export default function Footer() {
  return (
    <footer className='bg-nomad w-full pt-32 pb-66 text-lg text-[#676767] md:px-111 md:pb-111'>
      <div className='mx-auto flex max-w-1200 flex-col items-center justify-between gap-4 md:flex-row'>
        {/* mobile 버전 */}
        <div className='flex flex-row gap-25 md:hidden'>
          {/* 좌측: 저작권 */}
          <div className='text-center md:text-left'>@NoSleepNoBugs<br />2025</div>

          {/* 중앙: 내비게이션 */}
          <div className='flex justify-center gap-30'>
            <div className='transition-colors'>
              Privacy Policy
            </div>
            <div className='transition-colors'>
              FAQ
            </div>
          </div>
        </div>

        {/* pc,tablet 버전 */}
        {/* 좌측: 저작권 */}
        <div className='hidden text-center md:block md:text-left'>
          @NoSleepNoBugs - 2025
        </div>

        {/* 중앙: 내비게이션 */}
        <div className='hidden justify-center gap-30 md:flex'>
          <div className='transition-colors'>
            Privacy Policy
          </div>
          <div className='transition-colors'>
            FAQ
          </div>
        </div>

        {/* 우측: SNS 아이콘 */}
        <div className='mt-24 flex justify-center gap-12 md:mt-0'>
          <a href='https://github.com/codeit-2team/GlobalNomad' target='_blank' rel='noopener noreferrer'>
            <IconGithub size={20} color="#fff" className="hover:opacity-80" />
          </a>
        </div>
      </div>
    </footer>
  );
}
