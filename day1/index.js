const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const getNumber = (line) => {
  const filtered = line.replace(/\D/g, '');
  if (filtered.length === 0) return 0;
  if (filtered.length === 1) return parseInt(`${filtered[0]}${filtered[0]}`);
  return parseInt(`${filtered[0]}${(filtered[filtered.length - 1])}`);
};

(async () => {
  let sum = 0;
  for await (const line of lines) {
    sum += getNumber(line);
  }
  console.log(sum);
})();