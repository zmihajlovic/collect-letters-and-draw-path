/**
 *
 * @param prop error as Error
 * @returns error ui
 */
export const ErrorFallback = ({ error }) => {
  return <p>{error.message}</p>;
};
