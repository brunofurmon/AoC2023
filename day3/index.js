const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const numbers = {};
const symbols = {};

/**
 * 
 * @param {string} line 
 * @param {number} rowIndex
 */
const processLine1 = (line, rowIndex) => {
  let colIndex = 0;
  let currentNumber = '';
  numbers[rowIndex] = [];
  symbols[rowIndex] = [];

  for (const chr of [...line]) {
    if (chr === '.') {
      if (currentNumber !== '') {
        numbers[rowIndex].push([parseInt(currentNumber), [colIndex - currentNumber.length, colIndex - 1], false]);
        currentNumber = '';
      };
    } else {
      if (!isNaN(chr)) {
        currentNumber += chr;
      } else {
        symbols[rowIndex].push([chr, colIndex]);
        if (currentNumber !== '') {
          numbers[rowIndex].push([parseInt(currentNumber), [colIndex - currentNumber.length, colIndex - 1], false]);
          currentNumber = '';
        };
      }
    }
    colIndex++;
  };
  if (currentNumber !== '') {
    numbers[rowIndex].push([parseInt(currentNumber), [colIndex - currentNumber.length, colIndex - 1], false]);
    currentNumber = '';
  }
};

// part1
(async () => {
  let rowIndex = 0;

  for await (const line of lines) {
    // console.log(line);
    processLine1(line, rowIndex);
    rowIndex++;
  }

  // console.log(numbers);
  // console.log(symbols);

  let sum = 0;
  for (let rowIndex = 0; rowIndex < Object.keys(numbers).length; rowIndex++) {
    // for every symbol row and column, find a number that is adjacent (even diagonally) to it
    const symbolRow = symbols[rowIndex];
    for (let symbolIndex = 0; symbolIndex < symbolRow.length; symbolIndex++) {
      const symbol = symbolRow[symbolIndex];
      const symbolChar = symbol[0];
      let multipliedNums = [];
      let gearPower = 1;

      const symbolCol = symbol[1];
      // find numbers that are on the top row, this row or on the row below
      if (rowIndex > 0) {
        const topRowNumbers = numbers[rowIndex - 1];
        for (let index = 0; index < topRowNumbers.length; index++) {
          const topRowNumber = topRowNumbers[index];
          // check if the number is adjacent to the symbol on vertical direction
          if (Math.abs(topRowNumber[1][0] - symbolCol) <= 1 ||
            Math.abs(topRowNumber[1][1] - symbolCol) <= 1) {
            // check if the number is not already used
            if (symbolChar === '*') {
              // remove the number from the sum to add a multiplication value
              if (topRowNumber[2]) sum -= topRowNumber[0];
              gearPower *= topRowNumber[0];
              multipliedNums.push(topRowNumber[0]);
              topRowNumber[2] = true;
            }
            // else if (!topRowNumber[2]) {
            //   sum += topRowNumber[0];
            //   topRowNumber[2] = true;
            //   console.log(`Total: ${sum}. Found ${topRowNumber[0]} at ${topRowNumber[1]} reading symbol ${symbol[0]} at row ${rowIndex + 1} and col ${symbolCol + 1}`);
            // }
          }
        }
      }

      // currentRow numbers
      const currentRowNumbers = numbers[rowIndex];
      for (let index = 0; index < currentRowNumbers.length; index++) {
        const currentRowNumber = currentRowNumbers[index];
        // check if the number is adjacent to the symbol on horizontal direction
        if (Math.abs(currentRowNumber[1][0] - symbolCol) <= 1 ||
          Math.abs(currentRowNumber[1][1] - symbolCol) <= 1) {
          if (symbolChar === '*') {
            // remove the number from the sum to add a multiplication value
            if (currentRowNumber[2]) sum -= currentRowNumber[0];
            gearPower *= currentRowNumber[0];
            multipliedNums.push(currentRowNumber[0]);
            currentRowNumber[2] = true;
          }
          // check if the number is not already used
          // else if (!currentRowNumber[2]) {
          //   sum += currentRowNumber[0];
          //   currentRowNumber[2] = true;
          //   console.log(`Total: ${sum}. Found ${currentRowNumber[0]} at ${currentRowNumber[1]} reading symbol ${symbol[0]} at row ${rowIndex + 1} and col ${symbolCol + 1}`);
          // }
        }
      }

      // check bottom row
      if (rowIndex < Object.keys(numbers).length - 1) {
        const bottomRowNumbers = numbers[rowIndex + 1];
        for (let index = 0; index < bottomRowNumbers.length; index++) {
          const bottomRowNumber = bottomRowNumbers[index];
          // check if the number is adjacent to the symbol on vertical direction
          if (Math.abs(bottomRowNumber[1][0] - symbolCol) <= 1 ||
            Math.abs(bottomRowNumber[1][1] - symbolCol) <= 1) {
            if (symbolChar === '*') {
              // remove the number from the sum to add a multiplication value
              if (bottomRowNumber[2]) sum -= bottomRowNumber[0];
              gearPower *= bottomRowNumber[0];
              multipliedNums.push(bottomRowNumber[0]);
              bottomRowNumber[2] = true;
            }
            // check if the number is not already used
            // if (!bottomRowNumber[2]) {
            //   sum += bottomRowNumber[0];
            //   bottomRowNumber[2] = true;
            //   console.log(`Total: ${sum}. Found ${bottomRowNumber[0]} at ${bottomRowNumber[1]} reading symbol ${symbol[0]} at row ${rowIndex + 1} and col ${symbolCol + 1}`);
            // }
          }
        }
      }
      if (symbolChar === '*' && multipliedNums.length > 1) {
        sum += gearPower;
        console.log(`Total: ${sum}. Multiplied numbers ${multipliedNums.join('*')} === ${gearPower} at row ${rowIndex + 1} and col ${symbolCol + 1}`)
        multipliedNums = [];
      }
    }
  }
  console.log(sum);
})();