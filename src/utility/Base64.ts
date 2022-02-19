/* eslint-disable no-underscore-dangle,no-bitwise */

export interface IBase64 {
    encode: (input: string) => string;
    decode: (input: string) => string;
}

/**
 * Pseudo class implementing base64 encoding and decoding -- avoiding atob() and btoa() and their problems
 * @link https://stackoverflow.com/a/6740027/4323201
 * @type {IBase64}
 */
const Base64 = (): IBase64 => {
    const _keyString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /**
     * UTF-8 encoding
     * @param {string} input The string to encode
     * @returns {string} The encoded string
     */
    const _utf8_encode = (input: string) => {
        input = input.replace(/\r\n/g, '\n');
        let utfText = '';

        for (let n = 0; n < input.length; n++) {
            const c = input.codePointAt(n) as number;

            if (c < 128) {
                utfText += String.fromCodePoint(c);
            } else if (c > 127 && c < 2048) {
                utfText += String.fromCodePoint((c >> 6) | 192);
                utfText += String.fromCodePoint((c & 63) | 128);
            } else {
                utfText += String.fromCodePoint((c >> 12) | 224);
                utfText += String.fromCodePoint(((c >> 6) & 63) | 128);
                utfText += String.fromCodePoint((c & 63) | 128);
            }
        }
        return utfText;
    };

    /**
     * UTF-8 decoding
     * @param {string} utfText The encoded string
     * @returns {string} The decoded string
     */
    const _utf8_decode = (utfText: string) => {
        let output = '';
        let index = 0;
        let c;
        let c2;
        let c3;

        while (index < utfText.length) {
            c = utfText.codePointAt(index) as number;

            if (c < 128) {
                output += String.fromCodePoint(c);
                index++;
            } else if (c > 191 && c < 224) {
                c2 = utfText.codePointAt(index + 1) as number;
                output += String.fromCodePoint(((c & 31) << 6) | (c2 & 63));
                index += 2;
            } else {
                c2 = utfText.codePointAt(index + 1) as number;
                c3 = utfText.codePointAt(index + 2) as number;
                output += String.fromCodePoint(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                index += 3;
            }
        }
        return output;
    };

    return {
        /**
         * Base64 encoding
         * @param {string} input The string to encode
         * @returns {string} The encoded string
         */
        encode: (input: string) => {
            let output = '';
            let chr1;
            let chr2;
            let chr3;
            let enc1;
            let enc2;
            let enc3;
            let enc4;
            let index = 0;

            input = _utf8_encode(input);

            while (index < input.length) {
                chr1 = input.codePointAt(index++) as number;
                chr2 = input.codePointAt(index++) as number;
                chr3 = input.codePointAt(index++) as number;

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (Number.isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (Number.isNaN(chr3)) {
                    enc4 = 64;
                }

                output =
                    output +
                    _keyString.charAt(enc1) +
                    _keyString.charAt(enc2) +
                    _keyString.charAt(enc3) +
                    _keyString.charAt(enc4);
            }
            return output;
        },

        /**
         * Base64 decoding
         * @param {string} input The encoded string
         * @returns {string} The decoded string
         */
        decode: (input: string) => {
            let output = '';
            let chr1;
            let chr2;
            let chr3;
            let enc1;
            let enc2;
            let enc3;
            let enc4;
            let index = 0;

            input = input.replace(/[^A-Za-z\d+/=]/g, '');

            while (index < input.length) {
                enc1 = _keyString.indexOf(input.charAt(index++));
                enc2 = _keyString.indexOf(input.charAt(index++));
                enc3 = _keyString.indexOf(input.charAt(index++));
                enc4 = _keyString.indexOf(input.charAt(index++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCodePoint(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCodePoint(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCodePoint(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
    };
};

export default Base64;
