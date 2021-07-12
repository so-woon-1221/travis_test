import React, { SetStateAction, useEffect } from "react";
import { findButtonAndFill } from "../../lib/findButtonAndFill";
import { onChangeState } from "../../lib/onChangeState";

interface Props {
  area: Array<string>;
  setArea: ReturnType<ReturnType<SetStateAction<any>>>;
}
const Area: React.FC<Props> = ({ area, setArea }) => {
  const areaList = ["all", "서울", "경기", "대구", "광주", "부산"];

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeState(e, area, setArea);
  };

  useEffect(() => {
    findButtonAndFill("areaFilter", area);
  }, [area]);

  return (
    <div className="flex py-2 pl-2 items-center space-x-3" id="areaFilter">
      <span className="font-bold border-r border-black w-20">AREA</span>
      {areaList.map((area, i) => (
        <button
          key={i}
          className="hover:bg-gray-200 rounded py-1.5 px-3"
          type="button"
          data-value={`${area}`}
          onClick={onClickButton}
        >
          {area}
        </button>
      ))}
    </div>
  );
};

export default Area;
