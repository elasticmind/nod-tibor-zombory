export default function formatAsCSV(
  data,
  cellDelimiter = " ",
  lineDelimeter = "\n"
) {
  return Object.values(data).reduceRight(
    (csvEntry, value) => `${value}${cellDelimiter}${csvEntry}`,
    lineDelimeter
  );
}
