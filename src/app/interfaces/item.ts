export interface Item {

  ITEM_CODE: number,
  TIME_USE: Date,
  IS_TRANS: boolean,
  ITEM_BARCODE: number,
  ITEM_NAME: string,
  TYPE_CODE: number,
  UNIT_CODE: number,
  UNIT_QTY: number,
  UNIT_NAME: string,
  BALANCE: number,
  DF_SALE: boolean,
  DF_STORE: boolean,
  DF_BUY: boolean,
  FULL_NAME: string,
  PRICE_BUY: number,
  PRICE_COST: number,
  PRICE_SALE_1: number,
  PRICE_SALE_2: number,
  PRICE_SALE_3: number,
  PRICE_AVG_COST: number,
  PRICE_SALE_CUR: number,
  CATEGORY_CODE: number,
  CATEGORY_NAME: string,
  STORE_CODE: number,
  STORE_NAME: string,
  IS_USED: boolean,
  ITEM_NAME_EN: string,
  ITEM_NOTE: string,
  ITEM_NOTE_EN: string,
  IMG_URL: string,
  CATEGORY_NAME_EN: string,
  CATEGORY_IMAGE_PATH: string,
  ID_APPLICATION: number,
  favorite?: boolean,
  addedToCart?: boolean
}
