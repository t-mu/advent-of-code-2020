import { calendar2_part1, calendar2_part2 } from './calendar2';

describe('calendar2_part1', () => {
  describe('when given an empty array', () => {
    it('should return 0', () => {
      const output = calendar2_part1([]);

      expect(output).toEqual(0)
    });
  });
  describe('when an array with entries', () => {
    it.each([
      [['', 'asd', ' this does not match '], 0],
      [['1-2 a: aaaa', '1-4 b: bbbbwwww', '3-4 s: sslloo'], 1],
    ])('should return the amount of entries matching the Toboggan Corporate Policies', (input, expectedOutput) => {
      const output = calendar2_part1(input);

      expect(output).toEqual(expectedOutput)
    });
  });
});

describe('calendar2_part2', () => {
  describe('when given an empty array', () => {
    it('should return 0', () => {
      const output = calendar2_part2([]);

      expect(output).toEqual(0);
    });
  });
  describe('when given an array with entries', () => {
    it.each([
      [['', 'asd', ' this does not match '], 0],
      [['1-2 a: aaaa', '1-4 b: bxxxwwww', '3-4 s: allsloo'], 2],
    ])('should return the amount of entries matching the Toboggan Corporate Policies', (input, expectedOutput) => {
      const output = calendar2_part2(input);

      expect(output).toEqual(expectedOutput)
    });
  });
});