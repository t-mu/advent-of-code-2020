import { calendar3_part1, ErrorMessage } from "./calendar3";

const calendar3ExampleInput = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
]
const part1MovementPattern = { x: 3, y: 1 };

describe('calendar3_part1', () => {
  describe('when given an empty array', () => {
    it('should throw input min length error', () => {
      expect(() => calendar3_part1([], part1MovementPattern)).toThrowError(ErrorMessage.ROWS_MIN_LENGTH);
    });
  });
  describe('when given an array that contains one entry', () => {
    describe('and entry length is less than 1', () => {
      it('should throw entry min length error', () => {
        expect(() => calendar3_part1([''], part1MovementPattern)).toThrowError(ErrorMessage.ROW_MIN_LENGTH)
      });
    });
    describe('and entry contains illegal characters', () => {
      it('should throw illegal characters error', () => {
        expect(() => calendar3_part1(['..#s#..€'], part1MovementPattern)).toThrowError(ErrorMessage.ILLEGAL_CHARACTERS)
      });
    });
    describe('and entry contains only legal characters', () => {
      it.each([
        ['.', 0],
        ['#', 1],
      ])('%s should return amount of trees (%i) in the first index', (input, expectedOutput) => {
        const output = calendar3_part1([input], part1MovementPattern);
        
        expect(output).toEqual(expectedOutput);
      });
    });
  });
  describe('when given an array of multiple entries', () => {
    describe('and one or more entries are different in length', () => {
      it('should throw mixed entry lengths error', () => {
        expect(() => calendar3_part1([
          '....#.#', 
          '.#..#.#', 
          '....##..'
        ], part1MovementPattern)).toThrowError(ErrorMessage.MIXED_LENGTHS);
      });
    });
    describe('and one or more entries contain illegal characters', () => {
      it('should throw illegal characters error', () => {
        expect(() => calendar3_part1([
          '....#.#', 
          '.#....#', 
          '.€..#.#'
        ], part1MovementPattern)).toThrowError(ErrorMessage.ILLEGAL_CHARACTERS);
      });
    });
    describe('and all entries are valid', () => {
      describe('and traversal does NOT break entry`s index boundaries', () => {
        it.each([
          ['all empty', [
            '.......', 
            '.......', 
            '.......'
          ], 0],
          ['all trees', [
            '#######', 
            '#######', 
            '#######'
          ], 2],
          ['mixed', [
            '.......', 
            '...#...', 
            '......#'
          ], 2],
        ])('should return the amount of trees encountered before and upon reaching the bottom (%s)', (_variant, input, expectedOutput) => {
          const output = calendar3_part1(input, part1MovementPattern);
  
          expect(output).toEqual(expectedOutput);
        });
      });
      describe('and traversal does break entry´s index boundaries', () => {
        it('should continue traversing the next entry from the start with the excess amount', () => {
          const output = calendar3_part1(calendar3ExampleInput, part1MovementPattern);
  
          expect(output).toEqual(7);
        });
      });
    });
  });
  describe('when given a navigation pattern { x: number, y: number }', () => {
    describe('and x is less than required', () => {
      it.each([
        [-1],
        [-5],
      ])('should throw min movement error (x = %i)', (x) => {
        expect(() => calendar3_part1(calendar3ExampleInput, { x, y: 1 })).toThrowError(ErrorMessage.MIN_MOVEMENT);
      });
    });
    describe('and y is less than required', () => {
      it.each([
        [-2],
        [0],
      ])('should throw min movement error (y = %i)', (y) => {
        expect(() => calendar3_part1(calendar3ExampleInput, { x: 1, y})).toThrowError(ErrorMessage.MIN_MOVEMENT);
      });
    });
    describe('and x and y are within allowed limits', () => {
      it.each([
        [{ x: 1, y: 1 }, 2],
        [{ x: 3, y: 1 }, 7],
        [{ x: 5, y: 1 }, 3],
        [{ x: 7, y: 1 }, 4],
        [{ x: 1, y: 2 }, 2],
        [{ x: 3, y: 3 }, 1],
        [{ x: 14, y: 5 }, 0],
        [{ x: 4, y: 100 }, 1],
      ])('%o should return the amount of trees (%i) using the given pattern', (movementPattern, expectedOutput) => {
        const output = calendar3_part1(calendar3ExampleInput, movementPattern);

        expect(output).toEqual(expectedOutput);
      })
    })
  });
});
