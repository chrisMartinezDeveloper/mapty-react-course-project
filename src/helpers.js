export const validInputs = function (formData) {
  return formData.every((input) => {
    return Number.isFinite(input) && input >= 0;
  });
};
