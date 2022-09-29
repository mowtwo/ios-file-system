export default async function asyncMap<T, U = T>(iter: AsyncIterableIterator<T>, fn: (i: T, index: number) => U | Promise<U>) {
  const result: U[] = []
  let i = 0
  for await (const item of iter) {
    result.push(await fn(item, i++))
  }
  return result
}
