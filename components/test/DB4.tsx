import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useDB1 } from "../../hooks/useDB1";
import Gender from "../filter/Gender";
import Area from "../filter/Area";

const DB4 = () => {
  const [gender, setGender] = useState(["all"]);
  const [area, setArea] = useState(["all"]);

  const { status, data, error } = useDB1(gender, ["all"], area, 1, "클렌징");

  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    if (wrapper && status === "success" && data) {
      let svg: d3.Selection<any, any, any, any>;
      if (document.getElementById("chart")) {
        svg = d3.select("#chart");
      } else {
        svg = d3.select(wrapper).append("svg");
        svg.attr("id", "chart");
        svg.attr("width", 750).attr("height", 650);
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("path").attr("id", "chartArea");
      }

      const getDate = (YM: string) => {
        const year = YM.substr(0, 4);
        const month = Number.parseInt(YM.substr(4, 2), 10) - 1;
        return new Date(Number(year), month);
      };

      const x = d3
        .scaleTime()
        // @ts-ignore
        .domain(d3.extent(data.map((d) => getDate(d.YM))))
        .range([80, 700]);
      const y = d3
        .scaleLinear()
        // @ts-ignore
        .domain([
          d3.max(data.map((d) => d.DATA))! + 50000000,
          Number(d3.min(data.map((d) => d.DATA))!) - 50000000,
        ])
        .range([0, 520]);

      const xAxis = svg
        .select("#xAxis")
        .attr("transform", "translate(0, 520)")
        .transition()
        // @ts-ignore
        .call(d3.axisBottom(x));
      const yAxis = svg
        .select("#yAxis")
        .attr("transform", "translate(80,0)")
        .transition()
        // @ts-ignore
        .call(d3.axisLeft(y));

      const line = d3
        .line()
        .x((d) => {
          // @ts-ignore
          return x(getDate(d.YM));
        })
        .y((d) => {
          // @ts-ignore
          return y(d.DATA);
        });

      svg
        .select("#chartArea")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .transition()
        // @ts-ignore
        .attr("d", line);
    }
  }, [status, data]);
  return (
    <>
      <Gender gender={gender} setGender={setGender} />
      <Area area={area} setArea={setArea} />
      <div id="wrapper">{status === "loading" && <div>로딩중</div>}</div>
    </>
  );
};

export default DB4;
