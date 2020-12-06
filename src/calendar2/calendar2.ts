import { CALENDAR_2_INPUT } from "./calendar2-input";

const PASSWORD_ENTRY_PATTERN = /^[0-9]*-[0-9]* [a-z]{1}: [a-z]*\b/;

// Part 1 - https://adventofcode.com/2020/day/2
export const calendar2_part1 = (input: string[]): number => {
  return input.filter((i) => {
    // Early exit if the string does not match the password entry pattern
    if (!PASSWORD_ENTRY_PATTERN.test(i)) {
      return false;
    }

    // Split the password entry string into three parts: range, character and the password. Before split we'll
    // replace the :-character with an empty string for easier handling of the policy character
    const [range, character, password] = i.replace(':', '').split(' ');
    // Create a regexp from the policy character. The regexp will match all other characters except the policy character.
    const regex = new RegExp(`(?!${character}).`, 'g'); // <- remember the 'g' so we'll get all matches.
    // Replace all other characters with empty string. The length of the result string will tell us the occurrences of the given character
    const occurrences = password.replace(regex, '').length;
    // Get numeric min and max amount by splitting the string range and casting the values to numbers.
    const [min, max] = range.split('-').map((s) => Number(s));

    return occurrences >= min && occurrences <= max;
  }).length;
};

console.log('== Calendar 2 - part 1', );
console.log(`output: ${calendar2_part1(CALENDAR_2_INPUT)}`);

// Part 2 - https://adventofcode.com/2020/day/2#part2
export const calendar2_part2 = (input: string[]): number => {
  return input.filter((i) => {
    // Early exit if the string does not match the password entry pattern
    if (!PASSWORD_ENTRY_PATTERN.test(i)) {
      return false;
    }

    // Split the password entry string into three parts range, character and the password. Before split we'll
    // replace the :-character with an empty string for easier handling of the policy character
    const [matchIndexes, character, password] = i.replace(':', '').split(' ');
    // Get numeric first and second match indexes by splitting the matchIndexes string and casting the values to numbers.
    // Remember to deduct 1 from the parsed index as the Toboggan Corporate Policies have no concept of "index zero"!
    const [firstMatchIndex, secondMatchIndex] = matchIndexes.split('-').map((s) => Number(s) - 1);

    // Check that only the first or the second index matches with the policy character.
    return password[firstMatchIndex] === character && password[secondMatchIndex] !== character 
      || password[firstMatchIndex] !== character && password[secondMatchIndex] === character;
  }).length;
}

console.log('== Calendar 2 - part 2', );
console.log(`output: ${calendar2_part2(CALENDAR_2_INPUT)}`);
