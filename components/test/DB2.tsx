import React from "react";
import Table from "../filter/Table";
import makeData from "../../lib/makeData";

const DB2 = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    [],
  );
  const data = React.useMemo(() => makeData(200), []);

  return (
    <div className="px-4 space-y-4 py-4">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default DB2;
