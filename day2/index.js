const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const [r, g, b] = [12, 13, 14];
/**
 * 
 * @param {string} line 
 */
const processLine1 = (line) => {
  const headerAndLine = line.split(':');
  const gameId = parseInt(headerAndLine[0].split(' ')[1]);
  const samples = headerAndLine[1].trim().split(';');

  for (const sample of samples) {
    // console.log(sample.trim());
    const colorPhrases = sample.trim().split(',');
    for (const colorPhrase of colorPhrases) {
      // console.log(colorPhrase.trim());
      const noAndColor = colorPhrase.trim().split(' ');
      const qty = parseInt(noAndColor[0]);
      const color = noAndColor[1];
      // console.log(qty, color);
      if ((color === 'red' && r < qty) ||
        (color === 'blue' && b < qty) ||
        (color === 'green' && g < qty)) {
        // console.log('game is impossible: ', r, g, b, qty, color);
        return 0;
      }
    }
  }

  return gameId;
};


/**
 * 
 * @param {string} line 
 */
const processLine2 = (line) => {
  let [r, g, b] = [0, 0, 0];
  const headerAndLine = line.split(':');
  const samples = headerAndLine[1].trim().split(';');

  for (const sample of samples) {
    // console.log(sample.trim());
    const colorPhrases = sample.trim().split(',');
    for (const colorPhrase of colorPhrases) {
      // console.log(colorPhrase.trim());
      const noAndColor = colorPhrase.trim().split(' ');
      const qty = parseInt(noAndColor[0]);
      const color = noAndColor[1];
      // console.log(qty, color);
      if (color === 'red') { r = Math.max(r, qty); }
      if (color === 'blue') { b = Math.max(b, qty); }
      if (color === 'green') { g = Math.max(g, qty); }
    }
  }

  return r * g * b;
};

// part1
// (async () => {
//   let sum = 0;
//   for await (const line of lines) {
//     console.log(line);
//     const gameId = processLine1(line);
//     sum += gameId;
//     console.log(gameId);
//   }
//   console.log(sum);
// })();

// part2
(async () => {
  let sum = 0;
  for await (const line of lines) {
    console.log(line);
    const gameId = processLine2(line);
    sum += gameId;
    console.log(gameId);
  }
  console.log(sum);
})();