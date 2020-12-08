import { CALENDAR_3_INPUT } from "./calendar3-input";

export enum InputError {
  INPUT_MIN_LENGTH = 'The input needs to have at least one entry.',
  ENTRY_MIN_LENGTH = 'Entries need to contain at least one character',
  ILLEGAL_CHARACTERS = 'One or more entries contain illegal characters.',
  MIXED_LENGTHS = 'One or more entries are different in length.',
}

const ALLOWED_CHARACTERS = /^(\.|#)+$/;
const validateInput = (input: string[]): void => {
  // Check if the input is empty
  if (input.length === 0) {
    throw new Error(InputError.INPUT_MIN_LENGTH);
  }

  // For each entry check that they
  input.forEach((entry) => {
    // are not blank
    if (entry.length < 1) {
      throw new Error(InputError.ENTRY_MIN_LENGTH)
    }
    // are the same length
    if (entry.length !== input[0].length) {
      throw new Error(InputError.MIXED_LENGTHS);
    }
    // do not contain illegal characters
    if (!ALLOWED_CHARACTERS.test(entry)) {
      throw new Error(InputError.ILLEGAL_CHARACTERS);
    }
  });
};

// Part 1 - https://adventofcode.com/2020/day/3
// Calculate the amount of trees (#) while traversing the matrix from top-left corner to the bottom
export const calendar3_part1 = (input: string[]): number => {  
  // First validate the input
  validateInput(input);

  let amountOfTrees = 0;

  // I'm using reduce here for iterating the input since I can easily pass in the next blockIndex 
  // for the next entry without having to create a new variable and keep track of that.
  input.reduce((blockIndex, entry, inputIndex) => {
    // If the first entry is also the last one, check our starting index for a tree, otherwise
    // we'll skip the first entry and start traversing towards the 'bottom'.
    const blockIsTree = (inputIndex !== 0 || input.length - 1 === 0) && entry[blockIndex] === '#';
    // increase the next index to be accessed by 3 when moving forward as per the instructions.
    const nextEntryIndex = blockIndex + 3;
    // Simply increase the amount of trees if the current block is a tree.
    amountOfTrees = blockIsTree ? amountOfTrees + 1 : amountOfTrees;
    // When we calculate the next blockIndex, we'll need to take into account the transition beyond one entry's
    // boundaries (since the pattern repeats itself infinitely). We'll check whether the next blockIndex is out of
    // bounds, and if so we'll reduce the entry's length from the new supposed index to get the index as if we 
    // would travel to the next repeating pattern. Otherwise we can just return the next index.
    blockIndex = nextEntryIndex > entry.length - 1 ? nextEntryIndex - entry.length : nextEntryIndex;

    return blockIndex;
  }, 0);
  
  return amountOfTrees;
}

console.log(`
== Calendar 3 - part 1
output: ${calendar3_part1(CALENDAR_3_INPUT)}
`);