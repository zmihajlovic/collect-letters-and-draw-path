import { render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { App } from "../App";
import { getCollectedCharacters } from "../utils/getCollectedCharacters";
import * as CharactersMap from "../charactersMap";

// App component tests
describe("App component tests", () => {
  it("renders letters and path from getCollectedCharacters", () => {
    const { letters, path } = getCollectedCharacters();

    render(<App />);

    // Check if letters and path are rendered correctly
    expect(screen.getByText(`Letters: ${letters}`)).toBeInTheDocument();
    expect(screen.getByText(`Path: ${path}`)).toBeInTheDocument();
  });

  it("should go straight through intersections", () => {
    const mockCharactersMap = [
      ["@", "", "", "", "", "", "", "", "", ""],
      ["|", "", "+", "-", "C", "-", "-", "+", "", ""],
      ["A", "", "|", "", "", "", "", "|", "", ""],
      ["+", "-", "-", "-", "B", "-", "-", "+", "", ""],
      ["", "", "|", "", "", "", "", "", "", "x"],
      ["", "", "|", "", "", "", "", "", "", "|"],
      ["", "", "+", "-", "-", "-", "D", "-", "-", "+"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const { letters, path } = getCollectedCharacters();

    expect(letters).toBe("ABCD");
    expect(path).toBe("@|A+---B--+|+--C-+|-||+---D--+|x");
  });

  it("should turn if letter is on turn", () => {
    const mockCharactersMap = [
      ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
      ["", "", "", "", "", "", "", "", "|"],
      ["x", "-", "B", "-", "+", "", "", "", "|"],
      ["", "", "", "", "|", "", "", "", "|"],
      ["", "", "", "", "+", "-", "-", "-", "C"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const { letters, path } = getCollectedCharacters();

    expect(letters).toBe("ACB");
    expect(path).toBe("@---A---+|||C---+|+-B-x");
  });

  it("should not collect a letter from the same location twice", () => {
    const mockCharactersMap = [
      ["", "", "", "", "+", "-", "O", "-", "N", "-", "+", "", ""],
      ["", "", "", "", "|", "", "", "", "", "", "|", "", ""],
      ["", "", "", "", "|", "", "", "", "+", "-", "I", "-", "+"],
      ["@", "-", "G", "-", "O", "-", "+", "", "|", "", "|", "", "|"],
      ["", "", "", "", "|", "", "|", "", "+", "-", "+", "", "E"],
      ["", "", "", "", "+", "-", "+", "", "", "", "", "", "S"],
      ["", "", "", "", "", "", "", "", "", "", "", "", "|"],
      ["", "", "", "", "", "", "", "", "", "", "", "", "x"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const { letters, path } = getCollectedCharacters();

    expect(letters).toBe("GOONIES");
    expect(path).toBe("@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x");
  });

  it("should ignore stuff after end of path", () => {
    const mockCharactersMap = [
      [
        "@",
        "-",
        "A",
        "-",
        "-",
        "+",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "|", "", "", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        "",
        "",
        "+",
        "-",
        "B",
        "-",
        "-",
        "x",
        "-",
        "C",
        "-",
        "-",
        "D",
        "",
      ],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const { letters, path } = getCollectedCharacters();

    expect(letters).toBe("AB");
    expect(path).toBe("@-A--+|+-B--x");
  });

  it("should keep direction, even in a compact space", () => {
    const mockCharactersMap = [
      ["", "+", "-", "L", "-", "+", "", ""],
      ["", "|", "", "", "+", "A", "-", "+"],
      ["@", "B", "+", "", "+", "+", "", "H"],
      ["", "+", "+", "", "", "", "", "x"],
    ];

    vi.spyOn(CharactersMap, "CHARACTERS_MAP", "get").mockReturnValue(
      mockCharactersMap
    );

    const { letters, path } = getCollectedCharacters();

    expect(letters).toBe("BLAH");
    expect(path).toBe("@B+++B|+-L-+A+++A-+Hx");
  });
});
