import { useAtom, useAtomValue } from "jotai";
import React, { useCallback } from "react";
import { mapAtom } from "../atoms/map";
import Marker from "./common/Marker";
import { infosAtom, selectInfoAtom } from "../atoms/info";
import { Info } from "../types/info";
import InfoWindow from "./common/InfoWindow";

interface MarkersContainerProps {
  type?: "home" | "upload";
}

function MarkersContainer({ type = "home" }: MarkersContainerProps) {
  const map = useAtomValue(mapAtom);
  const infos = useAtomValue(infosAtom);
  // 전역 상태로 관리할 예정이기 때문에 아래 코드 추가
  const [selectInfo, setSelectInfo] = useAtom(selectInfoAtom);

  const onSubmit = useCallback(() => {
    console.log('제출!!')
  },[])

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
      {selectInfo && (
        <Marker
          key={selectInfo.id}
          map={map}
          position={selectInfo.position}
          content={'<div class="marker select" />'}
          onClick={() => {
            setSelectInfo(null);
          }}
        />
      )}
      <InfoWindow map={map} selectInfo={selectInfo} onSubmit={type==="upload" ? onSubmit: undefined} />
    </>
  );
}

export default MarkersContainer;
