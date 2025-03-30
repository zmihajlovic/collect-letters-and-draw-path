import { POSIBLE_DIRECTIONS_MAP, setDirection } from "./setDirection";

/**
 *
 * @param currentPosition as number[]
 * @param currentCharacter as string
 * @param visitedPositions as number[][]
 * @returns newPosition as number[]
 * @description returns new position of character
 */
export const getNextPosition = (
  currentPosition: number[],
  currentCharacter: string,
  visitedPositions: number[][]
) => {
  const [currentPositionX, currentPositionY] = currentPosition;

  setDirection(currentPosition, currentCharacter, visitedPositions);
  const direction = localStorage.getItem("direction");
  const nextDirection = POSIBLE_DIRECTIONS_MAP[Number(direction)];
  const [nextDirectionX, nextDirectionY] = nextDirection;

  const nextPosition = [
    currentPositionX + nextDirectionX,
    currentPositionY + nextDirectionY,
  ];

  return nextPosition;
};
