export type Summer = {
  ENR_CATE_CODE: number;
  LCATE_NAME: string;
  MCATE_NAME: string;
  SCATE_NAME: string;
  YEAR_NM: string;
  QUARTER_NM: string;
  MM: number;
  YM: number;
  BUY_DATE: number;
  // eslint-disable-next-line camelcase
  day_nm: string;
  // eslint-disable-next-line camelcase
  week_nm: string;
  MODEL_NAME: string;
  ENR_MODEL_NO: number;
  // eslint-disable-next-line camelcase
  MODEL_NAME_adj: string;
  BRAND_NAME: string;
  MAKER_NAME: string;
  GENDER_CODE: string;
  BIRTH_YEAR: string;
  SMTD_SHOP_NAME: string;
  QNTY_SUM: number;
  AMT_SUM: number;
  sido: string;
  sigu: string;
};

export type Pie = {
  SMTD_SHOP_NAME: string;
  data: number;
  percent: number;
};
