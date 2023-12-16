const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const scratchCards = {};

/**
 * 
 * @param {string} line
 * @returns {number}
 */

let globalProcess = 0;

const processCard = (cardNumber) => {
  if (cardNumber > Object.keys(scratchCards).length) {
    // console.log('Breaking on out of bounds');
    return;
  }
  globalProcess += 1;
  const scratchCard = scratchCards[cardNumber][0];
  // console.log(scratchCard);
  const numbers = scratchCard.split(':')[1].trim().split(' | ');
  const winningNumbers = numbers[0].split(' ').filter(str => str !== '').map(n => parseInt(n.trim()));
  const cardNumbers = numbers[1].split(' ').filter(str => str !== '').map(n => parseInt(n.trim()));

  // console.log(winningNumbers);
  // console.log(cardNumbers);

  let matches;
  // console.log(scratchCards[cardNumber]);
  if (scratchCards[cardNumber][1]) {
    matches = scratchCards[cardNumber][1];
  } else {
    matches = cardNumbers.reduce((acc, cur) => {
      if (winningNumbers.includes(cur)) {
        acc += 1;
      }
      return acc;
    }, 0);
    scratchCards[cardNumber][1] = matches;
  }

  // console.log(`Processing card ${cardNumber} - ${matches} matches`);

  if (matches === 0) {
    // console.log('Breaking on 0 matches');
    return;
  }

  for (let cardToProcess = cardNumber + 1; cardToProcess < cardNumber + 1 + matches; cardToProcess++) {
    // console.log(`Adding card ${cardToProcess} to process`);
    processCard(cardToProcess);
  }
};

(async () => {
  let index = 0;
  for await (const line of lines) {
    scratchCards[index + 1] = [line, undefined];
    index++;
  }

  for (let cardNumber = 1; cardNumber <= Object.keys(scratchCards).length; cardNumber++) {
    processCard(cardNumber);
  }
  // console.log(globalProcess);
})();

