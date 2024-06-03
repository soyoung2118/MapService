import React, { useEffect, useState } from "react";
import { Info } from "../../../types/info";
import "./InfoWindow.css";

interface InfoWindowProps {
  map: naver.maps.Map;
  selectInfo: Info | null;
  onSubmit?: () => void;
}

function InfoWindow({ map, selectInfo, onSubmit }: InfoWindowProps) {
  // 인포윈도우를 초기화시켜주는 부분과 selectInfo가 변경될 때마다 해당 content가 바뀌게 되는 로직이 다르기 때문에
  // 초기화한 인포윈도우의 상태를 관리할 수 있도록 useState를 활용해 상태 관리하기
  const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null
  );

  // 인포윈도우를 초기화해주는 코드
  useEffect(() => {
    const _infoWindow = new naver.maps.InfoWindow({
      content: "",
      backgroundColor: "transparent",
      borderWidth: 0,
      disableAnchor: true,
      // 인포윈도우가 띄워지는 위치를 표시하는 부분
      pixelOffset: new naver.maps.Point(10, -20),
    });

    // 초기화한 인포윈도우 객체를 setInfoWindow로 넘기기
    setInfoWindow(_infoWindow);

    return () => {
      _infoWindow?.setMap(null);
    };
  }, []);

  // selectInfo 가 변경될 때 content가 변경하기
  useEffect(() => {
    if (!infoWindow || !map) return;
    if (selectInfo) {
      infoWindow.setContent(InfoWindowMaker(selectInfo, onSubmit));
      infoWindow.open(map, selectInfo.position);
    } else {
      infoWindow.close();
    }
  }, [selectInfo]);

  return null;
}

// 인포윈도우를 위한 컨텐츠를 생성하는 함수
function InfoWindowMaker(selectInfo: Info, onSubmit?: () => void) {
  const infoWindowBox = document.createElement("div");
  infoWindowBox.className = "infoBox";

  const infoWindowPlace = document.createElement("div");
  infoWindowPlace.className = "infoPlaceName";
  infoWindowPlace.innerHTML = `${selectInfo.placeName}`;
  infoWindowBox.appendChild(infoWindowPlace);

  const infoWindowAddress = document.createElement("div");
  infoWindowAddress.className = "infoAddressName";
  infoWindowAddress.innerHTML = `${selectInfo.addressName}`;
  infoWindowBox.appendChild(infoWindowAddress);

  if (onSubmit) {
    const infoWindowButton = document.createElement("div");
    infoWindowButton.className = "infoSubmit";
    infoWindowButton.innerHTML = "등록";
    infoWindowButton.onclick = onSubmit;
    infoWindowBox.appendChild(infoWindowButton);
  }

  return infoWindowBox;
}

export default InfoWindow;
