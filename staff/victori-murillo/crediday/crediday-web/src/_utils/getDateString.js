const getDateString = () => {
  let d = new Date()
  d = d.toLocaleString()

  return d
}

export default getDateString