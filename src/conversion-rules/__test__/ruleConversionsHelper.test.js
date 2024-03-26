const {
    addPresentAddressElement,
    addThoroughfareAndLocalityElementsWithPremisesPrefix,
    mapAddressElementsToUnstructuredAddress,
    isExceptionRuleIndicator,
    containsKeyword,
    isBuildingNameNumericPartException,
} = require('../ruleConversionsHelper');
const { structuredAddressTemplate } = require('./fixtures');

describe('addPresentAddressElement', () => {
    it('adds a not null and not empty element to an array', () => {
        const array = ['Hello'];
        addPresentAddressElement(array, 'World');
        expect(array).toEqual(['Hello', 'World']);
    });

    it('adds a not null and not empty element to an empty array', () => {
        const array = [];
        addPresentAddressElement(array, 'test');
        expect(array).toEqual(['test']);
    });

    it('does not add a null element to an array', () => {
        const array = ['Hello'];
        addPresentAddressElement(array, null);
        expect(array).toEqual(['Hello']);
    });

    it('does not add an undefined element to an array', () => {
        const array = ['Hello'];
        addPresentAddressElement(array, undefined);
        expect(array).toEqual(['Hello']);
    });

    it('does not add an empty string element to an array', () => {
        const array = ['Hello'];
        addPresentAddressElement(array, '');
        expect(array).toEqual(['Hello']);
    });
});

describe('addThoroughfareAndLocalityElementsWithPremisesPrefix', () => {
    const premisesElement = structuredAddressTemplate.buildingName;

    it('prepends the premises element to the dependentThoroughfareName if it is present', () => {
        // Given
        const addressElements = [];
        const structuredAddress = {
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
        };

        // When
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, premisesElement);

        // Then
        expect(addressElements).toEqual([
            `${premisesElement} ${structuredAddressTemplate.dependentThoroughfareName}`,
            structuredAddressTemplate.thoroughfareName,
            structuredAddressTemplate.doubleDependentLocality,
            structuredAddressTemplate.dependentLocality,
        ]);
    });

    it('prepends the premises element to the thoroughfareName if there is no dependentThoroughfareName', () => {
        // Given
        const addressElements = [];
        const structuredAddress = {
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
        };

        // When
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, premisesElement);

        // Then
        expect(addressElements).toEqual([
            `${premisesElement} ${structuredAddressTemplate.thoroughfareName}`,
            structuredAddressTemplate.doubleDependentLocality,
            structuredAddressTemplate.dependentLocality,
        ]);
    });

    it('prepends the premises element to the doubleDependentLocality if there is no thoroughfare element', () => {
        // Given
        const addressElements = [];
        const structuredAddress = {
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
        };

        // When
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, premisesElement);

        // Then
        expect(addressElements).toEqual([
            `${premisesElement} ${structuredAddressTemplate.doubleDependentLocality}`,
            structuredAddressTemplate.dependentLocality,
        ]);
    });

    it('prepends the premises element to the dependent locality if there are no other thoroughfare or locality elements', () => {
        // Given
        const addressElements = [];
        const structuredAddress = { dependentLocality: structuredAddressTemplate.dependentLocality };

        // When
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, premisesElement);

        // Then
        expect(addressElements).toEqual([`${premisesElement} ${structuredAddressTemplate.dependentLocality}`]);
    });

    it('pushes the premises element to the array if there are no thoroughfare or locality elements', () => {
        // Given
        const addressElements = [];
        const structuredAddress = {};

        // When
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, premisesElement);

        // Then
        expect(addressElements).toEqual([premisesElement]);
    });
});

describe('mapAddressElementsToUnstructuredAddress', () => {
    const testAddressToMap = {
        elements: ['Flat 1A', 'Retro Residence', 'Atypical Avenue', 'Nonsensical Neighbourhood'],
        postTown: 'Meticulous Metropolis',
        postcode: 'R2 3PO',
    };

    const testAddressMapping = {
        line1: 'FLAT 1A',
        line2: 'RETRO RESIDENCE',
        line3: 'ATYPICAL AVENUE',
        line4: 'NONSENSICAL NEIGHBOURHOOD',
        line5: 'METICULOUS METROPOLIS',
        postcode: 'R2 3PO',
    };

    it('maps an array of 1 element to a 2-line unstructured address', () => {
        // Given
        const addressElements = [testAddressToMap.elements[0]];

        // When
        const mappedUnstructuredAddress = mapAddressElementsToUnstructuredAddress(
            addressElements,
            testAddressToMap.postTown,
            testAddressToMap.postcode
        );

        // Then
        expect(mappedUnstructuredAddress).toEqual({
            line1: testAddressMapping.line1,
            line5: testAddressMapping.line5,
            postcode: testAddressMapping.postcode,
        });
    });

    it('maps an array of 2 elements to a 3-line unstructured address', () => {
        // Given
        const addressElements = testAddressToMap.elements.slice(0, 2);

        // When
        const mappedUnstructuredAddress = mapAddressElementsToUnstructuredAddress(
            addressElements,
            testAddressToMap.postTown,
            testAddressToMap.postcode
        );

        // Then
        expect(mappedUnstructuredAddress).toEqual({
            line1: testAddressMapping.line1,
            line2: testAddressMapping.line2,
            line5: testAddressMapping.line5,
            postcode: testAddressMapping.postcode,
        });
    });

    it('maps an array of 3 elements to a 4-line unstructured address', () => {
        // Given
        const addressElements = testAddressToMap.elements.slice(0, 3);

        // When
        const mappedUnstructuredAddress = mapAddressElementsToUnstructuredAddress(
            addressElements,
            testAddressToMap.postTown,
            testAddressToMap.postcode
        );

        // Then
        expect(mappedUnstructuredAddress).toEqual({
            line1: testAddressMapping.line1,
            line2: testAddressMapping.line2,
            line3: testAddressMapping.line3,
            line5: testAddressMapping.line5,
            postcode: testAddressMapping.postcode,
        });
    });

    it('maps an array of 4 elements to a 5-line unstructured address', () => {
        // Given
        const addressElements = testAddressToMap.elements;

        // When
        const mappedUnstructuredAddress = mapAddressElementsToUnstructuredAddress(
            addressElements,
            testAddressToMap.postTown,
            testAddressToMap.postcode
        );

        // Then
        expect(mappedUnstructuredAddress).toEqual(testAddressMapping);
    });

    it('does not include additional address elements if there are more than 4 in the array', () => {
        // Given
        const addressElements = [...testAddressToMap.elements, 'just one more line...', 'and another'];

        // When
        const mappedUnstructuredAddress = mapAddressElementsToUnstructuredAddress(
            addressElements,
            testAddressToMap.postTown,
            testAddressToMap.postcode
        );

        // Then
        expect(mappedUnstructuredAddress).toEqual(testAddressMapping);
    });
});

describe('isExceptionRuleIndicator', () => {
    it('returns true if the first and last characters are numeric', () => {
        expect(isExceptionRuleIndicator('12')).toEqual(true);
    });

    it('returns true if the first and penultimate chars are numeric and last char is alphabetic', () => {
        expect(isExceptionRuleIndicator('12A')).toEqual(true);
    });

    it('returns true if the string has only one alphabetic characters', () => {
        expect(isExceptionRuleIndicator('A')).toEqual(true);
    });

    it('returns false if the string does not match any of the above conditions', () => {
        expect(isExceptionRuleIndicator('ABC')).toEqual(false);
    });
});

describe('containsKeyword', () => {
    it('returns true if the building name last word is preceded by a keyword', () => {
        // Given
        const buildingName = 'FLAT 1A';
        const lastWord = '1A';

        // Then
        expect(containsKeyword(buildingName, lastWord)).toEqual(true);
    });

    it('returns true if the building name last word is preceded by a keyword in a longer string', () => {
        // Given
        const buildingName = 'SWEET SUITE 05';
        const lastWord = '05';

        // Then
        expect(containsKeyword(buildingName, lastWord)).toEqual(true);
    });

    it('returns false if the building name last word is not preceded by a keyword', () => {
        // Given
        const buildingName = 'Flat-ish house';
        const lastWord = 'house';

        // Then
        expect(containsKeyword(buildingName, lastWord)).toEqual(false);
    });

    it('returns false if the building name contains a keyword but it does not precede the last word', () => {
        // Given
        const buildingName = 'UNIT UNKNOWN LOCATION';
        const lastWord = 'LOCATION';

        // Then
        expect(containsKeyword(buildingName, lastWord)).toEqual(false);
    });
});

describe('isBuildingNameNumericPartException', () => {
    it('returns true if the last word of the building name is an exception rule indicator', () => {
        expect(isBuildingNameNumericPartException('TEST 1A')).toEqual(true);
    });

    it('returns true if the last word of the building name is a number above the max threshold', () => {
        expect(isBuildingNameNumericPartException('TEST 10000')).toEqual(true);
    });

    it('returns false if the last word of the building name is number below the max threshold', () => {
        expect(isBuildingNameNumericPartException('TEST 9999')).toEqual(false);
    });

    it('returns false if the last word of the building name above the min threshold', () => {
        expect(isBuildingNameNumericPartException('TEST 0')).toEqual(false);
    });

    it('returns false if the last word of the building name contains a number but is not an exception rule indicator', () => {
        expect(isBuildingNameNumericPartException('TEST A1')).toEqual(false);
    });

    it('returns false if the last word of the building name does not contain a number', () => {
        expect(isBuildingNameNumericPartException('TEST A')).toEqual(false);
    });

    it('returns false if the building name only contains one word', () => {
        expect(isBuildingNameNumericPartException('1A')).toEqual(false);
    });
});
