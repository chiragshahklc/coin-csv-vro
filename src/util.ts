import path from "path";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { utils, writeFileXLSX } from "xlsx";
// local imports
import { Chunk, VROObject } from "./types";

// utils.json_to_sheet();
const wb = utils.book_new();

const vroObjectTransform = (chunk: Chunk): VROObject => {
  const { symbol, trade_type, trade_date, quantity, price } = chunk;

  return {
    "Scheme name": symbol,
    "Transaction Type": trade_type,
    Date: trade_date,
    "Cost per unit": price,
    Units: quantity,
  };
};

const parser = parse({
  delimiter: ",",
  columns: true,
  onRecord: (record): VROObject => {
    return vroObjectTransform(record);
  },
});

const data: VROObject[] = [];

const convert = (source: string, destination: string) => {
  createReadStream(source)
    .pipe(parser)
    .on("data", (chunk: VROObject) => {
      data.push(chunk);
    })
    .on("finish", () => {
      utils.book_append_sheet(wb, utils.json_to_sheet(data));
      writeFileXLSX(wb, destination);
    });
};

export { convert };
