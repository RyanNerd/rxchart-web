/* eslint-disable no-bitwise */

/**
 * Given an ArrayBuffer return a base64 string
 * @link https://gist.github.com/jonleighton/958841?permalink_comment_id=2839519#gistcomment-2839519
 * @param {ArrayBuffer} arrayBuffer The arrayBuffer to convert
 * @returns {string} base64 string
 */
const encodeBase64ArrayBuffer = (arrayBuffer: ArrayBuffer) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const bytes = new Uint8Array(arrayBuffer);
    let idx;
    const bytesLength = bytes.length;
    let base64 = '';

    for (idx = 0; idx < bytesLength; idx += 3) {
        base64 += chars[bytes[idx] >> 2];
        base64 += chars[((bytes[idx] & 3) << 4) | (bytes[idx + 1] >> 4)];
        base64 += chars[((bytes[idx + 1] & 15) << 2) | (bytes[idx + 2] >> 6)];
        base64 += chars[bytes[idx + 2] & 63];
    }

    if (bytesLength % 3 === 2) {
        base64 = base64.slice(0, Math.max(0, base64.length - 1)) + '=';
    } else if (bytesLength % 3 === 1) {
        base64 = base64.slice(0, Math.max(0, base64.length - 2)) + '==';
    }

    return base64;
};

export default encodeBase64ArrayBuffer;
