export function sortByDateAsc(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

export function sortByDateDesc(a, b) {
  return new Date(a.createdAt) - new Date(b.createdAt);
}

export function sortByPriceAsc(a, b) {
  return Number.parseFloat(a.price) - Number.parseFloat(b.price);
}

export function sortByPriceDesc(a, b) {
  return Number.parseFloat(b.price) - Number.parseFloat(a.price);
}
