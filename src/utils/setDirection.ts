import { CHARACTERS_MAP } from "../charactersMap";
import { LETTERS_REGEX } from "./getCollectedCharacters";
import { START_CHARACTER } from "./getStartPosition";

export const POSIBLE_DIRECTIONS_MAP: Record<number, number[]> = {
  0: [-1, 0], // up
  1: [0, 1], // right
  2: [1, 0], // down
  3: [0, -1], // left
};
const OPOSITE_DIRECTIONS_MAP: Record<number, number> = {
  0: 2, // up and down
  1: 3, // right and left
  2: 0, // down and up
  3: 1, // left and right
};
export const TURN_CHARACTER = "+";

/**
 *
 * @param currentPosition as number[]
 * @param currentCharacter as string
 * @param visitedPositions as number[][]
 * @description set direction to local storage
 */
export const setDirection = (
  currentPosition: number[],
  currentCharacter: string,
  visitedPositions: number[][]
) => {
  const [currentPositionX, currentPositionY] = currentPosition;
  const posibleDirections = [];
  const storageDirection = localStorage.getItem("direction");

  for (const posibleDirection in POSIBLE_DIRECTIONS_MAP) {
    const [directionX, directionY] = POSIBLE_DIRECTIONS_MAP[posibleDirection];
    const nextPositionX = currentPositionX + directionX;
    const nextPositionY = currentPositionY + directionY;

    if (
      nextPositionX >= 0 &&
      nextPositionY >= 0 &&
      CHARACTERS_MAP[nextPositionX] &&
      CHARACTERS_MAP[nextPositionX][nextPositionY]
    ) {
      if (currentCharacter === START_CHARACTER) {
        posibleDirections.push(posibleDirection);

        if (posibleDirections.length > 1) {
          throw new Error("Multiple starting paths.");
        }

        // Set initital direction to local storage
        localStorage.setItem("direction", posibleDirection);
      }

      if (
        Number(posibleDirection) !==
        OPOSITE_DIRECTIONS_MAP[Number(storageDirection)] // Eliminate the direction from which it is coming
      ) {
        // Set direction if currentCharacter is TURN_CHARACTER
        if (currentCharacter === TURN_CHARACTER) {
          const [posibleNextDirectionX, posibleNextDirectioY] =
            POSIBLE_DIRECTIONS_MAP[Number(posibleDirection)];

          const nextPositionX = currentPositionX + posibleNextDirectionX;
          const nextPositionY = currentPositionY + posibleNextDirectioY;

          const isVisitedPosition = visitedPositions.some(
            (visitedPosition) =>
              visitedPosition[0] === nextPositionX &&
              visitedPosition[1] === nextPositionY
          );

          if (!isVisitedPosition) {
            // Set error if there is fork and if position is not visited already
            posibleDirections.push(posibleDirection);

            if (posibleDirections.length > 1) {
              if (!posibleDirections.includes(String(storageDirection))) {
                throw new Error("Fork in path.");
              }
            }

            const [nextPosibleDirection] = posibleDirections;

            if (nextPosibleDirection === storageDirection) {
              throw new Error("Fake turn.");
            }
          }
          localStorage.setItem("direction", posibleDirection);
        }

        // Turn if letter is found on turn
        if (LETTERS_REGEX.test(currentCharacter)) {
          if (
            currentPositionX === 0 ||
            currentPositionY === 0 ||
            currentPositionX === CHARACTERS_MAP.length - 1 ||
            currentPositionY === CHARACTERS_MAP[currentPositionX].length - 1
          ) {
            localStorage.setItem("direction", posibleDirection);
          }
        }
      }
    }
  }
};
