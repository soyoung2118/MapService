import { useSetAtom } from "jotai";
import MapContainer from "../../components/MapContainer";
import Navigation from "../../components/Navigation";
import { infosAtom } from "../../atoms/info";
import { infos } from "../../data/infos";
import MarkersContainer from "../../components/MarkersContainer";

function Home() {
  // infos에 대한 데이터를 set할 수 있는 함수 가져오기 
  const setInfos = useSetAtom(infosAtom);

  // 이전에 만들어 놓은 데이터를 받아와서 전역 상태로 초기화
  if(infos){
    setInfos(infos);
  }

  return (
    <>
      <Navigation />
      <MapContainer />
      <MarkersContainer />
    </>
  );
}

export default Home;
