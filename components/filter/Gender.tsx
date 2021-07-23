import React, { SetStateAction, useEffect } from "react";
import { findButtonAndFill } from "../../lib/findButtonAndFill";
import { onChangeState } from "../../lib/onChangeState";

interface Props {
  gender: Array<string>;
  setGender: ReturnType<SetStateAction<any>>;
  isArray: boolean;
}

const Gender: React.FC<Props> = ({ gender, setGender, isArray }) => {
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeState(e, gender, setGender, isArray);
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
        data-value={isArray ? "남성" : "male"}
        onClick={onClickButton}
      >
        male
      </button>
      <button
        className="hover:bg-gray-200 rounded py-1.5 px-3"
        type="button"
        data-value={isArray ? "여성" : "female"}
        onClick={onClickButton}
      >
        female
      </button>
    </div>
  );
};

export default Gender;
