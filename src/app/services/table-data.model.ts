export type Orders = {
  data: OrderData[];
}

export type OrderData = {
  closePrice: number;
  id : number;
  openPrice : number;
  openTime: number;
  side : string;
  size: number;
  swap: number;
  symbol: string;
  profit: number;
}

export type GroupedData = {
  [key: string]: {
    open: boolean;
    totalSize: number;
    averageOpenPrice: number;
    totalSwap: number;
    averageProfit: number;
    data: OrderData[];
  }
}
