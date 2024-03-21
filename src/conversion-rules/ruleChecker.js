const { isNullOrEmpty, isPresent } = require('../stringHelper');

/*
 * The following functions are based off the Royal Mail rules for PAF address conversion. Documentation for rules can
 * be found at:
 * https://www.poweredbypaf.com/wp-content/uploads/2017/07/Latest-Programmers_guide_Edition-7-Version-6-1.pdf#page=27
 */

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 1: Organisation name only (no
 * building name, building number or sub building name).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 1.
 */
const isRule1 = (structuredAddress) =>
    isNullOrEmpty(structuredAddress.subBuildingName) &&
    isNullOrEmpty(structuredAddress.buildingName) &&
    isNullOrEmpty(structuredAddress.buildingNumber) &&
    isPresent(structuredAddress.organisationName || structuredAddress.departmentName || structuredAddress.poBoxNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 2:
 * Building number only (no building name, sub building name).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 2.
 */
const isRule2 = (structuredAddress) =>
    isNullOrEmpty(structuredAddress.subBuildingName) &&
    isNullOrEmpty(structuredAddress.buildingName) &&
    isPresent(structuredAddress.buildingNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 3: Building name only (no building
 * number, sub building name).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 3.
 */
const isRule3 = (structuredAddress) =>
    isNullOrEmpty(structuredAddress.subBuildingName) &&
    isPresent(structuredAddress.buildingName) &&
    isNullOrEmpty(structuredAddress.buildingNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 4: Building name and building
 * number (no sub building name).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 4.
 */
const isRule4 = (structuredAddress) =>
    isNullOrEmpty(structuredAddress.subBuildingName) &&
    isPresent(structuredAddress.buildingName) &&
    isPresent(structuredAddress.buildingNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 5: Sub building name and building
 * number (no building name).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 5.
 */
const isRule5 = (structuredAddress) =>
    isPresent(structuredAddress.subBuildingName) &&
    isNullOrEmpty(structuredAddress.buildingName) &&
    isPresent(structuredAddress.buildingNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 6: Building name and sub building
 * name (no building number).
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 6.
 */
const isRule6 = (structuredAddress) =>
    isPresent(structuredAddress.subBuildingName) &&
    isPresent(structuredAddress.buildingName) &&
    isNullOrEmpty(structuredAddress.buildingNumber);

/**
 * Check if a structured address meets the conditions for Royal Mail conversion rule 7: Building name, building number
 * and sub building name.
 *
 * @param structuredAddress The structured address to check
 * @returns {boolean} True if the structured address meets the conditions for rule 7.
 */
const isRule7 = (structuredAddress) =>
    isPresent(structuredAddress.subBuildingName) &&
    isPresent(structuredAddress.buildingName) &&
    isPresent(structuredAddress.buildingNumber);

module.exports = {
    isRule1,
    isRule2,
    isRule3,
    isRule4,
    isRule5,
    isRule6,
    isRule7,
};
