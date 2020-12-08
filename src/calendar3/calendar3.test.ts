import { calendar3_part1, InputError } from "./calendar3";

describe('calendar3_part1', () => {
  describe('when given an empty array', () => {
    it('should throw input min length error', () => {
      expect(() => calendar3_part1([])).toThrowError(InputError.INPUT_MIN_LENGTH);
    });
  });
  describe('when given an array that contains one entry', () => {
    describe('and entry length is less than 1', () => {
      it('should throw entry min length error', () => {
        expect(() => calendar3_part1([''])).toThrowError(InputError.ENTRY_MIN_LENGTH)
      });
    });
    describe('and entry contains illegal characters', () => {
      it('should throw illegal characters error', () => {
        expect(() => calendar3_part1(['..#s#..€'])).toThrowError(InputError.ILLEGAL_CHARACTERS)
      });
    });
    describe('and entry contains only legal characters', () => {
      it.each([
        ['.', 0],
        ['#', 1],
      ])('%s should return amount of trees (%i) in the first index', (input, expectedOutput) => {
        const output = calendar3_part1([input]);
        
        expect(output).toEqual(expectedOutput);
      });
    });
  });
  describe('when given an array of multiple entries', () => {
    describe('and one or more entries are different in length', () => {
      it('should throw mixed entry lengths error', () => {
        expect(() => calendar3_part1(['....#.#', '.#..#.#', '....##..'])).toThrowError(InputError.MIXED_LENGTHS);
      });
    });
    describe('and one or more entries contain illegal characters', () => {
      it('should throw illegal characters error', () => {
        expect(() => calendar3_part1(['....#.#', '.#....#', '.€..#.#'])).toThrowError(InputError.ILLEGAL_CHARACTERS);
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
          const output = calendar3_part1(input);
  
          expect(output).toEqual(expectedOutput);
        });
      });
      describe('and traversal does break entry´s index boundaries', () => {
        it('should continue traversing the next entry from the start with the excess amount', () => {
          const output = calendar3_part1([
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
          ]);
  
          expect(output).toEqual(7);
        });
      });
    });
  });
});
