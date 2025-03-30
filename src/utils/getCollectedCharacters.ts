import { CHARACTERS_MAP } from "../charactersMap";
import { getNextPosition } from "./getNextPosition";
import { END_CHARACTER, getStartPosition } from "./getStartPosition";

export const LETTERS_REGEX = /[A-Z]/;
const ALLOWED_CHARACTERS_REGEX = /^[A-Z\-|+x@ ]*$/;

/**
 *
 * @returns letters as string, path as string
 * @description takes start position, move through map, collect characters and draw path
 */
export const getCollectedCharacters = () => {
  const startPosition = getStartPosition();
  let [currentPositionX, currentPositionY] = startPosition;
  const collectedFromPosition: number[][] = [];
  let letters = "";
  let path = "";
  const visitedPositions: number[][] = [];

  // Add the start position as visited
  visitedPositions.push([currentPositionX, currentPositionY]);

  for (
    let i = 0;
    CHARACTERS_MAP[currentPositionX][currentPositionY] !== END_CHARACTER;
    i++
  ) {
    const currentCharacter = CHARACTERS_MAP[currentPositionX][currentPositionY];
    const currentPosition = [currentPositionX, currentPositionY];
    const nextPosition = getNextPosition(
      currentPosition,
      currentCharacter,
      visitedPositions
    );
    const [nextPositionX, nextPositionY] = nextPosition;

    if (!currentCharacter || currentCharacter.trim() === "") {
      throw new Error("Broken path.");
    }

    if (!currentCharacter.match(ALLOWED_CHARACTERS_REGEX)) {
      throw new Error("Invalid character.");
    }

    // Add character to the path
    path += currentCharacter;

    const isCollectedFromPosition = collectedFromPosition.some(
      (collectedFromPosition) =>
        JSON.stringify(collectedFromPosition) ===
        JSON.stringify(currentPosition)
    );

    // Collect letter if it is valid and if it is not collected from this position already
    if (LETTERS_REGEX.test(currentCharacter) && !isCollectedFromPosition) {
      letters += currentCharacter;
      collectedFromPosition.push(currentPosition);
    }

    // Set new position
    currentPositionX = nextPositionX;
    currentPositionY = nextPositionY;

    // Add the new position to visited positions
    visitedPositions.push([currentPositionX, currentPositionY]);
  }

  // Add END_CHARACTER to path after end is reached
  path += END_CHARACTER;

  // Remove direction from local storage
  localStorage.removeItem("direction");

  return { letters, path };
};
