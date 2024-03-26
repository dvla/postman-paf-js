const structuredAddressTemplate = {
    organisationName: 'BUSY BUSINESS',
    departmentName: 'DEPARTMENT OF DEFENCE AGAINST FAILED TESTS',
    poBoxNumber: '12345',
    buildingName: 'BOB',
    buildingNumber: '1',
    subBuildingName: 'FLAT 1',
    thoroughfareName: 'DRIVE-THROUGH THOROUGHFARE',
    dependentThoroughfareName: '"IT DEPENDS..." ROAD',
    dependentLocality: 'NOWHERE',
    doubleDependentLocality: 'TWICE NOWHERE IS STILL NOWHERE...',
    postTown: 'A TOWN FULL OF MAIL',
    postcode: 'AC1 2DC',
};

const structuredAddressNoPostcodeOrPosttownTemplate = {
    organisationName: 'BUSY BUSINESS',
    departmentName: 'DEPARTMENT OF DEFENCE AGAINST FAILED TESTS',
    poBoxNumber: '12345',
    buildingName: 'BOB',
    buildingNumber: '1',
    subBuildingName: 'FLAT 1',
    thoroughfareName: 'DRIVE-THROUGH THOROUGHFARE',
    dependentThoroughfareName: '"IT DEPENDS..." ROAD',
    dependentLocality: 'NOWHERE',
    doubleDependentLocality: 'TWICE NOWHERE IS STILL NOWHERE...',
    postTown: '',
    postcode: '',
};

const structuredAddressBuildingNumberAndPoBoxNumberAreNumbersTemplate = {
    poBoxNumber: 12345,
    buildingNumber: 5,
    thoroughfareName: 'DRIVE-THROUGH THOROUGHFARE',
    dependentLocality: 'NOWHERE',
    doubleDependentLocality: 'TWICE NOWHERE IS STILL NOWHERE...',
    postTown: 'A TOWN FULL OF MAIL',
    postcode: 'AC1 2DC',
};

const internationalAddressTemplate = {
    line1: 'El Quinto Pino line1',
    line2: 'El Quinto Pino line2',
    line3: 'El Quinto Pino line3',
    line4: 'El Quinto Pino line4',
    line5: 'El Quinto Pino line5',
    country: 'Spain',
};

const bfpoAddressTemplate = {
    line1: 'Test bfpo line1',
    line2: 'Test bfpo line2',
    line3: 'Test bfpo line3',
    line4: 'Test bfpo line4',
    bfpoNumber: 3,
    postcode: 'BF1 3AA',
    country: 'USA',
    language: 'EN',
};

const postTownAndPostcode = {
    postTown: structuredAddressTemplate.postTown,
    postcode: structuredAddressTemplate.postcode,
};

const line5AndPostcode = {
    line5: structuredAddressTemplate.postTown,
    postcode: structuredAddressTemplate.postcode,
};

const exceptionRuleElements = {
    firstLastNumeric: '1-1',
    firstPenultimateNumericLastAlpha: '12A',
    oneAlphabeticCharacter: 'E',
};

const numericPartExceptionElements = {
    keyword: 'UNIT',
    decimalNumber: '5.4',
    medialForwardSlashedNumber: '6/8',
    numberBelowThreshold: '28',
    numberAboveThreshold: '10000',
};

module.exports = {
    structuredAddressTemplate,
    structuredAddressNoPostcodeOrPosttownTemplate,
    structuredAddressBuildingNumberAndPoBoxNumberAreNumbersTemplate,
    internationalAddressTemplate,
    bfpoAddressTemplate,
    postTownAndPostcode,
    line5AndPostcode,
    exceptionRuleElements,
    numericPartExceptionElements,
};
