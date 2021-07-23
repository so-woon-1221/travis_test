import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Pie, Summer } from "../../types/summer";
import ChannelPie from "../channel/ChannelPie";

const DB6: React.FC = () => {
  const [pieData, setPieData] = useState<Pie[]>([]);
  useEffect(() => {
    // @ts-ignore
    d3.json("data.json").then((data: Array<Summer>) => {
      const pie = d3.group(data, (d) => d.SMTD_SHOP_NAME);
      const tempPie: Array<Pie> = [];
      const keys = pie.keys();
      // @ts-ignore
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        const data = pie.get(key);
        if (data) {
          const { length } = data;
          tempPie.push({ SMTD_SHOP_NAME: key, data: length, percent: 0 });
        }
      }
      const total = d3.sum(tempPie, (d) => d.data);
      // eslint-disable-next-line no-restricted-syntax
      for (const data of tempPie) {
        data.percent = Math.round((data.data / total) * 100);
      }
      setPieData(tempPie.sort((a, b) => b.data - a.data));
    });
  }, []);
  return (
    <div>
      <div className="flex lg:space-x-4 flex-wrap lg:space-y-0 space-y-4">
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-96 w-full hover:shadow-xl relative">
          {pieData.length > 1 && (
            <>
              <span className="absolute top-4 left-4">구매 채널 비율</span>
              <ChannelPie data={pieData} />
            </>
          )}
        </div>
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-96 w-full">
          aa
        </div>
      </div>
    </div>
  );
};

export default DB6;
