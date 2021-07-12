import React, { SetStateAction, useEffect } from "react";
import { findButtonAndFill } from "../../lib/findButtonAndFill";
import { onChangeState } from "../../lib/onChangeState";

interface Props {
  gender: Array<string>;
  setGender: ReturnType<SetStateAction<any>>;
}

const Gender: React.FC<Props> = ({ gender, setGender }) => {
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeState(e, gender, setGender);
  };

  useEffect(() => {
    findButtonAndFill("genderFilter", gender);
  }, [gender]);

  return (
    <div
      className="flex flex-grow py-2 pl-2 items-center space-x-3"
      id="genderFilter"
    >
      <span className="font-bold border-r border-black w-20">GENDER</span>
      <button
        className="hover:bg-gray-200 hover:shadow-lg rounded py-1.5 px-3"
        type="button"
        onClick={onClickButton}
        data-value="all"
      >
        all
      </button>
      <button
        className="hover:text-red-500 rounded py-1.5 px-3"
        type="button"
        data-value="남성"
        onClick={onClickButton}
      >
        male
      </button>
      <button
        className="hover:bg-gray-200 rounded py-1.5 px-3"
        type="button"
        data-value="여성"
        onClick={onClickButton}
      >
        female
      </button>
    </div>
  );
};

export default Gender;
