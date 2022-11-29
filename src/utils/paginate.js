export default function paginate(items, pageNum, pageSize) {
  const startIndex = (pageNum - 1) * pageSize;
  return [...Object.values(items)].splice(startIndex, pageSize);
}
