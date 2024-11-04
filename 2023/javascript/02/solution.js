import { createDiffieHellmanGroup } from 'crypto';
import fs from 'fs';
const limit = {
  red: 12,
  green: 13,
  blue: 14,
};
const rawData = fs.readFileSync('./02/input.txt', { encoding: 'utf8' });
const data = rawData.split('\n');
data.pop();
console.log(data);
const result1 = data.reduce((a, b) => {
  return a + IsValidGame(b);
}, 0);
console.log('Result 1 is:' + result1);
const result2 = data.reduce((a, b) => {
  return a + GetMinNumberOfCubes(b);
}, 0);
console.log('Result 2 is:' + result2);
function IsValidGame(gameData) {
  let isBad = false;
  const game = gameData.split(':')[0];
  const gameId = game.split(' ')[1];
  const gamePlays = gameData.split(':')[1].split(';');
  gamePlays.forEach((playData) => {
    const shots = playData.split(',');
    shots.forEach((shot) => {
      const number = shot.split(' ')[1];
      const color = shot.split(' ')[2];
      if (limit[color] < number) {
        isBad = true;
      }
    });
  });
  if (isBad) return 0;
  return Number(gameId);
}

function GetMinNumberOfCubes(gameData) {
  const minimun = {
    red: 0,
    green: 0,
    blue: 0,
  };
  console.log('INITIAL', minimun);
  const gamePlays = gameData.split(':')[1].split(';');
  gamePlays.forEach((playData) => {
    const shots = playData.split(',');
    shots.forEach((shot) => {
      const number = shot.split(' ')[1];
      const color = shot.split(' ')[2];
      if (minimun[color] < number) {
        minimun[color] = Number(number);
      }
    });
    console.log(shots);
    console.log({ minimun });
  });
  return Object.values(minimun).reduce((a, b) => a * Number(b), 1);
}
