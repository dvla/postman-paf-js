const {
    isPresent,
    isNullOrEmpty,
    areFirstAndLastCharactersNumeric,
    areFirstAndPenultimateCharsNumericAndLastAlpha,
    hasOnlyOneAlphabeticCharacter,
    isDecimal,
    isValidMedialForwardSlashedString,
} = require('../stringHelper');

describe('isPresent', () => {
    it('returns true for a non-empty string not equal to "null"', () => {
        expect(isPresent('Hello')).toEqual(true);
    });

    it('returns false for an empty string', () => {
        expect(isPresent('')).toEqual(false);
    });

    it('returns false for a string equal to "null"', () => {
        expect(isPresent('null')).toEqual(false);
    });

    it('returns false for a null value', () => {
        expect(isPresent(null)).toEqual(false);
    });
});

describe('isNullOrEmpty', () => {
    it('returns true for an empty string', () => {
        expect(isNullOrEmpty('')).toEqual(true);
    });

    it('returns true for a string equal to "null"', () => {
        expect(isNullOrEmpty('null')).toEqual(true);
    });

    it('returns true for a null value', () => {
        expect(isNullOrEmpty(null)).toEqual(true);
    });

    it('returns false for a non-empty string', () => {
        expect(isNullOrEmpty('Hello World')).toEqual(false);
    });
});

describe('areFirstAndLastCharactersNumeric', () => {
    it('returns true for a single numeric character', () => {
        expect(areFirstAndLastCharactersNumeric('1')).toEqual(true);
    });

    it('returns true for two numeric characters', () => {
        expect(areFirstAndLastCharactersNumeric('12')).toEqual(true);
    });

    it('returns true for two numeric characters separated by any type of characters', () => {
        expect(areFirstAndLastCharactersNumeric('3a-Bc46')).toEqual(true);
    });

    it('returns false for an alphabetic character', () => {
        expect(areFirstAndLastCharactersNumeric('A')).toEqual(false);
    });

    it('returns false for an alphabetic character followed by a numeric character', () => {
        expect(areFirstAndLastCharactersNumeric('C2')).toEqual(false);
    });

    it('returns false for a numeric character followed by an alphabetic character', () => {
        expect(areFirstAndLastCharactersNumeric('9z')).toEqual(false);
    });
});

describe('areFirstAndPenultimateCharactersNumericAndLastAlpha', () => {
    it('returns true for a numeric character followed by an alphabetic character', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('3R')).toEqual(true);
    });

    it('returns true for two numeric characters followed by an alphabetic character', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('12a')).toEqual(true);
    });

    it('returns true for first and penultimate numeric characters, last alphabetic, separated by any type of characters', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('3s-F5B')).toEqual(true);
    });

    it('returns false for a single alphabetic character', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('E')).toEqual(false);
    });

    it('returns false for a single numeric character', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('7')).toEqual(false);
    });

    it('returns false for a numeric character followed by an alphabetic character', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('K9')).toEqual(false);
    });

    it('returns false if the first character is not numeric', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('H2O')).toEqual(false);
    });

    it('returns false if the penultimate character is not numeric', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('1ST')).toEqual(false);
    });

    it('returns false if the last character is not alphabetic', () => {
        expect(areFirstAndPenultimateCharsNumericAndLastAlpha('053')).toEqual(false);
    });
});

describe('hasOnlyOneAlphabeticCharacter', () => {
    it('returns true for a single lowercase alphabetic character', () => {
        expect(hasOnlyOneAlphabeticCharacter('e')).toEqual(true);
    });

    it('returns true for a single uppercase alphabetic character', () => {
        expect(hasOnlyOneAlphabeticCharacter('B')).toEqual(true);
    });

    it('returns false for two alphabetic characters', () => {
        expect(hasOnlyOneAlphabeticCharacter('CA')).toEqual(false);
    });

    it('returns false for a single numeric character', () => {
        expect(hasOnlyOneAlphabeticCharacter('2')).toEqual(false);
    });

    it('returns false for a single special character', () => {
        expect(hasOnlyOneAlphabeticCharacter('-')).toEqual(false);
    });
});

describe('isDecimal', () => {
    it('returns true for a decimal number', () => {
        expect(isDecimal('1.2')).toEqual(true);
    });

    it('returns true for a decimal number with over 2 digits', () => {
        expect(isDecimal('37.82')).toEqual(true);
    });

    it('returns false for a non-decimal number', () => {
        expect(isDecimal('12')).toEqual(false);
    });

    it('returns false for alphabetic characters', () => {
        expect(isDecimal('NAN')).toEqual(false);
    });

    it('returns false for a decimal containing alphabetic characters', () => {
        expect(isDecimal('3.4b')).toEqual(false);
    });
});

describe('isValidMedialForwardSlashedString', () => {
    it('returns true for two number separated by a forward slash', () => {
        expect(isValidMedialForwardSlashedString('3/4')).toEqual(true);
    });

    it('returns true for two alphabetic characters separated by a forward slash', () => {
        expect(isValidMedialForwardSlashedString('a/B')).toEqual(true);
    });

    it('returns true for an alphabetic and a numeric character separated by a forward slash', () => {
        expect(isValidMedialForwardSlashedString('4/C')).toEqual(true);
    });

    it('returns true if more than 2 characters are separated by a forward slash', () => {
        expect(isValidMedialForwardSlashedString('54/6')).toEqual(true);
    });

    it('returns false if 2 characters a separated by a backward slash', () => {
        expect(isValidMedialForwardSlashedString('7\\3')).toEqual(false);
    });

    it('returns false for 2 characters not separated by a forward slash', () => {
        expect(isValidMedialForwardSlashedString('28')).toEqual(false);
    });
});
