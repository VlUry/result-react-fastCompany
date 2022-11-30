export default function paginate(items, pageNum, pageSize) {
  const startIndex = (pageNum - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
