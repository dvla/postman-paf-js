const {
    structuredAddressTemplate,
    postTownAndPostcode,
    line5AndPostcode,
} = require('../conversion-rules/__test__/fixtures');
const { convertStructuredToUnstructured } = require('../addressConversion');

describe('convertStructuredToUnstructured', () => {
    it('converts a rule 1 structured address (organisation name only)', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.organisationName,
            line2: structuredAddress.departmentName,
            line3: `PO BOX ${structuredAddress.poBoxNumber}`,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 2 structured address (building number only)', () => {
        // Given
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `${structuredAddress.buildingNumber} ${structuredAddress.thoroughfareName}`,
            line2: structuredAddress.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 3 structured address (building name only)', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.buildingName,
            line2: structuredAddress.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 4 structured address (building name and building number only', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.buildingName,
            line2: `${structuredAddress.buildingNumber} ${structuredAddress.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 5 structured address (sub building name and building number only)', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.subBuildingName,
            line2: `${structuredAddress.buildingNumber} ${structuredAddress.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 6 structured address (sub building name and building name only', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingName: structuredAddressTemplate.buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.subBuildingName,
            line2: structuredAddress.buildingName,
            line3: structuredAddress.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('converts a rule 7 structured address (sub building name, building name and building number', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            buildingName: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.subBuildingName,
            line2: structuredAddress.buildingName,
            line3: `${structuredAddress.buildingNumber} ${structuredAddress.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('converts structuredAddress when no rules apply thoroughfareName', () => {
        // Given
        const structuredAddress = {
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('converts structuredAddress when no rules apply dependant thoroughfareName', () => {
        // Given
        const structuredAddress = {
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.dependentThoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('converts structuredAddress when no rules apply dependant doubleDependentLocality', () => {
        // Given
        const structuredAddress = {
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.doubleDependentLocality,
            ...line5AndPostcode,
        });
    });

    it('converts structuredAddress when no rules apply dependant dependentLocality', () => {
        // Given
        const structuredAddress = {
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddress.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('returns posttown and postcode correctly when only postcode and postTown supplied', () => {
        // Given
        const structuredAddress = {
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            ...line5AndPostcode,
        });
    });
});
