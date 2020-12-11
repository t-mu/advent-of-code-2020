import { CALENDAR_3_INPUT } from "./calendar3-input";

export enum ErrorMessage {
  ROWS_MIN_LENGTH = 'At least one row needs to be provided.',
  ROW_MIN_LENGTH = 'Rows need to contain at least one character.',
  ILLEGAL_CHARACTERS = 'One or more rows contain illegal characters.',
  MIXED_LENGTHS = 'One or more rows are different in length.',
  MIN_MOVEMENT = 'X needs to be at least 0 and Y needs to be at least 1.',
  NO_MOVEMENT = 'Need at least one movement pattern.'
}

type Coords = {
  x: number,
  y: number,
}

type Tracker = {
  trees: number,
  landingIndex: number,
}

const ALLOWED_CHARACTERS = /^(\.|#)+$/;
const validateParams = (rows: string[], movementPatterns: Coords[]): void => {
  // Check if the rows input is empty
  if (rows.length === 0) {
    throw new Error(ErrorMessage.ROWS_MIN_LENGTH);
  }

  // Check if there are no movement patterns
  if (movementPatterns.length === 0) {
    throw new Error(ErrorMessage.NO_MOVEMENT);
  }

  // Check if movement pattern is valid
  // Y needs to be at least one so that we will move towards the bottom
  movementPatterns.forEach(({ x, y }) => {
    if (x < 0 || y < 1) {
      throw new Error(ErrorMessage.MIN_MOVEMENT);
    }
  });

  // For each entry check that they
  rows.forEach((entry) => {
    // are not blank
    if (entry.length < 1) {
      throw new Error(ErrorMessage.ROW_MIN_LENGTH)
    }
    // are the same length
    if (entry.length !== rows[0].length) {
      throw new Error(ErrorMessage.MIXED_LENGTHS);
    }
    // do not contain illegal characters
    if (!ALLOWED_CHARACTERS.test(entry)) {
      throw new Error(ErrorMessage.ILLEGAL_CHARACTERS);
    }
  });
};

const calculateTreesUsingPattern = (rows: string[], { x, y }: Coords) => {
  // I'm using reduce here for iterating the rows since I can easily pass in the next landingIndex 
  // for the next row and keep track of the trees without having to create a new variable outside the function scope.
  // This makes it also "side-effect free"
  return rows.reduce(({ trees, landingIndex }, row, rowIndex) => {
    const isLastRow = rowIndex === rows.length - 1;
    // Here we check if the row is the only one, meaning it also the last one.
    // Semantically it's the best but I'll roll with it
    const isFirstRow = rowIndex === 0 && !isLastRow;
    // We will always land in the last row, hence the check for that. Otherwise we'll check if the rowIndex modulo of y is 0.
    // This means we're in the next landing row as we skip the first one (index 0). So the modulo result should always be 0 for
    // the landing rows e.g. start from 0 and y = 2, the next landing index would be 0 + 2 = 2, and 2 % 2 = 0. The same thing
    // goes for the following landing indexes 2 + 2 = 4, and 4 % 2 = 0 and so on and so on.
    const isLandingRow = isLastRow || rowIndex % y === 0;

    if (isFirstRow || isLandingRow) {
      // For the first row we'll skip the tree-check and start traversing towards the 'bottom'. 
      // We need to also check if the row is the last one since we might might not land on the last "row" with even steps.
      const landingIndexContainsATree = !isFirstRow && row[landingIndex] === '#';
      // Increase the next index by movementPattern.x when moving forward.
      const nextLandingIndex = landingIndex + x;
      const indexIsOutOfBounds = nextLandingIndex > row.length - 1;

      // When we set the next landingIndex, we'll need to take into account the transition beyond one row's
      // boundaries (since the pattern repeats itself infinitely). We'll check whether the next landingIndex is out of
      // bounds, and if so we'll reduce the row's length from the next supposed landingIndex to get the index as if we 
      // would travel to the next repeating pattern. Otherwise we can just return the next landingIndex.
      return {
        trees: landingIndexContainsATree ? trees + 1 : trees,
        landingIndex: indexIsOutOfBounds ? nextLandingIndex - row.length : nextLandingIndex,
      }
    }

    return { trees, landingIndex };
  }, {
    trees: 0,
    landingIndex: 0,
  } as Tracker).trees; // Here we'll just return the trees property from the reduced tracker object
};

// Part 1 - https://adventofcode.com/2020/day/3
// Calculate the amount of trees (#) while traversing the row matrix from top-left corner to the bottom
export const calendar3_part1 = (rows: string[], movementPatterns: Coords[]): number => {  
  // First validate the given params
  validateParams(rows, movementPatterns);

  // Simply iterate the patterns with reduce and return the final multiplication of each pattern's results
  return movementPatterns.reduce((multiplication, pattern) => {
    return multiplication * calculateTreesUsingPattern(rows, pattern);
  }, 1);
}

console.log(`
== Calendar 3 - part 1
output: ${calendar3_part1(CALENDAR_3_INPUT, [{ x: 3, y: 1 }])}
`);

console.log(`
== Calendar 3 - part 2
output: ${calendar3_part1(CALENDAR_3_INPUT, [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
])}
`);