import React, { useEffect } from "react";

interface MapProps {
  width: string;
  height: string;
  initMap?: (map: naver.maps.Map) => void;  // initMap을 props로 받아올 예정
}

function Map({ width, height, initMap }: MapProps) {
  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };

    const map = new naver.maps.Map("map", mapOptions);
    if(initMap) {
      initMap(map);
    }

  });

  return <div id="map" style={{ width, height }}></div>;
}

export default Map;
