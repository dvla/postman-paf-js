const {
    areFirstAndLastCharactersNumeric,
    areFirstAndPenultimateCharsNumericAndLastAlpha,
    hasOnlyOneAlphabeticCharacter,
    isDecimal,
    isValidMedialForwardSlashedString,
} = require('../stringHelper');

const MIN_BUILDING_NAME_NUMBER_FOR_EXCEPTION = 0;
const MAX_BUILDING_NAME_NUMBER_FOR_EXCEPTION = 10000;

/**
 * Add an element to an array as long as that element is not null or empty string.
 *
 * @param addressElements {[]} The array the element should be added to
 * @param element {string} The element to add to the array
 */
const addPresentAddressElement = (addressElements, element) => {
    if (element) {
        addressElements.push(element);
    }
};

/**
 * Appends the dependentThoroughfareName, thoroughfareName, doubleDependentLocality and dependentLocality elements to
 * the addressElements array. The premises element is prepended to the first element in the above list (in that order
 * respectively) to be present. If none of these elements are present, the premises element is appended to the
 * addressElements array by itself.
 *
 * @param addressElements {[]} The array the elements should be appended to
 * @param structuredAddress {{}} The structured address being converted
 * @param premisesElement {string} The element to prefix to one of the thoroughfare or locality elements
 */
const addThoroughfareAndLocalityElementsWithPremisesPrefix = (addressElements, structuredAddress, premisesElement) => {
    if (structuredAddress.dependentThoroughfareName) {
        addressElements.push(`${premisesElement} ${structuredAddress.dependentThoroughfareName}`);
        addPresentAddressElement(addressElements, structuredAddress.thoroughfareName);
        addPresentAddressElement(addressElements, structuredAddress.doubleDependentLocality);
        addPresentAddressElement(addressElements, structuredAddress.dependentLocality);
    } else if (structuredAddress.thoroughfareName) {
        addressElements.push(`${premisesElement} ${structuredAddress.thoroughfareName}`);
        addPresentAddressElement(addressElements, structuredAddress.doubleDependentLocality);
        addPresentAddressElement(addressElements, structuredAddress.dependentLocality);
    } else if (structuredAddress.doubleDependentLocality) {
        addressElements.push(`${premisesElement} ${structuredAddress.doubleDependentLocality}`);
        addPresentAddressElement(addressElements, structuredAddress.dependentLocality);
    } else if (structuredAddress.dependentLocality) {
        addressElements.push(`${premisesElement} ${structuredAddress.dependentLocality}`);
    } else {
        addressElements.push(premisesElement);
    }
};

/**
 * Prepend 'PO BOX' to PO Box number if it is present
 * @param poBoxNumber {string} Po Box number to format
 * @returns {string} 'PO BOX {poBoxNumber}' if poBoxNumber is present, empty string otherwise
 */
const formatPoBoxNumber = (poBoxNumber) => (poBoxNumber ? `PO BOX ${poBoxNumber.toUpperCase()}` : '');

/**
 * Add all present organisation elements (organisation name, department name and PO Box number) to the address elements
 * array.
 *
 * @param addressElements {string[]} The array of address elements to append the organisation elements to
 * @param structuredAddress {{}} The structured address being converted
 */
const addAllPresentOrganisationElements = (addressElements, structuredAddress) => {
    addPresentAddressElement(addressElements, structuredAddress.organisationName);
    addPresentAddressElement(addressElements, structuredAddress.departmentName);
    addPresentAddressElement(addressElements, formatPoBoxNumber(structuredAddress.poBoxNumber));
};

/**
 * Add all present thoroughfare and locality elements (thoroughfare name, dependent thoroughfare name, dependent
 * locality and double dependent locality) to the address elements array.
 *
 * @param addressElements {string[]} The array of address elements to append the thoroughfare and locality elements to
 * @param structuredAddress {{}} The structured address being converted
 */
const addAllPresentThoroughfareAndLocalityElements = (addressElements, structuredAddress) => {
    addPresentAddressElement(addressElements, structuredAddress.dependentThoroughfareName);
    addPresentAddressElement(addressElements, structuredAddress.thoroughfareName);
    addPresentAddressElement(addressElements, structuredAddress.doubleDependentLocality);
    addPresentAddressElement(addressElements, structuredAddress.dependentLocality);
};

/**
 * Map an array of address elements, postTown and postcode to an unstructured address.
 *
 * Also applies string formatting to the address elements (uppercase, max 45 chars and trimmed whitespace).
 *
 * @example (['line1', 'line2'], 'town', 'SA1 1AA') => {
 *     line1: 'line1',
 *     line2: 'line2',
 *     line5: 'town',
 *     postcode: 'SA1 1AA',
 * }
 * @param addressElements {string[]} Address elements to be mapped to lines 1-4 of the unstructured address
 * @param postTown {string} Post town to be mapped to line 5 of the unstructured address
 * @param postcode {string} Postcode to be mapped to postcode property of the unstructured address
 *
 * @returns {{}} Mapped unstructured address
 */
const mapAddressElementsToUnstructuredAddress = (addressElements, postTown, postcode) => {
    if (addressElements.length < 1) {
        throw new Error('Cannot convert an address without at least 1 element other than postTown and postcode.');
    }
    if (!postTown || !postcode) {
        throw new Error('Cannot convert an address without a postTown or postcode.');
    }

    const convertedUnstructuredAddress = {};

    // Map each address element in the array to a line in the unstructured address
    addressElements.forEach((addressElement) => {
        if (!convertedUnstructuredAddress.line1) {
            convertedUnstructuredAddress.line1 = addressElement;
        } else if (!convertedUnstructuredAddress.line2) {
            convertedUnstructuredAddress.line2 = addressElement;
        } else if (!convertedUnstructuredAddress.line3) {
            convertedUnstructuredAddress.line3 = addressElement;
        } else if (!convertedUnstructuredAddress.line4) {
            convertedUnstructuredAddress.line4 = addressElement;
        }
    });
    convertedUnstructuredAddress.line5 = postTown;
    convertedUnstructuredAddress.postcode = postcode;

    // Apply string formatting to each element of the unstructured address
    Object.entries(convertedUnstructuredAddress).forEach(([key, value]) => {
        if (value) {
            convertedUnstructuredAddress[key] = value.toUpperCase();
        }
    });

    return convertedUnstructuredAddress;
};

/**
 * Return true if the address element matches one of the exception to rule indicators. See link above for more details.
 *
 * @param {string} addressElement The address element to check
 * @returns {boolean} True if the address element is an exception indicator, false otherwise.
 */
const isExceptionRuleIndicator = (addressElement) =>
    areFirstAndLastCharactersNumeric(addressElement) ||
    areFirstAndPenultimateCharsNumericAndLastAlpha(addressElement) ||
    hasOnlyOneAlphabeticCharacter(addressElement);

/**
 * Check if the last word of the building name is preceded by one of the listed keywords, e.g. 'FLAT 1A'.
 *
 * @param buildingName The entire building name element of the structured address
 * @param lastWord The last word of the building name element
 * @returns {boolean} True if the last word is preceded by a keyword, false otherwise
 */
const containsKeyword = (buildingName, lastWord) => {
    const buildingNameKeywords = [
        'FLAT',
        'BACK OF',
        'BLOCK',
        'BLOCKS',
        'BUILDING',
        'MAISONETTE',
        'MAISONETTES',
        'REAR OF',
        'SHOP',
        'SHOPS',
        'STALL',
        'STALLS',
        'SUITE',
        'SUITES',
        'UNIT',
        'UNITS',
    ];

    return buildingNameKeywords.some((keyword) => {
        const regex = new RegExp(`(^|\\s)${keyword.toUpperCase()} ${lastWord.toUpperCase()}$`);
        return buildingName && regex.test(buildingName.toUpperCase());
    });
};

/**
 * Check if the building name contains a name and a number range. Return true if the last word of the building name
 * (the number range) satisfies all the following conditions:
 *  - It contains a number
 *  - It does not only contain a number between 0 and 9999 (inclusive)
 *  - It is an exception rule indicator (see isExceptionRuleIndicator above)
 *  - It is not preceded by a keyword (see containsKeyword above)
 *  - It is not a decimal (e.g. 2.1)
 *  - It is not seperated by a forward slash (e.g. A/1)
 *
 * @param buildingName The building name element of the structured address
 * @returns {boolean} True if the building name satisfies the above conditions, false otherwise
 */
const isBuildingNameNumericPartException = (buildingName) => {
    // Split string on one or more whitespace characters
    const splitBuildingName = buildingName.split(/(\s+)/);
    if (splitBuildingName.length > 1) {
        const lastWord = splitBuildingName[splitBuildingName.length - 1];

        // Check if last word contains a numeric character
        if (/\d/.test(lastWord)) {
            // Check if last word only contains numeric characters. Return false if it is between 0 and 10000
            if (/^\d+$/.test(lastWord)) {
                const number = parseInt(lastWord, 10);
                if (
                    number >= MIN_BUILDING_NAME_NUMBER_FOR_EXCEPTION &&
                    number < MAX_BUILDING_NAME_NUMBER_FOR_EXCEPTION
                ) {
                    return false;
                }
            }

            /*
            Return true if the last word is an exception indicator, unless:
                - It contains a keyword (set list of words, e.g. FLAT, which invalidate the exception)
                - It is a decimal (e.g. 1.2)
                - It is medial forward slashed string (e.g. 7/1)
             */
            return (
                isExceptionRuleIndicator(lastWord) &&
                !(
                    containsKeyword(buildingName, lastWord) ||
                    isDecimal(lastWord) ||
                    isValidMedialForwardSlashedString(lastWord)
                )
            );
        }
    }
    return false;
};

/**
 * Return all but the last token in the array of building name tokens.
 *
 * @param tokens The building name element split into individual tokens (words)
 * @returns {[]} The array of building name tokens without the last element
 */
const getNamePartOfBuildingName = (tokens) => tokens.slice(0, -1).join('').trim();

/**
 * Return the last token from the array of building name tokens.
 *
 * @param tokens The building name element split into individual tokens (words)
 * @returns {string} The last token in the building name
 */
const getNumberPartOfBuildingName = (tokens) => tokens[tokens.length - 1];

module.exports = {
    addPresentAddressElement,
    addThoroughfareAndLocalityElementsWithPremisesPrefix,
    addAllPresentOrganisationElements,
    addAllPresentThoroughfareAndLocalityElements,
    mapAddressElementsToUnstructuredAddress,
    isExceptionRuleIndicator,
    containsKeyword,
    isBuildingNameNumericPartException,
    getNamePartOfBuildingName,
    getNumberPartOfBuildingName,
};
