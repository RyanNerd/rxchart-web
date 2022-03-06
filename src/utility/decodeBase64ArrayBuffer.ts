/* eslint-disable no-bitwise */

/**
 * Converts a base64 string into an ArrayBuffer
 * @link https://gist.github.com/jonleighton/958841?permalink_comment_id=2839519#gistcomment-2839519
 * @param {string} base64 The base64 encoded string
 * @returns {ArrayBuffer} The decoded string as an ArrayBuffer
 */
const decodeBase64ArrayBuffer = (base64: string) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // Use a lookup table to find the index.
    const lookup = new Uint8Array(256);
    for (let idx = 0; idx < chars.length; idx++) {
        lookup[chars.codePointAt(idx) as number] = idx;
    }

    let bufferLength = base64.length * 0.75;
    const immutableLength = base64.length;
    let index;
    let p = 0;
    let encoded1;
    let encoded2;
    let encoded3;
    let encoded4;

    if (base64.at(-1) === '=') {
        bufferLength--;
        if (base64.at(-2) === '=') {
            bufferLength--;
        }
    }

    const arraybuffer = new ArrayBuffer(bufferLength);
    const bytes = new Uint8Array(arraybuffer);

    for (index = 0; index < immutableLength; index += 4) {
        encoded1 = lookup[base64.codePointAt(index) as number];
        encoded2 = lookup[base64.codePointAt(index + 1) as number];
        encoded3 = lookup[base64.codePointAt(index + 2) as number];
        encoded4 = lookup[base64.codePointAt(index + 3) as number];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};

export default decodeBase64ArrayBuffer;
