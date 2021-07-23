import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import { Pie } from "../../types/summer";
import useResizeObserver from "../../hooks/useResizeObserver";

interface Props {
  data: Pie[];
}

const ChannelPie: React.FC<Props> = ({ data }) => {
  const wrapperRef = useRef();
  const dimensions: any = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions) {
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    }
  }, [dimensions]);

  useEffect(() => {
    if (width !== 0) {
      const svg = d3.select("#chart");
      svg.attr("width", "100%").attr("height", "100%");

      const legend = d3.select("#legend");

      const createLegend = legendColor()
        .shapeWidth(20)
        .orient("vertical")
        .labels(data.map((d) => d.SMTD_SHOP_NAME))
        .cells(data.map((d) => d.SMTD_SHOP_NAME).length)
        .title("범례")
        .scale(
          d3.scaleOrdinal(
            data.map((d) => d.SMTD_SHOP_NAME),
            d3.schemeDark2,
          ),
        );

      legend
        .attr("transform", `translate(${width - 100}, 20)`)
        //@ts-ignore
        .call(createLegend);

      const radius = Math.min(width, height) / 2;
      const arc = d3
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

      const pie = d3
        .pie()
        .sort(null)
        // @ts-ignore
        .value((d) => d.data);

      // @ts-ignore
      const arcs = pie(data);

      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.SMTD_SHOP_NAME))
        .range(d3.schemeDark2);
      // .range(
      //   d3.quantize((t) => d3.schemeDark2(), data.length).reverse(),
      // );

      let text:
        | d3.Selection<d3.BaseType, unknown, HTMLElement, any>
        | d3.Selection<SVGTextElement, unknown, HTMLElement, any>;
      let text2:
        | d3.Selection<d3.BaseType, unknown, HTMLElement, any>
        | d3.Selection<SVGTextElement, unknown, HTMLElement, any>;
      if (document.getElementById("chartText")) {
        text = d3.select("#chartText");
      } else {
        text = svg.append("text").attr("id", "chartText");
        text.style("opacity", 0);
      }
      if (document.getElementById("chartText2")) {
        text2 = d3.select("#chartText2");
      } else {
        text2 = svg.append("text").attr("id", "chartText2");
        text2.style("opacity", 0);
      }

      //@ts-ignore
      svg
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("transform", `translate(${width / 2.5},${height / 1.8})`)
        // @ts-ignore
        .attr("fill", (d) => color(d.data.SMTD_SHOP_NAME))
        // @ts-ignore
        .attr("d", arc)
        .on("mouseover", (e, d) => {
          text
            .style("opacity", 1)
            // @ts-ignore
            .attr("x", `${width / 2.5 - 20}`)
            .attr("y", `${height / 1.8 - 10}`);
          // @ts-ignore
          text.text(d.data.SMTD_SHOP_NAME);
          text2
            .style("opacity", 1)
            // @ts-ignore
            .attr("x", `${width / 2.5 - 20}`)
            .attr("y", `${height / 1.8 + 10}`);
          // @ts-ignore
          text2.text(`${d.data.percent}%`);
        })
        .on("mouseleave", (e, d) => {
          text.style("opacity", 0);
          text2.style("opacity", 0);
        });
    }
  }, [data, dimensions, height, width]);

  return (
    //@ts-ignore
    <div className="w-full h-full" ref={wrapperRef}>
      <svg id="chart">
        <g id="legend" />
      </svg>
    </div>
  );
};

export default ChannelPie;
