import { useState } from "react";
import styles from "./Mypage.module.css";
import useMypage from "./useMypage";
const Mypage = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태변수

  const {data} =useMypage(isEditing);

  return (
    <div className={styles.container}>
      <div className={styles.parentpage}>
        <div className={styles.info}>
          <h1 className={styles.title}>회원정보</h1>
          <div className={styles.main}>
            {/* 아이디 */}
            <p className={styles.id}>아이디</p>
            <div className={styles.dbid}>{data.user_id}</div>

            {/* 닉네임 */}
            <div className={styles.nick}>
              <label htmlFor="nic">닉네임</label>
              {isEditing ? (
                <input  
                  type="text"
                  id="nic"
                  value={data.nickname}
                  className={styles.editableInput}
                />
              ) : (
                <div className={styles.dbValue}>{data.nickname}</div>
              )}
            </div>

            {/* 이메일 */}
            <div className={styles.email}>
              <label htmlFor="email">이메일</label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  className={styles.editableInput}
                />
              ) : (
                <div className={styles.dbValue}>{data.email}</div>
              )}
            </div>

            {/* 생일 */}
            <p className={styles.birthday}>생일</p>
            <div className={styles.dbbirth}>{data.birth_date}</div>

            {/* 전화번호 */}
<div className={styles.phone}>
  <label htmlFor="phone">연락처</label>
  <div className={styles.phoneWrapper}>
    {/* 010은 항상 보여주기 */}
    <span
  className={isEditing ? styles.prefixActive : styles.prefix}
>
  010
</span>
    <span className={styles.dash}>-</span>

    {isEditing ? (
      <>
        <input
          id="phone1"
          type="tel"
          value={data.phone1}
          className={styles.editableInput}
        />
        <span className={styles.dash}>-</span>
        <input
          id="phone2"
          type="tel"
          value={data.phone2}
          className={styles.editableInput}
        />
      </>
    ) : (
      <>
        <div className={styles.dbValue} style={{ height: "48px", lineHeight: "48px" }}>{data.phone1}</div>
        <span className={styles.dash}>-</span>
        <div className={styles.dbValue} style={{ height: "48px", lineHeight: "48px" }}>{data.phone2}</div>
      </>
    )}
  </div>
</div>

          </div>
        </div>

        <div className={styles.fabt}>
          <p className={styles.familycode}>가족코드</p>
          <div className={styles.familywhy}>{data.family_code}</div>

          <div className={styles.btwo}>
            {isEditing ? (
              <>
                <button
                  className={styles.delete}
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </button>
                <button
                  className={styles.success}
                  onClick={() => setIsEditing(false)}
                >
                  완료
                </button>
              </>
            ) : (
              <button
                className={styles.crbt}
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
