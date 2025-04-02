import { vi, expect, it, describe } from "vitest";
import * as CharactersMap from "../charactersMap";
import { getCollectedCharacters } from "../utils/getCollectedCharacters";

// getCollectedCharacters function tests
describe("getCollectedCharacters function tests", () => {
  it("should throw an error if next character is empty string", () => {
    const mockCharactersMap = [
      ["@", "-", "-", "A", "-", "+", "", ""],
      ["", "", "", "", "", "|", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "B", "-", "x"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => {
      getCollectedCharacters();
    }).toThrowError("Broken path.");
  });

  it("should throw an error if there is no next character", () => {
    const mockCharactersMap = [
      ["", "", "", "", "x"],
      ["@", "-", "A", "-", ""],
      ["", "", "", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => {
      getCollectedCharacters();
    }).toThrowError("Broken path.");
  });

  it("should throw an error if there are invalid characters", () => {
    const mockCharactersMap = [
      ["", "", "", "", "x"],
      ["@", "-", ".", "-", "+"],
      ["", "", "", "", ""],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    expect(() => {
      getCollectedCharacters();
    }).toThrowError("Invalid character.");
  });
});
