const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

/**
 * 
 * @param {string} line
 * @returns {number}
 */
const processLine = (line) => {
  const numbers = line.split(':')[1].trim().split(' | ');
  const winningNumbers = numbers[0].split(' ').filter(str => str !== '').map(n => parseInt(n.trim()));
  const cardNumbers = numbers[1].split(' ').filter(str => str !== '').map(n => parseInt(n.trim()));

  console.log(winningNumbers);
  console.log(cardNumbers);

  return cardNumbers.reduce((acc, cur) => {
    if (winningNumbers.includes(cur)) {
      acc = (acc === 0) ? 1 : acc *= 2;
      console.log(`Found ${cur} in ${winningNumbers}. Current points: ${acc}`);
    }
    return acc;
  }, 0);
};

(async () => {
  let points = 0;
  for await (const line of lines) {
    points += processLine(line);
  }
  console.log(points);
})();