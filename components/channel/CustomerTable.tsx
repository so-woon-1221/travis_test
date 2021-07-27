import React, { ChangeEvent, useMemo, useState } from "react";
import Table from "../filter/Table";
import Table2 from "../filter/Table2";

interface brand {
  id: number;
  name: string;
  can: boolean;
}

interface Props {
  data: Map<
    string,
    Array<{
      model: string;
      customerAmount: number;
      amount: number;
      buyAmount: number;
      brand: string;
    }>
  >;
  brandList: brand[];
}

const CustomerTable: React.FC<Props> = ({ data, brandList }) => {
  const [brand, setBrand] = useState<string>(brandList[0].name);

  const onChangeBrand = (e: ChangeEvent) => {
    const target = e.target as HTMLOptionElement;
    setBrand(target.value);
  };

  const tableData = useMemo(() => {
    return data.get(brand);
  }, [brand, data]);

  const column = [
    {
      Header: "상품명",
      accessor: "model",
    },
    {
      Header: "브랜드",
      accessor: "brand",
    },
    {
      Header: "구매건수",
      accessor: "buyAmount",
    },
    {
      Header: "구매자수",
      accessor: "customerAmount",
    },
    {
      Header: "구매금액",
      accessor: "amount",
    },
  ];

  return (
    <div className="relative w-full h-full">
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
      <div className="w-full h-full-top absolute top-12 px-4 pb-4 overflow-y-auto">
        {/*@ts-ignore*/}
        <Table2 size={10} data={tableData} columns={column} />
      </div>
    </div>
  );
};

export default CustomerTable;
