import { atom } from "jotai";

export const showFinder = atom(true)

export const currentArea = atom("测试硬盘空间")

export const dictList = atom<FileSystemDirectoryHandle[]>([])

export const storageAreas = atom((get) => {
  return get(dictList).map(item => item.name)
})
