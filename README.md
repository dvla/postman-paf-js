# postman-paf-js
Unofficial Javascript library to apply Royal Mail Rules &amp; Exceptions to PAF (Postcode Address File) addresses when converting to a printable format. 

## Address Converter

This module enables the conversion of a PAF (Postal Address File) formatted address to an unstructured printable
address, i.e. 5 lines and a postcode. The Royal Mail rules for PAF address conversion are applied here, however this
module deviates slightly from these rules to actually match what Royal Mail do as their implementation sometimes does
not match the documentation.

Based Royal Mail rules for formatting a PAF address for printing, outlined from page 27 onwards of the
[Royal Mail programmers guide](https://www.poweredbypaf.com/wp-content/uploads/2017/07/Latest-Programmers_guide_Edition-7-Version-6-1.pdf#page=27).

## Usage

Currently only one function is exported out of the module.

```javascript
const { convertStructuredToUnstructured } = require('postman-paf-js');

const structuredAddressToConvert = {
    buildingNumber: '1',
    thoroughfareName: 'Example Street',
    postTown: 'City',
    postcode: 'AA1 1AA',
};

const convertedUnstructuredAddress = convertStructuredToUnstructured(structuredAddressToConvert);
```

`convertStructuredToUnstructured` takes 1 parameter which is the structuredAddress to be converted.

Here `convertedUnstructuredAddress` would have the following structure:

```javascript
convertedUnstructuredAddress = {
    line1: '1 Example Street',
    line2: 'City',
    postcode: 'AA1 1AA',
};
```