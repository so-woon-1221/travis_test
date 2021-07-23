type resultRecordsetType = {
  BCI: string;
  COM: string;
  BRAND: string;
  DEMO: string;
  YM: string;
  Rank: string;
};

type resultType = {
  recordset: Array<resultRecordsetType>;
};

export type DB5 = {
  result: resultType;
  initialData: resultType;
};
