export const bodyOfLastFetchRequest = () => {
  const allCalls = (global.fetch as jest.Mock).mock.calls;
  const lastCall = allCalls[allCalls.length - 1];
  return JSON.parse(lastCall[1].body);
};
