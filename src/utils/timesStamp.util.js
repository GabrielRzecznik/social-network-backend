export const getCurrentTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};