import React from "react";

const LoginModal = () => {
  return (
    <div className="w-10/12 md:w-128 p-10 bg-white rounded-2xl z-50">
      <h1 className="text-2xl font-extrabold mb-7">로그인</h1>
      <input
        type="email"
        className="w-full border-b border-green-300 pb-2 text-xl mb-7"
        placeholder="이메일"
      />
      <input
        type="password"
        className="w-full border-b border-green-300 pb-2 text-xl mb-7"
        placeholder="비밀번호"
      />
      <button
        type="button"
        className="w-full py-4 bg-gradient-to-r from-green-300 to-purple-300"
      >
        로그인
      </button>
    </div>
  );
};

export default LoginModal;
