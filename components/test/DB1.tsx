import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDB1 } from "../../hooks/useDB1";
import { useSelector } from "../../store";
import Gender from "../filter/Gender";
import Area from "../filter/Area";
import Age from "../filter/Age";

interface dataType {
  x: any;
  y: any;
}
interface seriesType {
  name: string;
  data: Array<dataType>;
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DB1: React.FC = () => {
  const { product } = useSelector((state) => state.common);
  const [gender, setGender] = useState(["all"]);
  const [area, setArea] = useState(["all"]);
  const [age, setAge] = useState(["all"]);

  const options = {
    chart: {
      id: "test",
    },
  };

  const { status, data, error } = useDB1(gender, age, area, 1, product);

  // eslint-disable-next-line consistent-return
  const getSeries = useCallback(() => {
    if (status === "success" && data) {
      const newSeries: Array<seriesType> = [{ name: "data", data: [] }];
      for (let i = 0; i < data?.length; i++) {
        const x = data[i].YM;
        const y = data[i].DATA;
        newSeries[0].data.push({ x, y });
      }
      return newSeries;
    }
  }, [data, status]);

  return (
    <div className="w-full h-full space-y-10 overflow-hidden">
      <div className="border-b w-full h-40">
        <Gender gender={gender} setGender={setGender} />
        <Area area={area} setArea={setArea} />
        <Age age={age} setAge={setAge} />
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && data && data?.length > 1 && (
        <>
          <Chart
            options={options}
            series={getSeries()}
            type="line"
            height={600}
          />
          <p>asdfadsadsffada</p>
          <p>asdfadsf</p>
          <p>asdfadsf</p>
          <p>asdfadsf</p>
        </>
      )}
      {status === "success" && data && data?.length < 1 && (
        <div>데이터없음</div>
      )}
      {error && <div>데이터를 불러올 수 없습니다. 오류가 발생했습니다.</div>}
    </div>
  );
};

export default DB1;
