import { getCollectedCharacters } from "./utils/getCollectedCharacters";

/**
 *
 * @returns ui of letters and path
 * @description represents whole ui
 */
export const App = () => {
  const { letters, path } = getCollectedCharacters();

  return (
    <>
      <div>Letters: {letters}</div>
      <div>Path: {path}</div>
    </>
  );
};
