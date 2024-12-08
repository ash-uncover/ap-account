export const read = function (data: string[]) {
  let lineLength = 0;
  return data.map(
    (line: string) => {
      const lineData = line.split(';')
      if (lineLength && lineData.length > lineLength) {
        console.warn('Line is too long')
      }
      return lineData
    }
  )
}