import React from "react";
import { useDB3 } from "../../hooks/useDB3";

const DB3: React.FC = () => {
  const { status, data, error } = useDB3();

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "success" &&
        data &&
        data?.length > 1 &&
        data.map((d: { category: string }, i: number) => {
          return <div key={i}>{d.category}</div>;
        })}
      {status === "success" && data && data?.length < 1 && (
        <div>데이터없음</div>
      )}
      {error && <div>데이터를 불러올 수 없습니다. 오류가 발생했습니다.</div>}
    </div>
  );
};

export default DB3;
