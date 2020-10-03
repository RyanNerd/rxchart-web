import BwipJs from "bwip-js";

/**
 * Given a barcode and an DOM element Id this will draw a barcode on the canvasId
 * @param {string} barCode
 * @param {string} canvasId
 */
export const drawBarcode = (barCode: string, canvasId: string): HTMLCanvasElement | void => {
    try {
        const canvas = BwipJs.toCanvas(canvasId || 'barcodeCanvas', {
            bcid: 'code128',     // Barcode type
            text: barCode,       // Text to encode
            scale: 2,            // 2x scaling factor
            height: 4,           // Bar height, in millimeters
            includetext: true,   // Show human-readable text
            textxalign: 'center' // Always good to set this
        });
        return canvas;
    } catch (e) {
        console.log('barcode image render error', e);
    }
}