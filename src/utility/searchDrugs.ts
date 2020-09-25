/**
 * Returns a string of a drug that soft matches in the given drugList if found, otherwise returns a null;
 *
 * @param {string} searchText
 * @param {array<{Barcode: string, Drug: string}>} drugList
 * @returns {null | string}
 */
const searchDrugs = (searchText: string, drugList: Array<{Barcode: string, Drug: string}>) => {
    const textLen = searchText ? searchText.length : 0;
    if (textLen > 0 && drugList && drugList.length > 0) {
        let drugMatch = null;
        const c = searchText.substr(0,1);
        // Is the first character a digit? If so, search the Barcode otherwise search the Drug name
        if (c >= '0' && c <= '9') {
            drugMatch = drugList.filter(drug =>
                (drug.Barcode.substr(0, textLen).toLowerCase() === searchText.toLowerCase())
            );
        } else {
            drugMatch =
                drugList.filter(drug =>
                    (drug.Drug.substr(0, textLen).toLowerCase() === searchText.toLowerCase())
                );
        }
        if (drugMatch && drugMatch.length > 0) {
            return drugMatch[0];
        }
    }
    return null;
}

export default searchDrugs;
