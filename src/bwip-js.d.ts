declare module "bwip-js" {
    export function toCanvas(canvasId: string, options: {bcid: string, text: string, scale: number, height: number, includetext: boolean, textxalign?: string}): HTMLCanvasElement;
}
