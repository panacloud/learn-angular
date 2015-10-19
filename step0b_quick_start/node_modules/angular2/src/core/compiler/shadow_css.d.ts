/**
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 *
 * Please make sure to keep to edits in sync with the source file.
 *
 * Source:
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 *
 * The original file level comment is reproduced below
 */
export declare class ShadowCss {
    strictStyling: boolean;
    constructor();
    shimStyle(style: string, selector: string, hostSelector?: string): string;
    shimCssText(cssText: string, selector: string, hostSelector?: string): string;
}
