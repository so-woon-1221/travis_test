import React, { SetStateAction, useEffect } from "react";
import { onChangeState } from "../../lib/onChangeState";
import { findButtonAndFill } from "../../lib/findButtonAndFill";

interface Props {
  age: Array<string>;
  setAge: ReturnType<ReturnType<SetStateAction<any>>>;
  isArray: boolean;
}

const Age: React.FC<Props> = ({ age, setAge, isArray }) => {
  let ageList = [];
  if (isArray) {
    ageList = ["all", "20대", "30대", "40대", "50대"];
  } else {
    ageList = ["all", "20", "30", "40", "50"];
  }

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeState(e, age, setAge, isArray);
  };

  useEffect(() => {
    findButtonAndFill("ageFilter", age);
  }, [age]);

  return (
    <div
      className="flex flex-grow py-2 pl-2 items-center space-x-3"
      id="ageFilter"
    >
      <span className="font-bold border-r  border-black w-20">AGE</span>
      {ageList.map((age, i) => (
        <button
          key={i}
          className="hover:bg-gray-200 rounded py-1.5 px-3"
          type="button"
          data-value={`${age}`}
          onClick={onClickButton}
        >
          {age}
        </button>
      ))}
    </div>
  );
};

export default Age;
