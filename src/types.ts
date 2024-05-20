type TradeType = "buy" | "sell";

type Chunk = {
  symbol: string;
  isin: string;
  trade_date: string;
  exchange: string;
  segment: "MF";
  series: "";
  trade_type: TradeType;
  auction: string;
  quantity: string;
  price: string;
  trade_id: string;
  order_id: string;
  order_execution_time: string;
};

type VROObject = {
  "Scheme name": string;
  "Transaction Type": TradeType;
  Date: string;
  "Cost per unit": string;
  Units: string;
};

export type { Chunk, TradeType, VROObject };
