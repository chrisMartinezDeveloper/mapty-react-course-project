export const validInputs = function (data) {
  let formData = [...data];
  return formData.every((inp) => Number.isFinite(inp));
};
export const allPositive = function (data) {
  let formData = [...data];
  return formData.every((inp) => inp >= 0);
};
