import React from "react";
import Map from "./common/Map";
import { useSetAtom } from "jotai";
import { mapAtom } from "../atoms/map";
import { selectInfoAtom } from "../atoms/info";

function MapContainer() {
  const setMap = useSetAtom(mapAtom); // set 할 수 있는 함수
  const setSelectInfo = useSetAtom(selectInfoAtom);
  // Map 컴포넌트에서 사용할 수 있는 함수 생성
  const initMap = (map: naver.maps.Map) => {
    setMap(map);
    naver.maps.Event.addListener(map, "click", () => {
      setSelectInfo(null);
    });
  };

  return <Map width="100%" height="100%" initMap={initMap} />;
}

export default MapContainer;
