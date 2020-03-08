const convertWhatsapp = number => {
  if (number) {
    return number.split(" ").join("")
  } else {
    return ""
  }
}

module.exports = convertWhatsapp