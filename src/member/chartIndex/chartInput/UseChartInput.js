import { caxios } from "../../../config/config";

// 전송 로직 분리
export const submitChartData = async ({ inputs, date, babySeq, id, measureTypes }) => {


  // const payload = Object.entries(measureTypes)
  //   .filter(([_, value]) => value !== undefined && value !== null && value !== "")
  //   .map(([type, value]) => ({
  //     baby_seq: babySeq,
  //     user_id: id,
  //     measure_date: date,
  //     measure_type: type,
  //     measure_value: parseFloat(value),
  //   }));

  // console.log("최종 전송 payload:", JSON.stringify(payload));

  const payload = Object.entries(measureTypes)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([type, value]) => {
      const numeric = parseFloat(value);
      if (isNaN(numeric)) return null; // 숫자가 아니면 건너뛰기 (필요하면 예외 처리)

      return {
        baby_seq: babySeq,
        user_id: id,
        measure_date: date,
        measure_type: type,
        measure_value: type === 'EFW' ? numeric * 1000 : numeric, // EFW는 g 단위 변환
      };
    })
    .filter(Boolean); // map에서 null 제거


  try {
    await caxios.post("/chart/insert", payload);
    alert("저장 완료!");
  } catch (err) {
    console.error(err);
    alert("저장 실패");
  }
};
