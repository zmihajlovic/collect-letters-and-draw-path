/**
 *
 * @param prop error as Error
 * @returns error ui
 */
export const ErrorFallback = ({ error }: { error: number }) => {
  return <p>{error.message}</p>;
};
