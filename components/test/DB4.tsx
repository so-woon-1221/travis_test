import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import { legendColor } from "d3-svg-legend";
import domtoimage from "dom-to-image";
import { useDB1 } from "../../hooks/useDB1";
import Gender from "../filter/Gender";
import Area from "../filter/Area";
import Age from "../filter/Age";
import useResizeObserver from "../../hooks/useResizeObserver";
import getFilteredData from "../../hooks/getFilteredData";
import Table from "../filter/Table";

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
      ////

      // svg 그리기 ////////////////////////////////////////////////////////////////////////////////////
      let svg: d3.Selection<any, any, any, any>;
      if (document.getElementById("chart")) {
        svg = d3.select("#chart");
      } else {
        svg = d3.select(wrapper).append("svg");
        svg.attr("id", "chart");
        svg
          .attr("width", "100%")
          .attr("height", `${height + 10}`)
          .attr("transform", "translate(0,20)");
        svg.append("g").attr("id", "xAxis");
        svg.append("g").attr("id", "yAxis");
        svg
          .append("g")
          .attr("id", "legend")
          .attr("transform", `translate(30,${height - 80})`);
      }

      svg.selectAll(".line").remove();

      const createTooltip = () => {
        d3.select(wrapper)
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip");

        return d3.select(".tooltip");
      };

      if (!document.querySelector(".tooltip")) {
        createTooltip();
      }
      const tooltip = d3.select(".tooltip");

      const legendLinear = legendColor()
        .shapeWidth(names[0].length * 8)
        .orient("horizontal")
        .labels(names)
        .cells(names.length)
        .title("범례")
        .scale(d3.scaleOrdinal(names, d3.schemeTableau10));

      // @ts-ignore
      svg.select("#legend").call(legendLinear);
      d3.selectAll(".cell")
        .style("cursor", "pointer")
        .on("click", function (e, d) {
          // eslint-disable-next-line no-underscore-dangle
          const data = e.target.__data__.replace(/ /g, "");
          const clickNode = d3.selectAll(`.a${data}`);
          clickNode.classed("clickNode", !clickNode.classed("clickNode"));
          d3.select(this).classed(
            "clickCell",
            !d3.select(this).classed("clickCell"),
          );
        });

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
        .domain([max + max / 20, min - min / 20])
        .range([0, height - 120]);

      const xAxis = svg
        .select("#xAxis")
        .attr("transform", `translate(0, ${height - 120})`)
        .transition();
      // @ts-ignore
      xAxis.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y' %m")));
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

      svg
        .selectAll(".line")
        .data(newData)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d, i) => d3.schemeTableau10[i])
        .attr("stroke-width", 2)
        .attr("class", (d) => `line a${d.name.replace(/ /g, "")}`)
        .transition()
        // @ts-ignore
        .attr("d", (d) => line(d.data));

      svg
        .selectAll(".dot")
        .data(newData)
        .join("g")
        .attr("class", (d) => `dot a${d.name.replace(/ /g, "")}`)
        .attr("fill", (d, i) => {
          return d3.schemeTableau10[i];
        })
        .selectAll(".points")
        .data((d) => d.data)
        .join("circle")
        .attr("class", "points")
        .on("mouseover", function (e, d) {
          d3.select(this).transition().attr("r", "10");
          tooltip.style("opacity", 1);
        })
        .on("mousemove", (e, d) => {
          const color = d3.select(e.target.parentNode).attr("fill");
          tooltip
            .html(d.y)
            .style("top", `${d3.pointer(e)[1] + 30}px`)
            .style("left", `${d3.pointer(e)[0] + 20}px`)
            .style("background", color);
        })
        .on("mouseleave", function (e, d) {
          d3.select(this).transition().attr("r", 5);
          tooltip.html("").style("opacity", 0);
        })
        .transition()
        .attr("cx", (d) => x(getDate(d.x)))
        .attr("cy", (d) => y(+d.y))
        .attr("r", 5);

      // 줌 //////////////////////////////////////////////////////////////////////////////////////
      // const updateChart = (e: d3.D3ZoomEvent<any, any>) => {
      //   const newX = e.transform.rescaleX(x);
      //   // @ts-ignore
      //   xAxis.call(d3.axisBottom(newX));
      // };
      // const zoom = d3
      //   .zoom()
      //   .scaleExtent([1, 10])
      //   .extent([
      //     [0, 0],
      //     [width, height],
      //   ])
      //   .on("zoom", updateChart);
      //
      // svg.call(zoom);
      //////
    }
  }, [status, data, width, height]);

  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "NAME",
      },
      {
        Header: "Date",
        accessor: "YM",
      },
      {
        Header: "Data",
        accessor: "DATA",
      },
    ];
  }, []);

  // eslint-disable-next-line consistent-return
  const getTableData = useCallback(() => {
    if (data && data.length > 1) {
      const tableData = [];
      for (let i = 0; i < data.length; i++) {
        let name = "";
        if (data[i].SIDO) {
          name = data[i].SIDO!;
        }
        if (data[i].AGE) {
          name += data[i].AGE;
        }
        if (data[i].GENDER) {
          name += data[i].GENDER;
        }
        if (name === "") {
          name = "구매금액";
        }
        tableData.push({ NAME: name, YM: data[i].YM, DATA: data[i].DATA });
      }
      console.log(tableData);
      return tableData;
    }
  }, [data]);

  const tableData = useMemo(() => {
    return getTableData();
  }, [getTableData]);

  const downloadChart = async () => {
    const chart = document.querySelector("#chart");
    if (chart) {
      const html: d3.BaseType | null = d3
        .select("#chart")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node();

      domtoimage.toPng(html as HTMLElement).then((data) => {
        const link = document.createElement("a");
        link.href = data;
        link.download = "chart.png";
        link.click();
      });
    }
  };

  return (
    <>
      <Gender gender={gender} setGender={setGender} isArray />
      <Area area={area} setArea={setArea} isArray />
      <Age age={age} setAge={setAge} isArray />
      <div
        // @ts-ignore
        ref={wrapperRef}
        id="wrapper"
        className="w-full h-96 relative md:px-10"
      >
        {status === "success" && data && data?.length > 1 && (
          <button
            type="button"
            className="absolute top-4 right-16 border-2 p-2 border-blue-400"
            onClick={() => downloadChart()}
          >
            다운로드
          </button>
        )}
        {status === "success" && data && data?.length > 1 && drawChart() && (
          <svg id="chart" />
        )}
        {status === "success" && data && data?.length > 1 && (
          //@ts-ignore
          <Table columns={columns} data={tableData} canTool size={5} />
        )}
        {status === "loading" && (
          <>
            <div className="absolute top-0 left-1/2" id="loading">
              로딩 중
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DB4;
