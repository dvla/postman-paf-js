/**
 * Return true if a string is not empty/null and not equal to 'null'
 *
 * @param string The string to check
 * @returns {boolean} False for null, empty string or 'null'. True otherwise.
 */
const isPresent = (string) => !!(string && string !== 'null');

/**
 * Return true if a string is empty/null or equal to 'null'
 *
 * @param string The string to check
 * @returns {boolean} True for null, empty string or 'null'. False otherwise.
 */
const isNullOrEmpty = (string) => !isPresent(string);

/**
 * Return true if the first and last characters in a string are numeric (e.g. '1', '05', '7H9')
 *
 * @param string The string to check
 * @returns {boolean} True if the string matches the condition, false otherwise
 */
const areFirstAndLastCharactersNumeric = (string) => /^\d(.*\d)?$/.test(string);

/**
 * Return true if the first and penultimate characters in a string are numeric, and the last character is alphabetic
 * (e.g. '3R', '12A', '4K5J')
 *
 * @param string The string to check
 * @returns {boolean} True if the string matches the condition, false otherwise
 */
const areFirstAndPenultimateCharsNumericAndLastAlpha = (string) => /^\d([a-zA-Z]|(.*)\d[a-zA-Z])$/.test(string);

/**
 * Return true if a string consists only a single alphabetic character
 *
 * @param string The string to check
 * @returns {boolean} True if the string matches the condition, false otherwise
 */
const hasOnlyOneAlphabeticCharacter = (string) => /^[a-zA-Z]$/.test(string);

/**
 * Return true if a string consists of a decimal number, e.g. 7.1
 *
 * @param string The string to check
 * @returns {boolean} True if the string is a decimal number, false otherwise
 */
const isDecimal = (string) => /^\d+\.\d+$/.test(string);

/**
 * Return true if a string consists of 2 or more characters separated by a forward slash, e.g. 3/4
 *
 * @param string The string to check
 * @returns {boolean} True if the string matches the condition, false otherwise
 */
const isValidMedialForwardSlashedString = (string) => /^[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/.test(string);

module.exports = {
    isNullOrEmpty,
    isPresent,
    areFirstAndLastCharactersNumeric,
    areFirstAndPenultimateCharsNumericAndLastAlpha,
    hasOnlyOneAlphabeticCharacter,
    isDecimal,
    isValidMedialForwardSlashedString,
};
