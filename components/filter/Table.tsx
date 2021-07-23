import { HeaderGroup, usePagination, useSortBy, useTable } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect } from "react";

interface tableType {
  columns: columnType[];
  data: dataType[];
}

interface dataType {
  firstName: string;
  lastName: string;
  age: string;
  visits: string;
  status: string;
  progress: string;
}

interface columnType {
  Header: string;
  columns: column[];
}

interface column {
  Header: string;
  accessor: string;
}

function Table({ columns, data }: tableType) {
  const instance = useTable(
    // @ts-ignore
    { columns, data, initialState: { pageIndex: 2 } },
    useSortBy,
    usePagination,
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = instance;

  const printPDF = async () => {
    const table = document.getElementById("my-table");
    if (table) {
      const { font } = await import("../../public/nanum");
      // eslint-disable-next-line new-cap
      const doc = new jsPDF();
      doc.addFileToVFS("nanum.ttf", font);
      doc.addFont("nanum.ttf", "nanum", "normal");
      doc.setFont("nanum", "normal");
      autoTable(doc, {
        html: "#my-table",
        styles: {
          font: "nanum",
        },
      });
      doc.save("data.pdf");
    }
  };

  useEffect(() => {
    setPageSize(5);
    gotoPage(0);
  }, []);

  useEffect(() => {
    gotoPage(1);
  }, [pageSize]);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} id="my-table">
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<any>, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={`header${i}`}>
              {headerGroup.headers.map((column: HeaderGroup<any>) => (
                <th
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border h-10 relative bg-gray-200"
                  style={{ width: `${columns.length / 100}%` }}
                  key={`header-2${i}`}
                >
                  {column.render("Header")}
                  <span className="absolute right-1">
                    {
                      // @ts-ignore
                      column.isSorted
                        ? //@ts-ignore
                          column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: number, i: number) => {
            //@ts-ignore
            prepareRow(row);
            return (
              //@ts-ignore
              <tr {...row.getRowProps()} key={`tr-2${i}`}>
                {/*@ts-ignore*/}
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border h-16 text-center"
                      key={`td${i}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="pagination mt-4">
        <button
          onClick={() => gotoPage(0)}
          type="button"
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          type="button"
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          type="button"
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          type="button"
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={1}
            className="border-2 border-black"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setPageSize(data.length);
            gotoPage(0);
            printPDF().then(() => {
              setPageSize(pageSize);
            });
          }}
          className="ring-2 ring-gray-500 px-5 py-2 my-4"
        >
          다운로드
        </button>
      </div>
    </>
  );
}

export default Table;
