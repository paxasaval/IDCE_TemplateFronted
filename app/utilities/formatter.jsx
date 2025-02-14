const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/\s+/g, "");

const capitalize = (fullName) => {
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return fullName
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

const formatter = {
  normalizeText,
  capitalize,
};

export default formatter;
