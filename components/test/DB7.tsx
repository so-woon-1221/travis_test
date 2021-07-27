import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { loopHooks } from "react-table";
import CustomerProfile from "../customer/CustomerProfile";
import { Summer } from "../../types/summer";

const DB7: React.FC = () => {
  const [customerProfile, setCustomerProfile] = useState<
    Array<{ name: string; data: number }>
  >([]);
  useEffect(() => {
    // @ts-ignore
    d3.json("data.json").then((data: Array<Summer>) => {
      const genderMap = d3.group(data, (d) => d.GENDER_CODE);
      const profileMap: Map<string, Map<string, Array<Summer>>> = new Map();
      const gender = ["M", "F"];
      for (let i = 0; i < gender.length; i++) {
        const key = gender[i];
        const genderData = genderMap.get(key);
        const ageMap = d3.group(genderData!, (d) => d.BIRTH_YEAR);
        const newAgeMap = new Map();
        const age20 = [];
        const age30 = [];
        const age40 = [];
        const age50 = [];
        const age60 = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const key of ageMap.keys()) {
          const tempData = ageMap.get(key);
          if (key !== undefined) {
            switch (key.charAt(0)) {
              case "2":
                age20.push(
                  tempData!.map((d) => {
                    return {
                      model: d.MODEL_NAME_adj,
                      brand: d.BRAND_NAME,
                      priceAmount: d.AMT_SUM,
                      countAmount: d.QNTY_SUM,
                    };
                  }),
                );
                break;
              case "3":
                age30.push(
                  tempData!.map((d) => {
                    return {
                      model: d.MODEL_NAME_adj,
                      brand: d.BRAND_NAME,
                      priceAmount: d.AMT_SUM,
                      countAmount: d.QNTY_SUM,
                    };
                  }),
                );
                break;
              case "4":
                age40.push(
                  tempData!.map((d) => {
                    return {
                      model: d.MODEL_NAME_adj,
                      brand: d.BRAND_NAME,
                      priceAmount: d.AMT_SUM,
                      countAmount: d.QNTY_SUM,
                    };
                  }),
                );
                break;
              case "5":
                age50.push(
                  tempData!.map((d) => {
                    return {
                      model: d.MODEL_NAME_adj,
                      brand: d.BRAND_NAME,
                      priceAmount: d.AMT_SUM,
                      countAmount: d.QNTY_SUM,
                    };
                  }),
                );
                break;
              case "6":
                age60.push(
                  tempData!.map((d) => {
                    return {
                      model: d.MODEL_NAME_adj,
                      brand: d.BRAND_NAME,
                      priceAmount: d.AMT_SUM,
                      countAmount: d.QNTY_SUM,
                    };
                  }),
                );
                break;
              default:
                break;
            }
          }
        }
        newAgeMap.set("20대", age20[0].concat(age20[1]));
        newAgeMap.set("30대", age30[0].concat(age30[1]));
        newAgeMap.set("40대", age40[0].concat(age40[1]));
        newAgeMap.set("50대", age50[0].concat(age50[1]));
        newAgeMap.set("60대 이상", age60[0].concat(age60[1]));
        profileMap.set(key, newAgeMap);
      }
      let customerProfile = [];
      let total = 0;
      for (const data of profileMap) {
        for (const temp of data[1].entries()) {
          const rankData = [];
          customerProfile.push({
            name: `${temp[0]}${data[0] === "M" ? " 남성" : " 여성"}`,
            data: temp[1].length,
          });
          total += temp[1].length;
        }
      }
      customerProfile = customerProfile
        .sort((a, b) => b.data - a.data)
        .map((d) => {
          return {
            name: d.name,
            data: (d.data / total) * 100,
          };
        });
      setCustomerProfile(customerProfile);
    });
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex lg:space-x-4 flex-wrap lg:space-y-0 space-y-4">
        <div className="lg:w-half flex-grow bg-gray-200 rounded-xl h-96 w-full hover:shadow-xl relative">
          <>
            <div className="flex h-12 px-4 items-center">
              <span>구매자 프로파일</span>
            </div>
            <div style={{ height: "calc(100% - 3rem)" }}>
              {customerProfile.length > 1 && (
                <CustomerProfile data={customerProfile} />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DB7;
