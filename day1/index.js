const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const toNum = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
};

/**
*
* @param { String } line
*/
const getNumber = (line) => {
  console.log(line);
  if (line.length === 1) {
    return toNum[line] ?? 0;
  }

  const regexFirst = /.*?(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)/;
  const firstMatch = [...line.match(regexFirst)];

  const reversed = [...line].reverse().join('');
  const regexLast = /.*?(1|2|3|4|5|6|7|8|9|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/;
  const lastMatch = [...reversed.match(regexLast)];

  const firstNum = firstMatch ? toNum[firstMatch[1]] : 0;
  const lastNum = lastMatch ? toNum[[...lastMatch[1]].reverse().join('')] : 0;
  const result = parseInt(firstNum + '' + lastNum);
  //console.log(result);
  return result
};

(async () => {
  let sum = 0;
  for await (const line of lines) {
    sum += getNumber(line);
  }
  console.log(sum);
})();