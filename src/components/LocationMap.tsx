'use client';

import { useEffect, useState, useRef } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Location from '@assets/svg/location';
import React from 'react';

interface LocationMapProps {
  address: string;
}

const LocationMap = ({ address }: LocationMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY;
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setScriptLoad(true);
      });
    };
  }, [apiKey]);

  useEffect(() => {
    if (!scriptLoad || !address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { y, x } = result[0];
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        console.error('주소 검색 실패:', status);
      }
    });
  }, [scriptLoad, address]);

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!coords || !mapRef.current) return;

    const handleResize = () => {
      mapRef.current?.setCenter(
        new window.kakao.maps.LatLng(coords.lat, coords.lng),
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [coords]);

  if (!scriptLoad)
    return (
      <div className='flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md lg:max-w-[800px]'>
        <h2>지도 불러오는중...</h2>
      </div>
    );
  if (!coords)
    return (
      <div className='flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md lg:max-w-[800px]'>
        <h2>좌표 불러오는중...</h2>
      </div>
    );

  return (
    <>
      <div className='flex h-[480px] w-full flex-col overflow-hidden rounded-lg shadow-md lg:max-w-[1200px]'>
        {/* 지도 */}
        <Map
          center={coords}
          level={3}
          style={{ width: '100%', height: '100%' }}
          onCreate={(map) => {
            mapRef.current = map;
          }}
        >
          {/* 맵 마커 */}
          <MapMarker position={coords} />
          {/* 커스텀 오버레이 */}
          <CustomOverlayMap position={coords}>
            <div className='-translate-x-0 -translate-y-60 transform rounded-lg border bg-white p-4 shadow-lg'>
              <h4 className='text-md font-bold md:text-lg'>{address}</h4>
            </div>
          </CustomOverlayMap>
        </Map>
      </div>

      {/* 주소 텍스트 */}
      <div className='relative mt-8 flex items-center justify-start text-base font-medium'>
        <div className='flex items-center space-x-1'>
          <Location size={50} className='px-8 align-middle text-blue-700' />
          <p className='text-md md:text-lg'>{address}</p>
        </div>
      </div>
    </>
  );
};

export default React.memo(LocationMap);
