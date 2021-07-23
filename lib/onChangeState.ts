import React from "react";

export const onChangeState = (
  e: React.MouseEvent<HTMLButtonElement>,
  filterArray: Array<string>,
  setter: ReturnType<React.SetStateAction<any>>,
  isArray: boolean,
) => {
  const target = e.target as HTMLElement;
  const temp = target.dataset.value as string;
  let newState: string[] = [];
  if (isArray) {
    if (
      (filterArray.length === 1 && filterArray.includes("all")) ||
      temp === "all"
    ) {
      newState.push(temp);
    } else if (filterArray.length >= 1 && filterArray.includes(temp)) {
      newState = [...filterArray];
      newState = newState.filter((d) => d !== temp);
    } else {
      newState = [...filterArray];
      newState.push(temp);
    }
    setter(newState);
  } else {
    newState.push(temp);
    setter(newState);
  }
};
