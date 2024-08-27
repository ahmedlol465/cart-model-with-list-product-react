/**
 * 
 * @param {string} txt  the txt
 * @param {number} max  the max length of the txt
 * @returns sclice the text and add ...
 */

export function txtSlicer(txt: string, max: number = 50): string {
    return txt.length >= max ? `${txt.slice(0, max)}...` : txt
}