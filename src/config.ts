import * as radixColors from "@radix-ui/colors";
import type { Config } from "tailwindcss";

/**
 * Override Tailwind CSS color palette.
 *
 * @see https://tailwindcss.com/docs/plugins#extending-the-configuration
 */
export const config: Partial<Config> = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "black",
      white: "white",
      ...formatRadixColors(),
    },
  },
};

/**
 * Format Radix colors into Tailwind CSS format.
 *
 * @example blueDark.blue1 -> bluedark.1
 */
export function formatRadixColors() {
  const colors: Record<string, Record<string, string>> = {};

  for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
    const colorName = radixColorName.toLowerCase();
    const color: Record<string, string> = {};

    for (const [radixScale, value] of Object.entries(radixColor)) {
      const scale = radixScale.match(/\d+$/)?.[0];
      if (!scale) {
        continue;
      }
      color[scale] = value;
    }

    colors[colorName] = color;
  }

  return colors;
}
