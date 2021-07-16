import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import { useDB1 } from "../../hooks/useDB1";
import Gender from "../filter/Gender";
import Area from "../filter/Area";
import Age from "../filter/Age";
import useResizeObserver from "../../hooks/useResizeObserver";
import getFilteredData from "../../hooks/getFilteredData";

const DB4 = () => {
  const [gender, setGender] = useState(["all"]);
  const [area, setArea] = useState(["all"]);
  const [age, setAge] = useState(["all"]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { status, data, error } = useDB1(gender, age, area, 1, "클렌징");

  const wrapperRef = useRef();
  // @ts-ignore
  const dimensions: ResizeObserverEntry.contentRect =
    useResizeObserver(wrapperRef);

  useEffect(() => {
    if (dimensions) {
      setWidth(dimensions.width);
      setHeight(dimensions.height + 100);
    }
  }, [dimensions]);

  const wrapper = document.getElementById("wrapper");
  // eslint-disable-next-line consistent-return
  const drawChart = useCallback(() => {
    if (status === "loading") {
      d3.select(wrapper).selectAll("*").remove();
      return false;
    }

    if (wrapper && status === "success" && data) {
      // 데이터 조작 ///////////////////////////////////////////////////////////////////////////////////
      const { newData, names } = getFilteredData(age, gender, area, data);
      console.log(newData);
      ////

      // svg 그리기 ////////////////////////////////////////////////////////////////////////////////////
      let svg: d3.Selection<any, any, any, any>;
      if (document.getElementById("chart")) {
        svg = d3.select("#chart");
      } else {
        svg = d3.select(wrapper).append("svg");
        svg.attr("id", "chart");
        svg.attr("width", "100%").attr("height", `${height + 100}`);
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("g").attr("id", "chartArea");
        svg
          .append("g")
          .attr("id", "legend")
          .attr("transform", `translate(30,${height - 80})`);
      }

      const legendLinear = legendColor()
        .shapeWidth(names[0].length * 8)
        .orient("horizontal")
        .labels(names)
        .cells(names.length)
        .title("범례")
        .scale(d3.scaleOrdinal(names, d3.schemeCategory10));

      // @ts-ignore
      svg.select("#legend").call(legendLinear);
      document.querySelector(".legendCells")!.classList.add("space-x-4");

      const getDate = (YM: string) => {
        const year = YM.substr(0, 4);
        const month = Number.parseInt(YM.substr(4, 2), 10) - 1;
        return new Date(Number(year), month);
      };

      const x = d3
        .scaleTime()
        // @ts-ignore
        .domain(d3.extent(data.map((d) => getDate(d.YM))))
        .range([80, width - 50]);
      const max = Number(d3.max(data.map((d) => d.DATA)));
      const min = Number(d3.min(data.map((d) => d.DATA)));
      const y = d3
        .scaleLinear()
        // @ts-ignore
        .domain([max + max / 20, min - min / 20])
        .range([0, height - 120]);

      const xAxis = svg
        .select("#xAxis")
        .attr("transform", `translate(0, ${height - 120})`)
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
          return x(getDate(d.x));
        })
        .y((d) => {
          // @ts-ignore
          return y(d.y);
        });

      // svg.selectAll(".line").remove();
      svg
        .selectAll(".line")
        .data(newData)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d, i) => d3.schemeCategory10[i])
        .attr("stroke-width", 2)
        .attr("class", "line")
        .transition()
        // @ts-ignore
        .attr("d", (d) => line(d.data));
      //////
    }
  }, [status, data, width, height]);

  return (
    <>
      <Gender gender={gender} setGender={setGender} />
      <Area area={area} setArea={setArea} />
      <Age age={age} setAge={setAge} />
      {/*@ts-ignore*/}
      <div id="wrapper" className="w-full h-96 relative" ref={wrapperRef}>
        {status === "loading" && <div>로딩중</div>}
        {status === "success" && data && data?.length > 1 && drawChart()}
        <div className="absolute top-0 left-1/2 hidden" id="loading">
          로딩 중
        </div>
      </div>
    </>
  );
};

export default DB4;
