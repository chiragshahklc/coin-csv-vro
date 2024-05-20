#! /usr/bin/env node
import { Command } from "commander";
// local imports
import { convert } from "./util";

const program = new Command();

program
  .name("coin-to-vro")
  .description("Convert Zerodha MF tradebook csv to Value Reserch Online XLSX")
  .version("0.0.1");

program
  .command("convert")
  .argument("<source>", "Source file path")
  .argument("<destination>", "Destination file path")
  .action((...str) => {
    const [source, destination] = str;
    convert(source, destination);
  });

program.parse();
