const {
    convertRule1StructuredToUnstructured,
    convertRule2StructuredToUnstructured,
    convertRule3StructuredToUnstructured,
    convertRule4StructuredToUnstructured,
    convertRule5StructuredToUnstructured,
    convertRule6StructuredToUnstructured,
    convertRule7StructuredToUnstructured,
} = require('../ruleConversions');
const {
    structuredAddressTemplate,
    line5AndPostcode,
    postTownAndPostcode,
    exceptionRuleElements,
    numericPartExceptionElements,
} = require('./fixtures');

describe('convertRule1StructuredToUnstructured', () => {
    it('maps organisation name to line 1 if present', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule1StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('maps department name to line 2 if present (with organisation name)', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule1StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.departmentName,
            line3: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('maps PO Box number to line 1 if there is no organisation or department name, with "PO BOX" prefix', () => {
        // Given
        const structuredAddress = {
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule1StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `PO BOX ${structuredAddressTemplate.poBoxNumber}`,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('maps PO Box to line 3 if there is an organisation name and a department name, with "PO BOX prefix"', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule1StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.departmentName,
            line3: `PO BOX ${structuredAddressTemplate.poBoxNumber}`,
            line4: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('ignores additional fields if there are more than 4 lines to map', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule1StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.departmentName,
            line3: `PO BOX ${structuredAddressTemplate.poBoxNumber}`,
            line4: structuredAddressTemplate.dependentThoroughfareName,
            ...line5AndPostcode,
        });
    });
});

describe('convertRule2StructuredToUnstructured', () => {
    it('maps the building number to the beginning of the first thoroughfare line', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule2StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('maps the building number to the beginning of the first locality line', () => {
        // Given
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule2StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.doubleDependentLocality}`,
            line2: structuredAddressTemplate.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('maps the building number to its own line if there are no thoroughfare or locality elements', () => {
        // Given
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule2StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingNumber,
            ...line5AndPostcode,
        });
    });

    it('ignores additional fields if there are more than 4 lines to map', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule2StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.dependentThoroughfareName}`,
            line3: structuredAddressTemplate.thoroughfareName,
            line4: structuredAddressTemplate.doubleDependentLocality,
            ...line5AndPostcode,
        });
    });
});

describe('convertRule3StructuredToUnstructured', () => {
    it('prepends building name to the first thoroughfare line if first and last characters are numeric', () => {
        // Given
        const structuredAddress = {
            buildingName: exceptionRuleElements.firstLastNumeric,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('prepends building name to the first thoroughfare line if first/penultimate chars numeric - last alpha', () => {
        // Given
        const structuredAddress = {
            buildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1:
                `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ` +
                `${structuredAddressTemplate.thoroughfareName}`,
            line2: structuredAddressTemplate.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('prepends building name to the first thoroughfare line if it has only one alphabetic character', () => {
        // Given
        const structuredAddress = {
            buildingName: exceptionRuleElements.oneAlphabeticCharacter,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1:
                `${exceptionRuleElements.oneAlphabeticCharacter} ` +
                `${structuredAddressTemplate.dependentThoroughfareName}`,
            line2: structuredAddressTemplate.thoroughfareName,
            line3: structuredAddressTemplate.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('maps building name to line 1 if it does not have a number part', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('splits the building name if it has a numeric part which has first and last numeric characters', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${exceptionRuleElements.firstLastNumeric}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingName,
            line2: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('splits the building name if it has a numeric part with first/penultimate numeric characters last alpha', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${exceptionRuleElements.firstPenultimateNumericLastAlpha}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingName,
            line2: `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('does not split the building name if it has a numeric part preceded by a keyword', () => {
        // Given
        const buildingName = `${numericPartExceptionElements.keyword} ${exceptionRuleElements.firstLastNumeric}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: buildingName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('does not split the building name if it has a numeric part which is a decimal', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${numericPartExceptionElements.decimalNumber}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: buildingName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('does not split the building name if it has a numeric part which has a medial forward slash', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${numericPartExceptionElements.medialForwardSlashedNumber}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: buildingName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('does not split the building name if it has a numeric part which is a number between 0 and 10000', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${numericPartExceptionElements.numberBelowThreshold}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: buildingName,
            line2: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('splits the building name if it has a numeric part which is a number over 9999', () => {
        // Given
        const buildingName = `${structuredAddressTemplate.buildingName} ${numericPartExceptionElements.numberAboveThreshold}`;
        const structuredAddress = {
            buildingName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingName,
            line2: `${numericPartExceptionElements.numberAboveThreshold} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('ignores additional fields if there are more than 4 lines to map', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            buildingName: structuredAddressTemplate.buildingName,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule3StructuredToUnstructured(structuredAddress);

        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.departmentName,
            line3: `PO BOX ${structuredAddressTemplate.poBoxNumber}`,
            line4: structuredAddressTemplate.buildingName,
            ...line5AndPostcode,
        });
    });
});

describe('convertRule4StructuredToUnstructured', () => {
    it('maps the building name to the line preceding the first thoroughfare line which is prefixed with building number', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule4StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.buildingName,
            line3: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('maps the building name to the line preceding the first locality line which is prefixed with building number', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule4StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.buildingName,
            line3: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.dependentLocality}`,
            ...line5AndPostcode,
        });
    });

    it('maps the building number to its own line if there are no thoroughfare or locality elements', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule4StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.buildingName,
            line2: structuredAddressTemplate.buildingNumber,
            ...line5AndPostcode,
        });
    });

    it('ignores additional fields if there are more than 4 lines to map', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedStructuredAddress = convertRule4StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedStructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2: structuredAddressTemplate.departmentName,
            line3: `PO BOX ${structuredAddressTemplate.poBoxNumber}`,
            line4: `${structuredAddressTemplate.buildingName}`,
            ...line5AndPostcode,
        });
    });
});

describe('convertRule5StructuredToUnstructured', () => {
    it('converts an address where sub building name has first and last numeric characters', () => {
        // Given
        const structuredAddress = {
            subBuildingName: exceptionRuleElements.firstLastNumeric,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1:
                `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.buildingNumber} ` +
                `${structuredAddressTemplate.thoroughfareName}`,
            line2: structuredAddressTemplate.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('converts an address where sub building name has first/penultimate characters numeric and last alphabetic', () => {
        // Given
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            subBuildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.organisationName,
            line2:
                `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ` +
                `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('converts an address where sub building name has only one alphabetic character', () => {
        // Given
        const structuredAddress = {
            subBuildingName: exceptionRuleElements.oneAlphabeticCharacter,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1:
                `${structuredAddressTemplate.buildingNumber}${exceptionRuleElements.oneAlphabeticCharacter} ` +
                `${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('converts an address where sub building name has no exception indicators', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.subBuildingName,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('maps the building number to the first locality line if there is no thoroughfare element', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.subBuildingName,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.dependentLocality}`,
            ...line5AndPostcode,
        });
    });

    it('maps the buildingNumber to its own line if there are no thoroughfare or locality elements', () => {
        // Given
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule5StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.subBuildingName,
            line2: structuredAddressTemplate.buildingNumber,
            ...line5AndPostcode,
        });
    });
});

describe('convertRule6StructuredToUnstructured', () => {
    describe('No Building name exception applied', () => {
        it('prepends sub building name to building name if it has first and last numeric characters', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstLastNumeric,
                buildingName: structuredAddressTemplate.buildingName,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.buildingName}`,
                line2: structuredAddressTemplate.thoroughfareName,
                ...line5AndPostcode,
            });
        });

        it('prepends sub building name to building name if it has first/penultimate numeric and last alpha chars', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
                buildingName: structuredAddressTemplate.buildingName,
                dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
                dependentLocality: structuredAddressTemplate.dependentLocality,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ${structuredAddressTemplate.buildingName}`,
                line2: structuredAddressTemplate.dependentThoroughfareName,
                line3: structuredAddressTemplate.dependentLocality,
                ...line5AndPostcode,
            });
        });

        it('prepends sub building name to building name if it has only one alphabetic character', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.oneAlphabeticCharacter,
                buildingName: structuredAddressTemplate.buildingName,
                doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.oneAlphabeticCharacter} ${structuredAddressTemplate.buildingName}`,
                line2: structuredAddressTemplate.doubleDependentLocality,
                ...line5AndPostcode,
            });
        });

        it('maps sub building name to line 1 if there is no exception rule indicator', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: structuredAddressTemplate.buildingName,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                dependentLocality: structuredAddressTemplate.dependentLocality,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: structuredAddressTemplate.buildingName,
                line3: structuredAddressTemplate.thoroughfareName,
                line4: structuredAddressTemplate.dependentLocality,
                ...line5AndPostcode,
            });
        });
    });

    describe('Building name has an exception rule indicator', () => {
        it('prepends building name to the first thoroughfare line if first and last characters are numeric', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.firstLastNumeric,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('prepends building name to the first thoroughfare line if first/penultimate chars numeric last alpha', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2:
                    `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ` +
                    `${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('prepends building name the first thoroughfare line if it has one alphabetic character', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.oneAlphabeticCharacter,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: `${exceptionRuleElements.oneAlphabeticCharacter} ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('maps sub building name to its own line even if it has an exception rule indicator', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstLastNumeric,
                buildingName: exceptionRuleElements.oneAlphabeticCharacter,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: exceptionRuleElements.firstLastNumeric,
                line2: `${exceptionRuleElements.oneAlphabeticCharacter} ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('prepends building name to the first locality line if there are no thoroughfare elements', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.firstLastNumeric,
                dependentLocality: structuredAddressTemplate.dependentLocality,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.dependentLocality}`,
                ...line5AndPostcode,
            });
        });

        it('maps building name to its own line if there are no thoroughfare or locality elements', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.firstLastNumeric,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: exceptionRuleElements.firstLastNumeric,
                ...line5AndPostcode,
            });
        });
    });

    describe('Building name with numeric part exception (i): First and last characters numeric', () => {
        it('prepends sub building name to name part of building name if first and last chars numeric', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstLastNumeric,
                buildingName: `${structuredAddressTemplate.buildingName} 12-14`,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.buildingName}`,
                line2: `12-14 ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('prepends sub building name to name part of building name if first/penultimate numeric last alpha', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
                buildingName: `${structuredAddressTemplate.buildingName} ${exceptionRuleElements.firstLastNumeric}`,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ${structuredAddressTemplate.buildingName}`,
                line2: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('maps sub building name to line 1 if there is no exception rule indicator', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName: exceptionRuleElements.firstLastNumeric,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });
    });

    describe('Building name with numeric part exception (ii): First/Penultimate chars numeric and last alpha', () => {
        it('prepends sub building name to name part of building name if first and last chars numeric', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstLastNumeric,
                buildingName:
                    `${structuredAddressTemplate.buildingName} ` +
                    `${exceptionRuleElements.firstPenultimateNumericLastAlpha}`,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstLastNumeric} ${structuredAddressTemplate.buildingName}`,
                line2:
                    `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ` +
                    `${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('prepends sub building name to name part of building name if first/penultimate numeric last alpha', () => {
            // Given
            const structuredAddress = {
                subBuildingName: exceptionRuleElements.firstPenultimateNumericLastAlpha,
                buildingName: `${structuredAddressTemplate.buildingName} 20A`,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ${structuredAddressTemplate.buildingName}`,
                line2: `20A ${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });

        it('maps sub building name to line 1 if there is no exception rule indicator', () => {
            // Given
            const structuredAddress = {
                subBuildingName: structuredAddressTemplate.subBuildingName,
                buildingName:
                    `${structuredAddressTemplate.buildingName} ` +
                    `${exceptionRuleElements.firstPenultimateNumericLastAlpha}`,
                thoroughfareName: structuredAddressTemplate.thoroughfareName,
                ...postTownAndPostcode,
            };

            // When
            const convertedUnstructuredAddress = convertRule6StructuredToUnstructured(structuredAddress);

            // Then
            expect(convertedUnstructuredAddress).toEqual({
                line1: structuredAddressTemplate.subBuildingName,
                line2: structuredAddressTemplate.buildingName,
                line3:
                    `${exceptionRuleElements.firstPenultimateNumericLastAlpha} ` +
                    `${structuredAddressTemplate.thoroughfareName}`,
                ...line5AndPostcode,
            });
        });
    });
});

describe('convertRule7StructuredToUnstructured', () => {
    it('prepends the building number to the first thoroughfare line', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            dependentThoroughfareName: structuredAddressTemplate.dependentThoroughfareName,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule7StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.subBuildingName,
            line2: structuredAddressTemplate.buildingName,
            line3: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.dependentThoroughfareName}`,
            line4: structuredAddressTemplate.thoroughfareName,
            ...line5AndPostcode,
        });
    });

    it('prepends the building number to the first locality line if there is no thoroughfare element', () => {
        // Given
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            doubleDependentLocality: structuredAddressTemplate.doubleDependentLocality,
            dependentLocality: structuredAddressTemplate.dependentLocality,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule7StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: structuredAddressTemplate.subBuildingName,
            line2: structuredAddressTemplate.buildingName,
            line3: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.doubleDependentLocality}`,
            line4: structuredAddressTemplate.dependentLocality,
            ...line5AndPostcode,
        });
    });

    it('prepends the sub building name to the building name if it has first and last numeric characters', () => {
        // Given
        const structuredAddress = {
            subBuildingName: '227-331',
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule7StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `227-331 ${structuredAddressTemplate.buildingName}`,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('prepends the sub building name to the building name if it has first/penultimate numeric chars last alpha', () => {
        // Given
        const structuredAddress = {
            subBuildingName: '2-2A',
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule7StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `2-2A ${structuredAddressTemplate.buildingName}`,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });

    it('prepends the sub building name to the building name if it has only one alphabetic character', () => {
        // Given
        const structuredAddress = {
            subBuildingName: 'A',
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            thoroughfareName: structuredAddressTemplate.thoroughfareName,
            ...postTownAndPostcode,
        };

        // When
        const convertedUnstructuredAddress = convertRule7StructuredToUnstructured(structuredAddress);

        // Then
        expect(convertedUnstructuredAddress).toEqual({
            line1: `A ${structuredAddressTemplate.buildingName}`,
            line2: `${structuredAddressTemplate.buildingNumber} ${structuredAddressTemplate.thoroughfareName}`,
            ...line5AndPostcode,
        });
    });
});
