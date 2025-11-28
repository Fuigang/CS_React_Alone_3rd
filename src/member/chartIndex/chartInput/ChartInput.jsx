import React, { useEffect, useState } from "react";
import styles from "./ChartInput.module.css";
import { submitChartData } from "./UseChartInput"; // JS 분
import useAuthStore from "../../../store/useStore";

const ChartInput = ({ menuList, activeMenu, currentWeek, inputs, setInputs, actualData, measureTypes }) => {
  const activeItem = menuList[activeMenu];
  const [isEditing, setIsEditing] = useState(false);

  const hasData = actualData && Object.keys(actualData).length > 0;
  const isDisabled = hasData && !isEditing;
  console.log("실제 데이터" + actualData.EFW);
  const [date, setDate] = useState("");

  const { id, babySeq } = useAuthStore();

  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await submitChartData({ inputs, date, babySeq, id, measureTypes });
    // 저장 완료 후 상태 처리
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancelOrUpdate = () => setIsEditing(false);

  const shouldRenderSingleInput = activeItem !== "성장";
  const isWeightInput = activeItem === "몸무게";
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (actualData?.measure_date) {
      let formattedDate;

      // measure_date가 Date 혹은 Timestamp 객체일 때
      if (actualData.measure_date instanceof Date) {
        formattedDate = actualData.measure_date.toISOString().split("T")[0];
      } else if (typeof actualData.measure_date === "string") {
        // 이미 문자열이면 그냥 사용, 혹은 YYYY-MM-DD 형태인지 체크
        formattedDate = actualData.measure_date.split("T")[0]; // "2025-11-27T..." → "2025-11-27"
      } else {
        // 그 외 타입이면 강제로 빈 문자열
        formattedDate = "";
      }

      setDate(formattedDate);
    }
  }, [actualData]);

  return (
    <div className={styles.sidePanel}>
      <div className={styles.panelHeader}>{activeItem}</div>

      <div className={styles.panelContent}>
        <label className={styles.label}>날짜</label>
        <input
          className={styles.input}
          type="date"
          placeholder="날짜"
          value={date}
          min={todayStr}
          max={todayStr}
          disabled={hasData}
          onChange={(e) => setDate(e.target.value)}
        />

        {activeItem === "성장" && (
          <div className={styles.allInputGroup}>
            {menuList.slice(1).map((item) => (
              <div key={item} className={styles.inputGroup}>
                <label className={styles.label}>{item}</label>
                {item === "몸무게" ? (
                  <div className={styles.inputWithUnit}>
                    <input
                      className={styles.input}
                      type="number"
                      // value={actualData[item] ?? ""}
                      value={inputs[item] ?? ""}
                      onChange={(e) => handleChange(item, e.target.value)}
                      placeholder={item}
                    />
                    <span className={styles.unit}>kg</span>
                  </div>
                ) : (
                  <input
                    className={styles.input}
                    type="number"
                    // value={actualData[item] ?? ""}
                    value={inputs[item] ?? ""}
                    onChange={(e) => handleChange(item, e.target.value)}
                    placeholder={item}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {shouldRenderSingleInput && activeItem !== "성장" && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>{activeItem}</label>
            {isWeightInput ? (
              <div className={styles.inputWithUnit}>
                <input
                  className={styles.input}
                  type="number"
                  value={inputs[activeItem] ?? ""}
                  onChange={(e) => handleChange(activeItem, e.target.value)}
                  placeholder={activeItem}
                />
                <span className={styles.unit}>kg</span>
              </div>
            ) : (
              <input
                className={styles.input}
                type="number"
                value={inputs[activeItem] ?? ""}
                onChange={(e) => handleChange(activeItem, e.target.value)}
                placeholder={activeItem}
              />
            )}
          </div>
        )}
      </div>

      <div className={styles.buttonRow}>
        {!hasData && (
          <button className={styles.submitBtn} onClick={handleSubmit}>
            완료
          </button>
        )}
        {hasData && isEditing && (
          <>
            <button className={styles.cancelBtn} onClick={handleCancelOrUpdate}>
              취소
            </button>
            <button className={styles.submitBtn} onClick={handleCancelOrUpdate}>
              수정완료
            </button>
          </>
        )}
        {hasData && !isEditing && (
          <button className={styles.submitBtn} onClick={handleEdit}>
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default ChartInput;
