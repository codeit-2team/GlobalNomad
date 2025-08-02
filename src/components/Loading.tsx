'use client';

export default function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <div
        className='animate-loader-spin aspect-square w-80 rounded-full bg-green-300 p-2'
        style={{
          WebkitMask:
            'conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box',
          mask: 'conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box',
          WebkitMaskComposite: 'source-out',
          maskComposite: 'subtract',
        }}
      />
      <style jsx>{`
        @keyframes loader-spin {
          to {
            transform: rotate(1turn);
          }
        }

        .animate-loader-spin {
          animation: loader-spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
