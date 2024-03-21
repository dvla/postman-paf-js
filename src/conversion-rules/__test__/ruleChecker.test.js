const { isRule1, isRule2, isRule3, isRule4, isRule5, isRule6, isRule7 } = require('../ruleChecker');
const { structuredAddressTemplate } = require('./fixtures');

describe('isRule1', () => {
    it('returns true if a structured address has an organisation name and no sub building name or building name/number', () => {
        const structuredAddress = { organisationName: structuredAddressTemplate.organisationName };
        expect(isRule1(structuredAddress)).toEqual(true);
    });

    it('returns true if a structured address has a department name and no sub building name or building name/number', () => {
        const structuredAddress = { departmentName: structuredAddressTemplate.departmentName };
        expect(isRule1(structuredAddress)).toEqual(true);
    });

    it('returns true if a structured address has a PO box number and no sub building name or building name/numbner', () => {
        const structuredAddress = { poBoxNumber: structuredAddressTemplate.poBoxNumber };
        expect(isRule1(structuredAddress)).toEqual(true);
    });

    it('returns true if a structured address has an org name, dept name and PO box num, and no (sub) building name/number', () => {
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            departmentName: structuredAddressTemplate.departmentName,
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
        };
        expect(isRule1(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has an organisation name and a building name', () => {
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingName: structuredAddressTemplate.buildingName,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a department name and a building name', () => {
        const structuredAddress = {
            departmentName: structuredAddressTemplate.departmentName,
            buildingName: structuredAddressTemplate.buildingName,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a PO box number and a building name', () => {
        const structuredAddress = {
            poBoxNumber: structuredAddressTemplate.poBoxNumber,
            buildingName: structuredAddressTemplate.buildingName,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has an organisation name and a building number', () => {
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has an organisation name and a sub building name', () => {
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has an organisation name, building name, building number and sub building name', () => {
        const structuredAddress = {
            organisationName: structuredAddressTemplate.organisationName,
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule1(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address does not contain an organisation name, department name or PO Box number', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule1(structuredAddress)).toEqual(false);
    });
});

describe('isRule2', () => {
    it('returns true if a structured address has a building number and no building name or sub building name', () => {
        const structuredAddress = { buildingNumber: structuredAddressTemplate.buildingNumber };
        expect(isRule2(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has a building number and building name', () => {
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            buildingName: structuredAddressTemplate.buildingName,
        };
        expect(isRule2(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building number and sub building name', () => {
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule2(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building number, building name and sub building name', () => {
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule2(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address does not have a building number', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule2(structuredAddress)).toEqual(false);
    });
});

describe('isRule3', () => {
    it('returns true if a structured address has a building name and no building number or sub building name', () => {
        const structuredAddress = { buildingName: structuredAddressTemplate.buildingName };
        expect(isRule3(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has a building name and a building number', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule3(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building name and a sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule3(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building name, building number and sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule3(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address does not have a building name', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule3(structuredAddress)).toEqual(false);
    });
});

describe('isRule4', () => {
    it('returns true if a structured address has a building name and building number but no sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule4(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has only a building name', () => {
        const structuredAddress = { buildingName: structuredAddressTemplate.buildingName };
        expect(isRule4(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has only a building number', () => {
        const structuredAddress = { buildingNumber: structuredAddressTemplate.buildingNumber };
        expect(isRule4(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building name, building number and sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule4(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has neither a building name or building number', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule4(structuredAddress)).toEqual(false);
    });
});

describe('isRule5', () => {
    it('returns true if a structured address has a sub building name and building number and no building name', () => {
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule5(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has only a sub building name', () => {
        const structuredAddress = { subBuildingName: structuredAddressTemplate.subBuildingName };
        expect(isRule5(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has only a building number', () => {
        const structuredAddress = { buildingNumber: structuredAddressTemplate.buildingNumber };
        expect(isRule5(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a sub building name, building number and building name', () => {
        const structuredAddress = {
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            buildingName: structuredAddressTemplate.buildingName,
        };
        expect(isRule5(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has neither a sub building name or building number', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule5(structuredAddress)).toEqual(false);
    });
});

describe('isRule6', () => {
    it('returns true if a structured address has a building name and sub building name but no building number', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule6(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address has only a building name', () => {
        const structuredAddress = { buildingName: structuredAddressTemplate.buildingName };
        expect(isRule6(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has only a sub building name', () => {
        const structuredAddress = { subBuildingName: structuredAddressTemplate.subBuildingName };
        expect(isRule6(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has a building name, sub building name and building number', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule6(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address has neither a building name or sub builing name', () => {
        const structuredAddress = { postTown: structuredAddressTemplate.postTown };
        expect(isRule6(structuredAddress)).toEqual(false);
    });
});

describe('isRule7', () => {
    it('returns true if a structured address has a building name, building number, sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule7(structuredAddress)).toEqual(true);
    });

    it('returns false if a structured address does not have a building name', () => {
        const structuredAddress = {
            buildingNumber: structuredAddressTemplate.buildingNumber,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule7(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address does not have a building number', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            subBuildingName: structuredAddressTemplate.subBuildingName,
        };
        expect(isRule7(structuredAddress)).toEqual(false);
    });

    it('returns false if a structured address does not have a sub building name', () => {
        const structuredAddress = {
            buildingName: structuredAddressTemplate.buildingName,
            buildingNumber: structuredAddressTemplate.buildingNumber,
        };
        expect(isRule7(structuredAddress)).toEqual(false);
    });
});
