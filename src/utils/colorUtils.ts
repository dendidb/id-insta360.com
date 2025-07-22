/**
 * Utility functions for color detection and manipulation
 */
import ColorThief from 'color-thief-node';

/**
 * Determines if a color is light or dark
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns boolean - true if color is light, false if dark
 */
export function isLightColor(r: number, g: number, b: number): boolean {
  // Calculate relative luminance using the formula
  // Luminance = 0.299*R + 0.587*G + 0.114*B
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Consider colors with luminance > 0.5 as light
  return luminance > 0.5;
}

/**
 * Gets the dominant color from an image URL
 * @param imageUrl - URL of the image to analyze
 * @returns Promise<{isLight: boolean, color: [number, number, number]}>
 */
export async function getDominantColor(imageUrl: string): Promise<{isLight: boolean, color: [number, number, number]}> {
  try {
    // Get the dominant color using color-thief
    const dominantColor = await ColorThief.getColor(imageUrl) as [number, number, number];
    
    // Determine if the color is light or dark
    const isLight = isLightColor(dominantColor[0], dominantColor[1], dominantColor[2]);
    
    return {
      isLight,
      color: dominantColor
    };
  } catch (error) {
    console.error('Error getting dominant color:', error);
    // Default to dark if there's an error
    return {
      isLight: false,
      color: [0, 0, 0]
    };
  }
}

/**
 * Creates a CSS RGB color string from RGB values
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns string - CSS RGB color string
 */
export function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}