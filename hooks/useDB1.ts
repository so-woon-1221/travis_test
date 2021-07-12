import { useQuery } from "react-query";
import axios from "../lib/api";
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Test } from "../types/test";

const getData = async (
  gender: Array<string>,
  age: Array<string>,
  area: Array<string>,
  type: number,
  product: string,
): Promise<Test[]> => {
  const { data } = await axios.get(
    `/api/METIS/MT1?gender=${gender}&age=${age}&area=${area}&type=${type}&product=${product}`,
  );
  return data;
};

export const useDB1 = (
  gender: Array<string>,
  age: Array<string>,
  area: Array<string>,
  type: number,
  product: string,
) => {
  return useQuery(
    ["DB1", { gender, age, area, type }],
    () => getData(gender, age, area, type, product),
    {},
  );
};
