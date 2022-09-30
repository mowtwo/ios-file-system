import { atom } from "jotai";
import asyncMap from "../util/asyncMap";

export const showFinder = atom(true)


export const dictList = atom<{ handle: FileSystemDirectoryHandle, id: number }[]>([])

export const pathStack = atom<FileSystemHandle[]>([])

export const currentArea = atom((get) => {
  const stack = get(pathStack)
  if (stack.length > 0) {
    return stack[0]
  } else {
    return null
  }
})

export const currentDict = atom((get) => {
  const stack = get(pathStack)
  if (stack.length > 0) {
    return stack[stack.length - 1] as FileSystemDirectoryHandle
  } else {
    return null
  }
})

export const currentDictList = atom(async (get) => {
  const dict = get(currentDict)

  if (dict) {
    const entries = await dict.entries()
    return asyncMap(entries, ([, item]) => item)
  } else {
    return []
  }
})
