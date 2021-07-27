import { usePagination, useTable } from "react-table";
import React, { useEffect } from "react";

interface tableType {
  columns: Array<any>;
  data: Array<any>;
  size: number;
}

function Table2({ columns, data, size }: tableType) {
  const instance = useTable(
    // @ts-ignore
    { columns, data, initialState: { pageIndex: 2 } },
    usePagination,
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //@ts-ignore
    setPageSize,
  } = instance;

  useEffect(() => {
    setPageSize(size);
  }, [setPageSize, size]);

  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        id="my-table"
        className="table-auto w-full h-full"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-2 border-black"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border border-gray-400"
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
    </>
  );
}

export default Table2;
