import { CALENDAR_1_INPUT } from './calendar1-input';

// Part 1 - https://adventofcode.com/2020/day/1
// Find two entries that sum up to the given target and return their multiplication
export const calendar1_part1 = (input: number[], targetSum: number): number | undefined => {
  // Map the entries to a multiplication of their expected counterpart.
  // For two entries we should get a duplicate result.
  const multiplications = input.map((i) => i * (targetSum - i));
  
  // We can deduce the output by checking which multiplication entry has a different first and last index.
  // This means those entries in the original input array were the ones summing up to the target.
  // We don't need to know which numbers they were as we're just interested in the multiplication output.
  const output = multiplications.find((m) => multiplications.indexOf(m) !== multiplications.lastIndexOf(m));
  
  return output;
}

console.log(`
== Calendar 1 - Part 1 ==
output: ${calendar1_part1(CALENDAR_1_INPUT, 2020)}
`);

// Part 2 - https://adventofcode.com/2020/day/1#part2
// Find three entries that sum up to the given target and return their multiplication
export const calendar1_part2 = (input: number[], targetSum: number): number | undefined => {
  // Here we can utilize the function we created during the first part.
  // For each entry we need to know which other two entries together make up the target sum.
  const output = input.reduce((multiplication: number, inputNumber: number) => {
    // If we'll reduce each entry from this function's target sum, we'll get a number that should be the sum of two other entries.
    // We can now pass that number as a parameter to calendar1_part1 and see which two entries together make the amount.
    // For each entry we just need to know whether we got a value from calendar1_part1 or not, if so then we'll know
    // that the entry in question is one of our matches.
    const hasSumMatchingCounterParts = calendar1_part1(input, targetSum - inputNumber) !== undefined;

    // As we're iterating the input we'll check whether the current entry has sum matching counterparts and multiply
    // the current multiplication by its value. If not, we'll just return the current multiplication amount.
    return hasSumMatchingCounterParts ? multiplication * inputNumber : multiplication;
  }, 1);

  // Since we're providing our reduce function an initial value of 1, we'll check here whether the output is greater than that.
  // If it is 1, we did not have any matches and return undefined, otherwise we'll return the multiplication output.
  return output > 1 ? output : undefined;
}

console.log(`
== Calendar 1 - Part 2 ==
output: ${calendar1_part2(CALENDAR_1_INPUT, 2020)}
`);
