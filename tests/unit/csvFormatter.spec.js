import { expect } from "chai";
import formatAsCSV from "@/util/csvFormatter";

describe("csvFormatter", () => {
  it("outputs data correctly with default delimeters", () => {
    const data = {
      a: "a",
      b: "b",
      c: "c"
    };

    const formattedData = formatAsCSV(data);

    expect(formattedData).to.eq("a b c \n");
  });

  it("outputs data correctly with custom delimeters", () => {
    const data = {
      a: "a",
      b: "b",
      c: ["c", "d"]
    };

    const formattedData = formatAsCSV(data, "-", "?");

    expect(formattedData).to.eq("a-b-c,d-?");
  });
});
