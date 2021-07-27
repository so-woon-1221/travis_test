import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";

interface brand {
  id: number;
  name: string;
  can: boolean;
}

interface Props {
  data: Map<string, Array<{ YM: string; data: number }>>;
  brandList: brand[];
  yearTotal: Map<string, number>;
}

const ChannelBar: React.FC<Props> = ({ data, brandList, yearTotal }) => {
  const [brand, setBrand] = useState<string>(brandList[0].name);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [brandData, setBrandData] = useState<
    Array<{ YM: string; data: number }>
  >([]);

  useEffect(() => {
    if (dimensions) {
      //@ts-ignore
      setWidth(dimensions.width);
      //@ts-ignore
      setHeight(dimensions.height);
    }
  }, [dimensions]);

  const getDate = (YM: number) => {
    const year = YM / 100;
    const month = (YM % 100) - 1;
    return new Date(year, month);
  };

  useEffect(() => {
    const tempData = data.get(brand);
    if (tempData) {
      setBrandData(tempData);
    }
  }, [brand, data, yearTotal]);

  const onChangeBrand = (e: ChangeEvent) => {
    const target = e.target as HTMLOptionElement;
    setBrand(target.value);
  };

  useEffect(() => {
    if (width > 1 && brand && data.get(brand)!.length > 1) {
      const svg = d3.select("#barChart");
      svg.attr("width", width).attr("height", height);

      let min = Number(d3.min(brandData, (d) => d.YM));
      if (min % 10 === 1) {
        min -= 89;
      } else {
        min -= 1;
      }
      let max = Number(d3.max(brandData, (d) => d.YM));
      if (max % 10 === 1) {
        max += 89;
      } else {
        max += 1;
      }

      const color = d3
        .scaleOrdinal()
        .domain(brandList.map((d) => d.name))
        .range(d3.schemeDark2);

      let tooltip:
        | d3.Selection<d3.BaseType, unknown, HTMLElement, any>
        | d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
      if (document.getElementById("barTool")) {
        tooltip = d3.select("#barTool");
      } else {
        // @ts-ignore
        tooltip = d3.select(wrapperRef.current).append("div");
        tooltip.attr("id", "barTool");
      }
      tooltip.attr("class", "tooltip");
      tooltip.style("opacity", 0);

      const x = d3
        .scaleTime()
        .domain([getDate(min), getDate(max)])
        .range([30, width - 20]);
      const xAxis = d3
        .select("#barX")
        .attr("transform", `translate(0,${height - 20})`)
        //@ts-ignore
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y'%m")).ticks(5));

      const y = d3
        .scaleLinear()
        .domain([
          0,
          Number(d3.max(brandData, (d) => d.data / yearTotal.get(d.YM)!)) * 100,
        ])
        .range([height - 20, 60]);
      const yAxis = d3
        .select("#barY")
        .attr("transform", "translate(30,0)")
        //@ts-ignore
        .call(d3.axisLeft(y));

      svg
        .selectAll("rect")
        .data(brandData)
        .join("rect")
        .attr("x", (d) => x(getDate(Number(d.YM))) - 5)
        .attr("y", (d) => y((d.data / yearTotal.get(d.YM)!) * 100))
        .attr("width", 10)
        //@ts-ignore
        .attr("fill", color(brand))
        .on("mouseover", (e, d) => {
          const percent = (d.data / yearTotal.get(d.YM)!) * 100;
          tooltip.html(`${d.YM} ${Math.floor(percent)}%`);
          tooltip.style("opacity", 1);
        })
        .on("mousemove", (e) => {
          tooltip.style("left", `${d3.pointer(e)[0] + 10}px`);
          tooltip.style("top", `${d3.pointer(e)[1] + 5}px`);
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
          tooltip.html("");
        })
        .transition()
        .attr("height", (d) => {
          return y(0) - y((d.data / yearTotal.get(d.YM)!) * 100);
        });
    }
  }, [brand, brandData, brandList, data, height, width, yearTotal]);

  return (
    //@ts-ignore
    <div className="relative w-full h-full" ref={wrapperRef}>
      <select
        className="absolute top-4 right-4 bg-transparent"
        onChange={onChangeBrand}
        value={brand}
      >
        {brandList.map((d) => (
          <option key={d.id} value={d.name} disabled={d.can}>
            {d.name}
          </option>
        ))}
      </select>
      <svg id="barChart">
        <g id="barX" />
        <g id="barY" />
        <g id="barLegend" />
      </svg>
    </div>
  );
};

export default ChannelBar;
