import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import TotalChart from "./totalChart/TotalChart";
import DetailChart from "./detailChart/DetailChart";
import ChartInput from "./chartInput/ChartInput"; // 오른쪽 입력 폼 컴포넌트
import styles from "./ChartIndex.module.css";
import { FETAL_STANDARDS } from "./FetalStandardData";
import { caxios } from "../../config/config";
import { useChartIndex } from "./UseChartIndex";

const ChartIndex = () => {
  // 2.  Hook을 호출하여 모든 상태와 데이터를 가져옵니다.
  const {
    menuList,
    currentWeek,
    activeMenu,
    setActiveMenu,
    currentStandardData,
    currentActualData: actualData,
  } = useChartIndex();

  // 3.  로딩 상태 처리
  if (currentWeek === 0 || actualData === null || !currentStandardData) {
    return <div className={styles.loading}>데이터를 계산하고 로딩 중입니다...</div>;
  }


  return (
    <div className={styles.body}>
      {/* 상단 버튼 영역 */}
      <div className={styles.menuSection}>
        {menuList.map((item, idx) => (
          <button
            key={idx}
            className={
              idx === activeMenu ? styles.menuActive : styles.menuButton
            }
            onClick={() => setActiveMenu(idx)} // 클릭 이벤트 추가
          >
            {item}
          </button>
        ))}
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className={styles.contentWrapper}>
        <div className={styles.chartRouteArea}>
          <Routes>
            {/* TotalChart와 DetailChart에 필요한 데이터를 props로 전달 */}
            <Route
              path="/" // URL은 고정됩니다.
              element={
                //  activeMenu 값에 따라 TotalChart와 DetailChart 중 하나만 렌더링됩니다.
                activeMenu === 0 ? (
                  <TotalChart
                    menuList={menuList} activeMenu={activeMenu}
                    currentWeek={currentWeek}
                    standardData={currentStandardData}
                    actualData={actualData}
                  />
                ) : (
                  // activeMenu가 1 이상일 때 DetailChart가 렌더링됩니다.
                  <DetailChart menuList={menuList} activeMenu={activeMenu}
                    currentWeek={currentWeek}
                    standardData={currentStandardData}
                    actualData={actualData}
                  />
                )
              }
            />
          </Routes>
        </div>

        {/* 입력폼 */}
        <ChartInput menuList={menuList} activeMenu={activeMenu} />
      </div>
    </div>
  );
};
export default ChartIndex;
