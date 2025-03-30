/**
 *
 * @param prop error as Error
 * @returns error ui
 */
export const ErrorFallback = ({ error }: { error: Error }) => {
  return <p>{error.message}</p>;
};
