const {
    addPresentAddressElement,
    mapAddressElementsToUnstructuredAddress,
    addThoroughfareAndLocalityElementsWithPremisesPrefix,
    isExceptionRuleIndicator,
    isBuildingNameNumericPartException,
    getNamePartOfBuildingName,
    getNumberPartOfBuildingName,
    addAllPresentOrganisationElements,
    addAllPresentThoroughfareAndLocalityElements,
} = require('./ruleConversionsHelper');
const {
    hasOnlyOneAlphabeticCharacter,
    areFirstAndLastCharactersNumeric,
    areFirstAndPenultimateCharsNumericAndLastAlpha,
} = require('../stringHelper');

/*
 * The following functions are based off the Royal Mail rules for PAF address conversion. Documentation for rules can
 * be found at:
 * https://www.poweredbypaf.com/wp-content/uploads/2017/07/Latest-Programmers_guide_Edition-7-Version-6-1.pdf#page=27
 */

/**
 * Convert a structured address to an unstructured address according to Rule 1 of PAF address conversion (organisation
 * name only - see link above for more details).
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule1StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);
    addAllPresentThoroughfareAndLocalityElements(addressElements, structuredAddress);

    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 2 of PAF address (building number only -
 * see link above for more details).
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule2StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    addThoroughfareAndLocalityElementsWithPremisesPrefix(
        addressElements,
        structuredAddress,
        structuredAddress.buildingNumber
    );

    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 3 of PAF address conversion (building name
 * only - see link above for more details).
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule3StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    if (isExceptionRuleIndicator(structuredAddress.buildingName)) {
        addThoroughfareAndLocalityElementsWithPremisesPrefix(
            addressElements,
            structuredAddress,
            structuredAddress.buildingName
        );
    } else if (isBuildingNameNumericPartException(structuredAddress.buildingName)) {
        const tokens = structuredAddress.buildingName.split(/(\s+)/);
        const namePart = getNamePartOfBuildingName(tokens);
        const numberPart = getNumberPartOfBuildingName(tokens);

        addressElements.push(namePart);
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, numberPart);
    } else {
        addressElements.push(structuredAddress.buildingName);
        addAllPresentThoroughfareAndLocalityElements(addressElements, structuredAddress);
    }
    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 4 of PAF address conversion (building name
 * and building number only - see link above for more details)
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule4StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    addressElements.push(structuredAddress.buildingName);
    addThoroughfareAndLocalityElementsWithPremisesPrefix(
        addressElements,
        structuredAddress,
        structuredAddress.buildingNumber
    );

    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 5 of PAF address conversion (sub building
 * name and building number - see link above for more details)
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule5StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    if (hasOnlyOneAlphabeticCharacter(structuredAddress.subBuildingName)) {
        const subBuildingNamePrefixedWithBuildingNumber = `${structuredAddress.buildingNumber}${structuredAddress.subBuildingName}`;
        addThoroughfareAndLocalityElementsWithPremisesPrefix(
            addressElements,
            structuredAddress,
            subBuildingNamePrefixedWithBuildingNumber
        );
    } else if (
        areFirstAndLastCharactersNumeric(structuredAddress.subBuildingName) ||
        areFirstAndPenultimateCharsNumericAndLastAlpha(structuredAddress.subBuildingName)
    ) {
        const subBuildingNameBeforeBuildingNumber = `${structuredAddress.subBuildingName} ${structuredAddress.buildingNumber}`;
        addThoroughfareAndLocalityElementsWithPremisesPrefix(
            addressElements,
            structuredAddress,
            subBuildingNameBeforeBuildingNumber
        );
    } else {
        addPresentAddressElement(addressElements, structuredAddress.subBuildingName);
        addThoroughfareAndLocalityElementsWithPremisesPrefix(
            addressElements,
            structuredAddress,
            structuredAddress.buildingNumber
        );
    }
    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 6 of PAF address conversion (sub building
 * name and building name - see link above for more details)
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule6StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    if (isExceptionRuleIndicator(structuredAddress.buildingName)) {
        addressElements.push(structuredAddress.subBuildingName);
        addThoroughfareAndLocalityElementsWithPremisesPrefix(
            addressElements,
            structuredAddress,
            structuredAddress.buildingName
        );
    } else if (isBuildingNameNumericPartException(structuredAddress.buildingName)) {
        const tokens = structuredAddress.buildingName.split(/(\s+)/);
        let namePart = getNamePartOfBuildingName(tokens);

        if (isExceptionRuleIndicator(structuredAddress.subBuildingName)) {
            namePart = `${structuredAddress.subBuildingName} ${namePart}`;
        } else {
            addressElements.push(structuredAddress.subBuildingName);
        }

        addressElements.push(namePart);
        const numberPart = getNumberPartOfBuildingName(tokens);
        addThoroughfareAndLocalityElementsWithPremisesPrefix(addressElements, structuredAddress, numberPart);
    } else {
        if (isExceptionRuleIndicator(structuredAddress.subBuildingName)) {
            addressElements.push(`${structuredAddress.subBuildingName} ${structuredAddress.buildingName}`);
        } else {
            addressElements.push(structuredAddress.subBuildingName);
            addressElements.push(structuredAddress.buildingName);
        }
        addAllPresentThoroughfareAndLocalityElements(addressElements, structuredAddress);
    }

    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

/**
 * Convert a structured address to an unstructured address according to Rule 7 of PAF address conversion (sub building
 * name, building name and building number - see link above for more details)
 *
 * @param structuredAddress {{}} The structured address to be converted
 * @returns {{}} The converted unstructured address
 */
const convertRule7StructuredToUnstructured = (structuredAddress) => {
    const addressElements = [];
    addAllPresentOrganisationElements(addressElements, structuredAddress);

    if (isExceptionRuleIndicator(structuredAddress.subBuildingName)) {
        addressElements.push(`${structuredAddress.subBuildingName} ${structuredAddress.buildingName}`);
    } else {
        addressElements.push(structuredAddress.subBuildingName);
        addressElements.push(structuredAddress.buildingName);
    }
    addThoroughfareAndLocalityElementsWithPremisesPrefix(
        addressElements,
        structuredAddress,
        structuredAddress.buildingNumber
    );

    return mapAddressElementsToUnstructuredAddress(
        addressElements,
        structuredAddress.postTown,
        structuredAddress.postcode
    );
};

module.exports = {
    convertRule1StructuredToUnstructured,
    convertRule2StructuredToUnstructured,
    convertRule3StructuredToUnstructured,
    convertRule4StructuredToUnstructured,
    convertRule5StructuredToUnstructured,
    convertRule6StructuredToUnstructured,
    convertRule7StructuredToUnstructured,
};
