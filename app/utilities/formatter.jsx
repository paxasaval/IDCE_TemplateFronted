const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/\s+/g, "");

const formatter = {
    normalizeText,
}

export default formatter;