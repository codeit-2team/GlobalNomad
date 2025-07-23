// Input 입력 값 검증

const validateEmail = (value: string) => {
  if (!value) return '이메일은 필수 입력입니다.';
  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(value)) return '이메일 형식으로 작성해 주세요.';
  return '';
};

const validateNickname = (value: string) => {
  if (!value) return '닉네임은 필수 입력입니다.';
  if (value.length > 10) return '열 자 이하로 작성해주세요.';
  return '';
};

const validatePassword = (value: string) => {
  if (!value) return '비밀번호는 필수 입력입니다.';
  if (value.length < 8) return '8자 이상 작성해 주세요.';
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
  if (!regex.test(value))
    return '비밀번호는 숫자, 영문, 특수문자가 조합돼야 합니다.';
  return '';
};

const validatePasswordConfirmation = (value: string, password: string) => {
  if (!value) return '비밀번호 확인을 입력해주세요.';
  if (value !== password) return '비밀번호가 일치하지 않습니다.';
  return '';
};

export {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
};
