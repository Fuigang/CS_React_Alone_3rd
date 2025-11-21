import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useStore";
import { caxios } from "../../../config/config";

function useMypage(isEditing) {
    const { getbabySeq, id } = useAuthStore((state) => state);
    const [data, setData] = useState({});
    const [regexAuth, setRegexAuth] = useState({
        email: false, emailAuth: false, nickName: false, nickNameChack: false,
        phone1: false, phone2: false
    });
    const regexMap = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // e-mail 정규식(영서띠가보내줌)
        nickName: /^[가-힣0-9]{2,6}$/, // 닉네임 한글 2~6글자
        phone1: /^\d{4}$/, // 전화번호 4자씩 끊어서 검사할거라 4만함
        phone2: /^\d{4}$/ // 전화번호 4자씩 끊어서 검사할거라 4만함
    };
    const [inputCount, setInputCount] = useState({
        email: 0, emailAuth: 0,
        nickName: 0, phone1: 0, phone2: 0
    });

    // 전화번호 입력창 정수만 입력하게 막는 로직
    const handleIntegerInput = (e) => {
        if (e.data === null) return;
        if (!/^\d+$/.test(e.data)) { e.preventDefault(); }
    }

    useEffect(() => {
        caxios.get("/user/mypage")
            .then(resp => {
                console.log(resp.data);
                const phone1 = resp.data.contact.substring(3, 7);
                const phone2 = resp.data.contact.substring(7);
                setData(prev => ({ ...resp.data, phone1, phone2 }));

            })
            .catch(err => console.log(err));
    }, [id, isEditing]);

    // 핸들러 
    const hendleChange = (e) => {
        if (!isEditing) return;

        const { name, value } = e.target;

        if (name === "nickname") { setRegexAuth(prev => ({ ...prev, nickNameChack: false })) }
        
        setInputCount(prev => ({ ...prev, [name]: 1 }));
        setData(prev => ({ ...prev, [name]: value }));
        
        const regex = regexMap[name];
        const isValid = regex ? regex.test(value) : false;
        let finalIsValid = isValid;
        setRegexAuth(prev => ({ ...prev, [name]: finalIsValid }));
    }

    // 아이디 중복검사 버튼
    const chackClick=()=>{
        if(!regexAuth.nickName){alert("올바른 입력값(한글 2~6자)을 입력해주세요"); return;}
        caxios.post("/user/nickNameChack", {nickname : data.nickname})
    }

    // 완료버튼
    const handleComplete = () => {
        if (Object.values(data).some(value => !value)) {
            return;
        }
    }

    return {
        data
    }
}
export default useMypage;