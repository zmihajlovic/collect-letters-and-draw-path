import { describe, it, expect, vi, beforeEach } from "vitest";
import * as CharactersMap from "../charactersMap";
import { setDirection, TURN_CHARACTER } from "../utils/setDirection";
import { START_CHARACTER } from "../utils/getStartPosition";

// setDirection function tests
describe("setDirection function tests", () => {
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

  it("should set initial direction when current character is START_CHARACTER", () => {
    const mockCharactersMap = [
      ["@", "-", "x"],
      ["", "", ""],
      ["", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    setDirection([0, 0], START_CHARACTER, []);

    expect(localStorageMock["direction"]).toBe("1");
  });

  it("should throw an error when multiple starting paths are found", () => {
    const mockCharactersMap = [
      ["x", "-", "B", "-", "@", "-", "A", "-", "x"],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const currentPosition = [0, 4];
    const currentCharacter = START_CHARACTER;
    const visitedPositions: number[][] = [];

    expect(() => {
      setDirection(currentPosition, currentCharacter, visitedPositions);
    }).toThrowError("Multiple starting paths.");
  });

  it("should set new direction at a turn character", () => {
    const mockCharactersMap = [
      ["", "", "x"],
      ["", "", "|"],
      ["@", "-", "+"],
      ["", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const currentPosition = [2, 2];
    const currentCharacter = TURN_CHARACTER;
    const visitedPositions = [
      [2, 0],
      [2, 1],
      [2, 2],
    ];

    setDirection(currentPosition, currentCharacter, visitedPositions);

    expect(localStorage.setItem).toHaveBeenCalledWith("direction", "0");
  });

  it("should throw an error when fork is found", () => {
    const mockCharactersMap = [
      ["", "", "", "", "", "x", "-", "B"],
      ["", "", "", "", "", "", "", "|"],
      ["@", "-", "-", "A", "-", "-", "-", "+"],
      ["", "", "", "", "", "", "", "|"],
      ["", "", "x", "+", "", "", "", "C"],
      ["", "", "", "|", "", "", "", "|"],
      ["", "", "", "+", "-", "-", "-", "+"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const currentPosition = [2, 7];
    const currentCharacter = TURN_CHARACTER;
    const visitedPositions = [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
    ];

    // Get direction from local storage mock
    localStorageMock["direction"] = "1";

    expect(() =>
      setDirection(currentPosition, currentCharacter, visitedPositions)
    ).toThrowError("Fork in path.");
  });

  it("should throw an error when encountering a fake turn", () => {
    const mockCharactersMap = [
      ["@", "-", "A", "-", "+", "-", "B", "-", "x"],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const currentPosition = [0, 4]; // TURN_CHARACTER position
    const currentCharacter = TURN_CHARACTER;
    const visitedPositions = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];

    // Set direction to be the same as possible direction (fake turn)
    localStorageMock["direction"] = "1"; // Right direction

    expect(() =>
      setDirection(currentPosition, currentCharacter, visitedPositions)
    ).toThrowError("Fake turn.");
  });
});
