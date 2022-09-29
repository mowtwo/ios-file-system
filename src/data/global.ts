import { atom } from "jotai";

export const showFinder = atom(true)


export const dictList = atom<FileSystemDirectoryHandle[]>([])

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
