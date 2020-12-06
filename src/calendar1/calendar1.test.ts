import { calendar1_part1, calendar1_part2 } from './calendar1';

// Part 1
describe('calendar1_part1', () => {
  describe('when given an empty array', () => {
    it('should return undefined', () => {
      const output = calendar1_part1([], 2020);
    
      expect(output).toBeUndefined();
    });
  });
  describe('when given an array of integers', () => {
    describe('and array does NOT contain two entries that make up the target sum', () => {
      it('should return undefined', () => {
        const output = calendar1_part1([200, 1030, 50], 2020);

        expect(output).toBeUndefined();
      });
    });
    describe('and array does contain two entries that make up the target sum', () => {
      it.each([
        [[200, 1020, 50, 1000, -1000], 2020, 1020000],
        [[1, 1999, -708, 184, -20, 0, 9999, 545], 10000, 9999]
      ])('should return the multiplication of the first two matching entries', (input, targetSum, expectedOutput) => {
        const output = calendar1_part1(input, targetSum);

        expect(output).toBe(expectedOutput);
      });
    });
  });
});

// Part 2
describe('calendar1_part2', () => {
  describe('when given an empty array', () => {
    it('should return undefined', () => {
      const output = calendar1_part2([], 876);
    
      expect(output).toBeUndefined();
    });
  });
  describe('and array does NOT contain three entries that make up the target sum', () => {
    it('should return undefined', () => {
      const output = calendar1_part2([200, 1030, 50], 2020);

      expect(output).toBeUndefined();
    });
  });
  describe('and array does contain three entries that make up the target sum', () => {
    it.each([
      [[200, 490, 50, 510, 1020], 2020, 490 * 510 * 1020],
      [[470, 490, 50, 10, -1020, 86, 530], 606, 50 * 86 * 470],
    ])('should return the multiplication of the first three matching entries', (input, targetSum, expectedOutput) => {
      const output = calendar1_part2(input, targetSum);

      expect(output).toBe(expectedOutput);
    });
  });
});
