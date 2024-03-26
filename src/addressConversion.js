const { isRule1, isRule2, isRule3, isRule4, isRule5, isRule6, isRule7 } = require('./conversion-rules/ruleChecker');
const {
    convertRule1StructuredToUnstructured,
    convertRule2StructuredToUnstructured,
    convertRule3StructuredToUnstructured,
    convertRule4StructuredToUnstructured,
    convertRule5StructuredToUnstructured,
    convertRule6StructuredToUnstructured,
    convertRule7StructuredToUnstructured,
    convertNoRuleApplicableStructuredToUnstructured,
} = require('./conversion-rules/ruleConversions');

/**
 * Convert a Structured Address to an Unstructured Address. This uses the Royal Mail rules for PAF conversion
 * documentation of these rules can be found at:
 *
 * https://www.poweredbypaf.com/wp-content/uploads/2017/07/Latest-Programmers_guide_Edition-7-Version-6-1.pdf#page=27
 *
 * @param structuredAddress
 * @returns {{}}
 */
const convertStructuredToUnstructured = (structuredAddress) => {
    if (isRule1(structuredAddress)) {
        return convertRule1StructuredToUnstructured(structuredAddress);
    }
    if (isRule2(structuredAddress)) {
        return convertRule2StructuredToUnstructured(structuredAddress);
    }
    if (isRule3(structuredAddress)) {
        return convertRule3StructuredToUnstructured(structuredAddress);
    }
    if (isRule4(structuredAddress)) {
        return convertRule4StructuredToUnstructured(structuredAddress);
    }
    if (isRule5(structuredAddress)) {
        return convertRule5StructuredToUnstructured(structuredAddress);
    }
    if (isRule6(structuredAddress)) {
        return convertRule6StructuredToUnstructured(structuredAddress);
    }
    if (isRule7(structuredAddress)) {
        return convertRule7StructuredToUnstructured(structuredAddress);
    }

    return convertNoRuleApplicableStructuredToUnstructured(structuredAddress);
};

module.exports = {
    convertStructuredToUnstructured,
};
