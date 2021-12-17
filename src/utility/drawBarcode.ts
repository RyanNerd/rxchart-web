import BwipJs from 'bwip-js';

/**
 * Given a barcode and an DOM element Id this will draw a barcode on the canvasId
 * @param {string} barCode The barcode string
 * @param {string} canvasId A unique ID to use (needed when multiple instances of the barcode are rendered)
 * @returns {HTMLCanvasElement} The canvas element upon which the barcode is drawn
 */
export const drawBarcode = (barCode: string, canvasId: string): HTMLCanvasElement | void => {
    try {
        if (document.getElementById(canvasId)) {
            return BwipJs.toCanvas(canvasId || 'barcodeCanvas', {
                bcid: 'code128', // Barcode type
                height: 4, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                scale: 2, // 2x scaling factor
                text: barCode, // Text to encode
                textxalign: 'center' // Always good to set this
            });
        }
    } catch (error) {
        // This is a non-critical error, so we just log it to the console.
        console.log('barcode image render error', error); // eslint-disable-line no-console
    }
};
