import { vi, expect, it, describe } from "vitest";
import { getStartPosition } from "../utils/getStartPosition";
import * as CharactersMap from "../charactersMap";

// getStartPosition function tests
describe("getStartPosition function tests", () => {
  it("should return correct start position", () => {
    const mockCharactersMap = [
      ["#", "#", "#"],
      ["#", "@", "#"],
      ["#", "x", "#"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const result = getStartPosition();

    expect(result).toEqual([1, 1]);
  });

  it("should throw an error when there are multiple START_CHARACTER", () => {
    const mockCharactersMap = [
      ["#", "@", "#"],
      ["@", "", "#"],
      ["#", "x", "#"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => getStartPosition()).toThrow("Multiple start characters.");
  });

  it("should throw an error when there is no START_CHARACTER", () => {
    const mockCharactersMap = [
      ["#", "#", "#"],
      ["#", "", "#"],
      ["#", "x", "#"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => getStartPosition()).toThrow("Missing start character.");
  });

  it("should throw an error when there is no END_CHARACTER", () => {
    const mockCharactersMap = [
      ["#", "#", "#"],
      ["#", "@", "#"],
      ["#", "", "#"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => getStartPosition()).toThrow("Missing end character.");
  });
});
