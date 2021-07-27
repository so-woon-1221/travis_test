import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import useResizeObserver from "../../hooks/useResizeObserver";

interface Props {
  data: Array<{
    brand: string;
    20: number;
    30: number;
    40: number;
    50: number;
    60: number;
  }>;
}

const AgeChart: React.FC<Props> = ({ data }) => {
  const wrapperRef = useRef();
  const legendRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const legendDimensions = useResizeObserver(legendRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [legendWidth, setLegendWidth] = useState(0);

  useEffect(() => {
    if (dimensions) {
      //@ts-ignore
      setWidth(dimensions.width);
      //@ts-ignore
      setHeight(dimensions.height);
    }
    if (legendDimensions) {
      // @ts-ignore
      setLegendWidth(legendDimensions.width);
    }
  }, [dimensions, legendDimensions]);

  const stackedData = useMemo(() => {
    // @ts-ignore
    return d3.stack().keys(["20", "30", "40", "50", "60"])(data);
  }, [data]);

  useEffect(() => {
    const svg = d3.select("#channel-age-chart");
    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([41, width - 30]);
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.brand))
      .range([50, height - 30])
      .padding(0.1);

    d3.select("#channel-age-chart-x")
      .attr("transform", `translate(0, ${height - 30})`)
      // @ts-ignore
      .call(d3.axisBottom(x));

    d3.select("#channel-age-chart-y")
      .attr("transform", "translate(40, 0)")
      // @ts-ignore
      .call(d3.axisLeft(y));

    const color = d3
      .scaleOrdinal()
      .domain(["20", "30", "40", "50", "60"])
      .range(d3.schemeBuPu[5]);

    const legendLinear = legendColor()
      .shapeWidth(30)
      .orient("horizontal")
      .labels(["20대", "30대", "40대", "50대", "60대이상"])
      .cells(5)
      .scale(color);
    svg
      .select("#channel-age-chart-legend")
      .attr("transform", `translate(${width - legendWidth - 30}, 16)`)
      // @ts-ignore
      .call(legendLinear);

    svg.selectAll(".ageRect").remove();
    //@ts-ignore
    svg
      .selectAll(".ageRect")
      .data(stackedData)
      .join("g")
      // @ts-ignore
      .attr("fill", (d) => {
        return color(d.key);
      })
      .attr("class", "ageRect")
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("class", "ageRect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(String(d.data.brand)))
      .attr("height", (d) => y.bandwidth())
      .transition()
      .attr("width", (d) => x(d[1]) - x(d[0]));
  }, [width, height, stackedData, data, legendWidth]);

  return (
    //@ts-ignore
    <div className="w-full h-full relative" ref={wrapperRef}>
      <svg id="channel-age-chart">
        <g id="channel-age-chart-x" />
        <g id="channel-age-chart-y" />
        {/*@ts-ignore*/}
        <g id="channel-age-chart-legend" ref={legendRef} />
      </svg>
    </div>
  );
};

export default AgeChart;
