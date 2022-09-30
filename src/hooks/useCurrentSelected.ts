import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { currentSelected } from "../data/global";

export default function useCurrentSelected(item: FileSystemHandle) {
  const currentSelectedValue = useAtomValue(currentSelected)
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    if (!!currentSelectedValue) {
      item.isSameEntry(currentSelectedValue).then(res => {
        setSelected(res)
      })
    }
  }, [currentSelectedValue])
  return selected
}
