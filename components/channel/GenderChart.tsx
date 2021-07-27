import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";

interface Props {
  data: Array<{ brand: string; male: number; female: number }>;
}

const GenderChart: React.FC<Props> = ({ data }) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions) {
      // @ts-ignore
      setWidth(dimensions.width);
      // @ts-ignore
      setHeight(dimensions.height);
    }
  }, [dimensions, height, width]);

  const stackedData = useMemo(() => {
    //@ts-ignore
    return d3.stack().keys(["male", "female"])(data);
  }, [data]);

  useEffect(() => {
    if (height > 0) {
      const svg = d3.select("#channel-gender-chart");
      svg.attr("width", "100%").attr("height", "100%");

      const y = d3
        .scaleBand()
        .domain(data.map((d) => d.brand))
        .range([60, height - 30])
        .padding(0.1);

      const x = d3
        .scaleLinear()
        .domain([0, 100])
        .range([40, width - 20]);
      const xAxis = d3
        .select("#channel-gender-chart-x")
        .attr("transform", `translate(0,${height - 30})`)
        .call(
          //@ts-ignore
          d3
            .axisBottom(x)
            .tickFormat((d) => `${d}%`)
            .ticks(5),
        );
      const yAxis = d3
        .select("#channel-gender-chart-y")
        .attr("transform", "translate(40,0)")
        //@ts-ignore
        .call(d3.axisLeft(y));

      let tooltip:
        | d3.Selection<d3.BaseType, unknown, HTMLElement, any>
        | d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
      if (document.getElementById("genderTool")) {
        tooltip = d3.select("#genderTool");
      } else {
        // @ts-ignore
        tooltip = d3.select(wrapperRef.current).append("div");
        tooltip.attr("id", "genderTool");
      }
      tooltip.attr("class", "tooltip");
      tooltip.html("");
      tooltip.style("opacity", 0);

      svg.selectAll(".chartRect").remove();
      //@ts-ignore
      svg
        .selectAll("chartRect")
        .data(stackedData)
        .join("g")
        .attr("fill", (d) => {
          if (d.key === "male") {
            return "#0676DB";
          }
          return "#F24246";
        })
        .attr("class", "chartRect")
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("class", "chartRect")
        .on("click", (e, d) => {
          tooltip.style("opacity", 1);
          tooltip.html(`${Math.round(d[1] - d[0])}%`);
          tooltip.style("left", `${x(d[0]) + (x(d[1]) - x(d[0])) / 2 - 15}px`);
          tooltip.style("top", `${y(String(d.data.brand))! + 12}px`);
        })
        // @ts-ignore
        .attr("y", (d) => y(d.data.brand))
        .attr("x", (d) => x(d[0]))
        .attr("height", (d) => y.bandwidth())
        .transition()
        .attr("width", (d) => x(d[1]) - x(d[0]));
    }
  }, [data, height, stackedData, width]);
  return (
    //@ts-ignore
    <div className="w-full h-full" ref={wrapperRef}>
      <svg id="channel-gender-chart">
        <g id="channel-gender-chart-x" />
        <g id="channel-gender-chart-y" />
      </svg>
    </div>
  );
};

export default GenderChart;
