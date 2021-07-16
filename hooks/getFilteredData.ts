import { Test } from "../types/test";

const getFilteredData = (
  age: Array<string>,
  gender: Array<string>,
  area: Array<string>,
  data: Array<Test>,
) => {
  const tempData: Array<{
    name: string;
    data: Array<{ x: string; y: string }>;
  }> = [];
  if (gender.length > 1 && area.length === 1 && age.length === 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (const tempGender of gender) {
      tempData.push({ name: tempGender, data: [] });
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.GENDER}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (area.length > 1 && gender.length === 1 && age.length === 1) {
    for (const tempArea of area) {
      tempData.push({ name: tempArea, data: [] });
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.SIDO}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (age.length > 1 && gender.length === 1 && area.length === 1) {
    for (const tempAge of age) {
      tempData.push({ name: tempAge, data: [] });
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.AGE}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (area.length > 1 && gender.length > 1 && age.length === 1) {
    for (const tempArea of area) {
      for (const tempGender of gender) {
        tempData.push({ name: `${tempArea} ${tempGender}`, data: [] });
      }
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.SIDO} ${temp.GENDER}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (area.length > 1 && age.length > 1 && gender.length === 1) {
    for (const tempArea of area) {
      for (const tempAge of age) {
        tempData.push({ name: `${tempArea} ${tempAge}`, data: [] });
      }
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.SIDO} ${temp.AGE}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (age.length > 1 && gender.length > 1 && area.length === 1) {
    for (const tempAge of age) {
      for (const tempGender of gender) {
        tempData.push({ name: `${tempAge} ${tempGender}`, data: [] });
      }
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.AGE} ${temp.GENDER}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else if (area.length > 1 && age.length > 1 && gender.length > 1) {
    for (const tempArea of area) {
      for (const tempAge of age) {
        for (const tempGender of gender) {
          tempData.push({
            name: `${tempArea} ${tempAge} ${tempGender}`,
            data: [],
          });
        }
      }
    }
    for (const temp of data) {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].name === `${temp.SIDO} ${temp.AGE} ${temp.GENDER}`) {
          tempData[i].data.push({ x: temp.YM, y: temp.DATA });
        }
      }
    }
  } else {
    tempData.push({ name: "구매 금액", data: [] });

    for (const temp of data) {
      tempData[0].data.push({
        x: temp.YM,
        y: temp.DATA,
      });
    }
  }
  const names: Array<string> = [];
  for (const temp of tempData) {
    names.push(temp.name);
  }
  return { newData: tempData, names };
};

export default getFilteredData;
