import { CHARACTERS_MAP } from "../charactersMap";

export const START_CHARACTER = "@";
export const END_CHARACTER = "x";

/**
 *
 * @returns startPosition as number[]
 * @description finding position of starting character(@), check if there is start and end characters
 */
export const getStartPosition = () => {
  let startPosition: number[] | null = null;
  let endPosition: number[] | null = null;

  for (let i = 0; i < CHARACTERS_MAP.length; i++) {
    for (let j = 0; j < CHARACTERS_MAP[i].length; j++) {
      if (CHARACTERS_MAP[i][j] === START_CHARACTER) {
        if (startPosition) {
          throw new Error("Multiple start characters.");
        }
        startPosition = [i, j];
      }

      if (CHARACTERS_MAP[i][j] === END_CHARACTER) {
        endPosition = [i, j];
      }
    }
  }

  if (!startPosition) {
    throw new Error("Missing start character.");
  }

  if (!endPosition) {
    throw new Error("Missing end character.");
  }

  return startPosition;
};
