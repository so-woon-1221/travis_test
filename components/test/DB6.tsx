import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Pie, Summer } from "../../types/summer";
import ChannelPie from "../channel/ChannelPie";
import ChannelBar from "../channel/ChannelBar";
import CustomerTable from "../channel/CustomerTable";
import GenderChart from "../channel/GenderChart";
import AgeChart from "../channel/AgeChart";

interface brand {
  id: number;
  name: string;
  can: boolean;
}

const DB6: React.FC = () => {
  const [pieData, setPieData] = useState<Pie[]>([]);
  const [barData, setBarData] = useState<
    Map<string, Array<{ YM: string; data: number }>>
  >(new Map());
  const [brandList, setBrandList] = useState<brand[]>([]);
  const [yearTotal, setYearTotal] = useState<Map<string, number>>(new Map());
  const [customerMap, setCustomerMap] = useState<
    Map<
      string,
      Array<{
        model: string;
        customerAmount: number;
        amount: number;
        buyAmount: number;
        brand: string;
      }>
    >
  >(new Map());
  const [genderData, setGenderData] = useState<
    Array<{ brand: string; male: number; female: number }>
  >([]);
  const [ageData, setAgeData] = useState<
    Array<{
      brand: string;
      20: number;
      30: number;
      40: number;
      50: number;
      60: number;
    }>
  >([]);

  useEffect(() => {
    // @ts-ignore
    d3.json("data.json").then((data: Array<Summer>) => {
      //pie chart Data /////////////////////////////////////////////////////////////////////////////////////
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
      //////////

      // bar chart Data ///////////////////////////////////////////////////////////////////////////////////////
      const tempBar: Map<
        string,
        Array<{ YM: string; data: number }>
      > = new Map();
      const brandList = Array.from(pie.keys());
      setBrandList(
        brandList.map((d, i) => {
          return { id: i, name: d, can: false };
        }),
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const brand of brandList) {
        const newBar = d3.group(pie.get(brand)!, (d) => d.YM);
        const keys = newBar.keys();
        const tempData = [];
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const year of keys) {
          const data = newBar.get(year);
          if (data) {
            tempData.push({ YM: year, data: data.length });
          }
        }
        // @ts-ignore
        tempBar.set(brand, tempData);
      }
      setBarData(tempBar);
      const yearData = d3.group(data, (d) => d.YM);
      const yearTotal = new Map();
      // @ts-ignore
      // eslint-disable-next-line no-restricted-syntax
      for (const year of yearData.keys()) {
        yearTotal.set(year, yearData.get(year)!.length);
      }
      setYearTotal(yearTotal);
      //////////

      // 채널별 구매자수 //////////////////////////////////////////////////////////////////////////////////////
      const customerMap: Map<
        string,
        Array<{
          model: string;
          customerAmount: number;
          amount: number;
          buyAmount: number;
          brand: string;
        }>
      > = new Map();
      // eslint-disable-next-line no-restricted-syntax
      for (const brand of brandList) {
        const modelData = d3.group(pie.get(brand)!, (d) => d.MODEL_NAME_adj);
        const keys = modelData.keys();
        let tempData: Array<{
          model: string;
          customerAmount: number;
          amount: number;
          buyAmount: number;
          brand: string;
        }> = [];
        //@ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const model of keys) {
          let buyAmount = 0;
          let amount = 0;
          const customerAmount = modelData.get(model)!.length;
          let brand = "";
          for (let i = 0; i < customerAmount; i++) {
            buyAmount += modelData.get(model)![i].QNTY_SUM;
            amount += modelData.get(model)![i].AMT_SUM;
            brand = modelData.get(model)![i].BRAND_NAME;
          }
          tempData.push({
            // model: model.replace(/(\s*)/g, ""),
            model,
            customerAmount,
            amount,
            buyAmount,
            brand,
          });
        }
        tempData = tempData
          .sort((a, b) => b.customerAmount - a.customerAmount)
          .slice(0, 10);
        customerMap.set(brand, tempData);
      }
      setCustomerMap(customerMap);
      //////

      // 채널별 구매자 - 성별 프로파일 //////////////////////////////////////////////////////////////////////////////////
      const genderData: Array<{
        brand: string;
        male: number;
        female: number;
      }> = [];
      const ageData: Array<{
        brand: string;
        20: number;
        30: number;
        40: number;
        50: number;
        60: number;
      }> = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const brand of brandList) {
        const genderMap = d3.group(pie.get(brand)!, (d) => d.GENDER_CODE);
        const male =
          genderMap.get("M") === undefined ? 0 : genderMap.get("M")!.length;
        const female =
          genderMap.get("F") === undefined ? 0 : genderMap.get("F")!.length;
        genderData.push({
          brand,
          male,
          female,
        });
        const ageMap = d3.group(pie.get(brand)!, (d) => d.BIRTH_YEAR);
        let age20 = 0;
        let age30 = 0;
        let age40 = 0;
        let age50 = 0;
        let age60 = 0;
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (let key of ageMap.keys()) {
          key = key === undefined ? "no" : key;
          const temp = ageMap.get(key);
          if (temp) {
            switch (key.charAt(0)) {
              case "2":
                age20 += temp.length;
                break;
              case "3":
                age30 += temp.length;
                break;
              case "4":
                age40 += temp.length;
                break;
              case "5":
                age50 += temp.length;
                break;
              case "6":
                age60 += temp.length;
                break;
              default:
                break;
            }
          }
        }
        ageData.push({
          brand,
          20: age20,
          30: age30,
          40: age40,
          50: age50,
          60: age60,
        });
      }
      setGenderData(
        genderData
          .sort((a, b) => b.female + b.male - a.female - a.male)
          .slice(0, 5)
          .map((d) => {
            const total = d.female + d.male;
            return {
              brand: d.brand,
              male: (d.male / total) * 100,
              female: (d.female / total) * 100,
            };
          }),
      );
      setAgeData(
        ageData
          .sort(
            (a, b) =>
              b["20"] +
              b["30"] +
              b["40"] +
              b["50"] +
              b["60"] -
              a["50"] -
              a["60"] -
              a["40"] -
              a["30"] -
              a["20"],
          )
          .slice(0, 5)
          .map((d) => {
            const total = d["20"] + d["30"] + d["40"] + d["50"] + d["60"];
            return {
              brand: d.brand,
              20: (d["20"] / total) * 100,
              30: (d["30"] / total) * 100,
              40: (d["40"] / total) * 100,
              50: (d["50"] / total) * 100,
              60: (d["60"] / total) * 100,
            };
          }),
      );
      ////
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex lg:space-x-4 flex-wrap lg:space-y-0 space-y-4">
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-96 w-full hover:shadow-xl relative">
          {pieData.length > 1 && (
            <>
              <span className="absolute top-4 left-4">구매 채널 비율</span>
              <ChannelPie data={pieData} />
            </>
          )}
        </div>
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-96 w-full relative hover:shadow-xl">
          {barData.size > 1 && (
            <>
              <span className="absolute top-4 left-4">채널별 구매율 변화</span>
              {/*@ts-ignore*/}
              <ChannelBar
                data={barData}
                brandList={brandList}
                yearTotal={yearTotal}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex lg:space-x-4 flex-wrap lg:space-y-0 space-y-4">
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-100 w-full hover:shadow-xl relative">
          {customerMap.size > 1 && (
            <>
              <span className="absolute top-4 left-4">채널별 판매순위</span>
              <CustomerTable data={customerMap} brandList={brandList} />
            </>
          )}
        </div>
      </div>
      <div className="flex lg:space-x-4 flex-wrap lg:space-y-0 space-y-4">
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-100 w-full hover:shadow-xl relative">
          {genderData.length > 1 && (
            <>
              <span className="absolute top-4 left-4">
                Top5 채널 구매자 프로파일 | 성별
              </span>
              <GenderChart data={genderData} />
            </>
          )}
        </div>
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-100 w-full hover:shadow-xl relative">
          {ageData.length > 1 && (
            <>
              <span className="absolute top-4 left-4">
                Top5 채널 구매자 프로파일 | 연령별
              </span>
              <AgeChart data={ageData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DB6;
