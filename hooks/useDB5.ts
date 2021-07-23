import { useQuery } from "react-query";
import axios from "../lib/api";
// eslint-disable-next-line import/extensions, import/no-unresolved
import { DB5 } from "../types/DB5";

const getData = async (
  gender: Array<string>,
  age: Array<string>,
  product: string,
): Promise<DB5> => {
  const { data } = await axios.get(
    `/api/METIS/BA1?gender=${gender}&age=${age}&product=${product}`,
  );
  return data;
};

export const useDB5 = (
  gender: Array<string>,
  age: Array<string>,
  product: string,
) => {
  return useQuery(
    ["DB5", { gender, age }],
    () => getData(gender, age, product),
    {},
  );
};
