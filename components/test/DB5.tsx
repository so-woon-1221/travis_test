import React, { useCallback, useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Age from "../filter/Age";
import Gender from "../filter/Gender";
import { useDB5 } from "../../hooks/useDB5";
import useResizeObserver from "../../hooks/useResizeObserver";
import Table from "../filter/Table";

const DB5: React.FC = () => {
  const [age, setAge] = useState(["all"]);
  const [gender, setGender] = useState(["all"]);
  const wrapperRef = useRef();
  const dimension = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (dimension) {
      // @ts-ignore
      setWidth(dimension.width);
    }
  }, [dimension]);

  const { status, data, error } = useDB5(gender, age, "클렌징");

  const removeChart = useCallback(() => {
    if (status === "loading") {
      if (document.getElementById("chart")) {
        d3.select("#chart").remove();
      }
    }
    return null;
  }, [status]);

  const drawChart = useCallback(() => {
    if (status === "success" && data && data.result.recordset.length > 1) {
      let svg: d3.Selection<any, any, any, any>;
      if (document.getElementById("chart")) {
        svg = d3.select("#chart");
      } else {
        svg = d3.select("#wrapper").append("svg");
        svg.attr("id", "chart").attr("width", "100%").attr("height", 500);
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg.append("g").attr("id", "legend");
        svg.append("g").attr("id", "chartArea");
      }

      svg.selectAll(".chartRect").remove();

      const rank = ["0", "1", "2", "3", "4"];

      const createTooltip = () => {
        d3.select("#wrapper")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip");

        return d3.select(".tooltip");
      };

      if (!document.querySelector(".tooltip")) {
        createTooltip();
      }
      const tooltip = d3.select(".tooltip");

      const getNewData = () => {
        const nest = d3.group(data.result.recordset, (d) => d.YM);
        const newData = [];
        const monthArray = [];
        const brandData = new Map();
        // @ts-ignore
        // eslint-disable-next-line no-restricted-syntax
        for (const key of nest.keys()) {
          const tempData = nest.get(key);
          if (tempData) {
            newData.push({
              YM: key,
              "0": tempData[0].BCI,
              "1": tempData[1].BCI,
              "2": tempData[2].BCI,
              "3": tempData[3].BCI,
              "4": tempData[4].BCI,
            });
            brandData.set(`${key}0`, `${tempData[0].COM}-${tempData[0].BRAND}`);
            brandData.set(`${key}1`, `${tempData[1].COM}-${tempData[1].BRAND}`);
            brandData.set(`${key}2`, `${tempData[2].COM}-${tempData[2].BRAND}`);
            brandData.set(`${key}3`, `${tempData[3].COM}-${tempData[3].BRAND}`);
            brandData.set(`${key}4`, `${tempData[4].COM}-${tempData[4].BRAND}`);
          }
          monthArray.push(key);
        }
        return { newData, monthArray, brandData };
      };

      const { newData, monthArray, brandData } = getNewData();

      const x = d3
        .scaleBand()
        .domain(monthArray)
        .range([80, width! - 50])
        .padding(0.1);
      const xAxis = d3
        .select("#xAxis")
        .attr("transform", "translate(0, 450)")
        .call(
          // @ts-ignore
          d3.axisBottom(x).ticks(monthArray.length),
        );

      const y = d3.scaleLinear().domain([0, 100]).range([450, 20]);
      const yAxis = d3
        .select("#yAxis")
        .attr("transform", "translate(80,0)")
        // @ts-ignore
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal().domain(rank).range(d3.schemeAccent);

      newData.forEach((d) => {
        let total = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const temp of rank) {
          // @ts-ignore
          total += Number(d[temp]);
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const temp of rank) {
          // @ts-ignore
          d[temp] = (d[temp] / total) * 100;
        }
      });

      // @ts-ignore
      const stackedData = d3.stack().keys(rank)(newData);

      // @ts-ignore
      svg
        .selectAll(".chartRect")
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => color(d.key))
        .attr("class", (d) => `chartRect ${d.key}`)
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d) => d)
        .join("rect")
        .attr("class", (d) => {
          return `chartRect ${d.data.YM}`;
        })
        // @ts-ignore
        .attr("x", (d) => x(d.data.YM))
        .on("mouseover", (e, d) => {
          tooltip.style("opacity", 1);
          const rank = e.target.parentNode.classList[1];
          const ym = e.target.classList[1];
          const bci = d[1] - d[0];
          const brand = brandData.get(`${ym}${rank}`);
          // eslint-disable-next-line no-template-curly-in-string
          tooltip.html(`<p>${brand}</p><p>${Math.round(bci)}%</p>`);
        })
        .on("mousemove", (e) => {
          tooltip
            .style("top", `${d3.pointer(e)[1] + 10}px`)
            .style("left", `${d3.pointer(e)[0]}px`);
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
        })
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]));

      svg.selectAll(".chartText").remove();
      //@ts-ignore
      svg
        .selectAll("chartText")
        .data(stackedData)
        .join("g")
        .attr("class", (d) => `chartText ${d.key}`)
        .selectAll("text")
        .data((d) => d)
        .join("text")
        .attr("class", "chartText")
        //@ts-ignore
        .attr("x", (d) => x(d.data.YM) + 10)
        // 높이의 절반만큼 내림
        .attr("y", (d) => y(d[1]) + (y(d[0]) - y(d[1])) / 2 + 5)
        .text(function (d) {
          const year = d.data.YM;
          const bci = d[1] - d[0];
          //@ts-ignore
          const rank = d3.select(this).node()!.parentNode.classList[1];
          const brand = brandData.get(`${year}${rank}`);
          return `${brand.split("-")[1]}:${Math.round(bci)}%`;
        })
        .attr("font-size", "11px");
    }
    return null;
  }, [status, data, width]);

  const column = [
    {
      Header: "기준",
      accessor: "demo",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Data",
      accessor: "data",
    },
  ];

  const getTableData = useCallback(() => {
    if (data && data.initialData.recordset.length > 1) {
      const tableData = [];
      for (let i = 0; i < data.initialData.recordset.length; i++) {
        let name = "";
        if (data && data.initialData.recordset[i].COM) {
          name = `${data.initialData.recordset[i].COM} - `;
        }
        if (data.initialData.recordset[i].BRAND) {
          name += data.initialData.recordset[i].BRAND;
        }
        tableData.push({
          demo: data.initialData.recordset[i].DEMO,
          brand: name,
          date: data.initialData.recordset[i].YM,
          data: data.initialData.recordset[i].BCI,
        });
      }
      return tableData;
    }
    return null;
  }, [data]);

  return (
    <div className="relative">
      <Age age={age} setAge={setAge} isArray={false} />
      <Gender gender={gender} setGender={setGender} isArray={false} />
      {/*@ts-ignore*/}
      <div className="relative w-full" id="wrapper" ref={wrapperRef}>
        {status === "loading" && (
          <div className="absolute top-4 left-1/2">로딩중</div>
        )}
        {status === "loading" && removeChart()}
        {status === "success" && data && drawChart()}
        {status === "success" && data && data.result.recordset.length > 1 && (
          <div className="md:px-6">
            {/*  @ts-ignore*/}
            <Table columns={column} data={getTableData()} />
          </div>
        )}
        {status === "error" && (
          <div className="absolute top-4 left-1/2">에러</div>
        )}
      </div>
    </div>
  );
};

export default DB5;
