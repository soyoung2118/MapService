import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { mapAtom } from "../atoms/map";
import Marker from "./common/Marker";
import { infosAtom, selectInfoAtom } from "../atoms/info";
import { Info } from "../types/info";
import InfoWindow from "./common/InfoWindow";


function MarkersContainer() {
  const map = useAtomValue(mapAtom);
  const infos = useAtomValue(infosAtom);
  // 전역 상태로 관리할 예정이기 때문에 아래 코드 추가
  const [selectInfo, setSelectInfo] = useAtom(selectInfoAtom);
  
  // map이 없거나 infos가 없다면 return null
  if (!map || !infos) return null;

  // 마커를 생성하는 코드를 return하기
  return (
    <>
      {infos.map((info: Info) => (
        <Marker
          key={info.id}
          map={map}
          position={info.position}
          content={'<div class="marker" />'}
          onClick={() => {
            setSelectInfo(info);
          }}
        />
      ))}
      {selectInfo &&  (
        <Marker
          key={selectInfo.id}
          map={map}
          position={selectInfo.position}
          content={'<div class="marker select" />'}
          onClick={() => {
            setSelectInfo(null)
          }}
        />
      )}
      <InfoWindow map={map} selectInfo={selectInfo} />
    </>
  );
}

export default MarkersContainer;
