import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { getNextPosition } from "../utils/getNextPosition";
import { setDirection } from "../utils/setDirection";

const currentPosition = [1, 1];
const currentCharacter = "P";

vi.mock("../utils/setDirection", () => ({
  POSIBLE_DIRECTIONS_MAP: {
    0: [0, -1], // UP
    1: [1, 0], // RIGHT
    2: [0, 1], // DOWN
    3: [-1, 0], // LEFT
  },
  setDirection: vi.fn(),
}));

// getNextPosition function tests
describe("getNextPosition function tests", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};

    global.localStorage = {
      getItem: vi.fn((key) => localStorageMock[key] || null),
      setItem: vi.fn((key, value) => {
        localStorageMock[key] = value.toString();
      }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should calculate the next position based on up direction", () => {
    vi.mocked(localStorage.getItem).mockReturnValue("0"); // up direction

    const visitedPositions: number[][] = [];

    const result = getNextPosition(
      currentPosition,
      currentCharacter,
      visitedPositions
    );

    expect(setDirection).toHaveBeenCalledWith(
      currentPosition,
      currentCharacter,
      visitedPositions
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("direction");
    expect(result).toEqual([1, 0]);
  });

  it("should calculate the next position based on right direction", () => {
    const visitedPositions: number[][] = [[5, 6]];

    vi.mocked(localStorage.getItem).mockReturnValue("1"); // right direction

    const result = getNextPosition(
      currentPosition,
      currentCharacter,
      visitedPositions
    );

    expect(setDirection).toHaveBeenCalledWith(
      currentPosition,
      currentCharacter,
      visitedPositions
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("direction");
    expect(result).toEqual([2, 1]);
  });

  it("should calculate the next position based on down direction", () => {
    const visitedPositions: number[][] = [];

    vi.mocked(localStorage.getItem).mockReturnValue("2"); // down direction

    const result = getNextPosition(
      currentPosition,
      currentCharacter,
      visitedPositions
    );

    expect(setDirection).toHaveBeenCalledWith(
      currentPosition,
      currentCharacter,
      visitedPositions
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("direction");
    expect(result).toEqual([1, 2]);
  });

  it("should calculate the next position based on left direction", () => {
    const visitedPositions: number[][] = [];

    vi.mocked(localStorage.getItem).mockReturnValue("3"); // left direction

    const result = getNextPosition(
      currentPosition,
      currentCharacter,
      visitedPositions
    );

    expect(setDirection).toHaveBeenCalledWith(
      currentPosition,
      currentCharacter,
      visitedPositions
    );
    expect(localStorage.getItem).toHaveBeenCalledWith("direction");
    expect(result).toEqual([0, 1]);
  });
});
