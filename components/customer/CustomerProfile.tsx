import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import useResizeObserver from "../../hooks/useResizeObserver";

interface dataType {
  name: string;
  data: number;
}
interface Props {
  data: Array<dataType>;
}

const CustomerProfile: React.FC<Props> = ({ data }) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState(0);
  const [height, setHeigth] = useState(0);

  useEffect(() => {
    if (dimensions) {
      //@ts-ignore
      setWidth(dimensions.width);
      //@ts-ignore
      setHeigth(dimensions.height);
    }
  }, [dimensions]);

  useEffect(() => {
    const names = data.map((d) => d.name);

    const svg = d3.select("#customer-profile");
    const radius = Math.min(width, height) / 2;
    const arc = d3
      .arc()
      .innerRadius(radius * 0.36)
      .outerRadius(radius * 0.8);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.data);

    const arcs = pie(data);

    const color = d3
      .scaleOrdinal()
      .domain(names)
      .range(d3.schemeRdBu[names.length]);

    //@ts-ignore
    svg
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .on("mouseover", function (e, d) {
        d3.select(this)
          .transition()
          .attr(
            "transform",
            `translate(${width / 2},${height / 2}) scale(1.2)`,
          );
      })
      .on("mouseleave", function (e, d) {
        d3.select(this)
          .transition()
          .attr("transform", `translate(${width / 2},${height / 2}) scale(1)`);
      });

    const legend = d3.select("#customer-profile-legend");
    const createLegend = legendColor()
      .shapeWidth(10)
      .orient("vertical")
      .labels(names)
      .cells(names.length)
      .scale(color);

    legend.call(createLegend);
  }, [data, height, width]);
  return (
    <div className="flex w-full h-full">
      <div className="w-3/4" ref={wrapperRef}>
        <svg width="100%" height="100%" id="customer-profile">
          <g id="customer-profile-x" />
          <g id="customer-profile-y" />
        </svg>
      </div>
      <div className="w-1/4">
        <svg width="100%" height="100%">
          <g id="customer-profile-legend" />
        </svg>
      </div>
    </div>
  );
};

export default CustomerProfile;
