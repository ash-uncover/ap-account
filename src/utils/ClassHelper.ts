export function addClass(classes: string[], classe: string) {
  if (!classes.includes(classe)) {
    return [
      ...classes,
      classe
    ]
  }
  return [
    ...classes
  ]
}

export function removeClass(classes: string[], classe: string) {
  return classes.filter((c) => c !== classe)
}

export function toggleClass(classes: string[], classe: string, include: boolean) {
  if (include) {
    return addClass(classes, classe)
  }
  return removeClass(classes, classe)
}