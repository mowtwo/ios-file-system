import { css } from "@emotion/react";
import { useAtomValue, useSetAtom } from "jotai";
import { HTMLAttributes, useEffect } from "react";
import { currentDictList, currentSelected } from "../data/global";
import MacFilePng from "../assets/mac_file.png";
import MacFolderPng from "../assets/mac_folder.png";
import { useState } from "react";
import dayjs from "dayjs";
import asyncMap from "../util/asyncMap";
import prettyBytes from "pretty-bytes";
import { useCallback } from "react";
import useCurrentSelected from "../hooks/useCurrentSelected";

export interface ItemProps<T extends FileSystemHandle>
  extends HTMLAttributes<HTMLDivElement> {
  handle: T;
}

export const cssItem = css`
  width: 90px;
  height: 165px;
  user-select: none;
  &.selected {
    .icon {
      background-color: rgba(0, 0, 0, 0.14);
    }
    .info {
      .name {
        color: #fff;
        span {
          background-color: #344bde;
          filter: url("./filter.svg#goo");
        }
      }
    }
  }
  .icon {
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    img {
      width: 100%;
      height: 80px;
      object-fit: scale-down;
      object-position: center;
    }
  }
  .info {
    text-align: center;
    margin-top: 4px;
    .name {
      line-height: 20px;
      font-size: 14px;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      span {
        box-decoration-break: clone;
        padding: 0 6px;
      }
    }
    .more {
      font-size: 12px;
      color: #848484;
      line-height: 18px;
    }
  }
`;

export const cssItemFile = css`
  ${cssItem}
  .icon {
    position: relative;

    .type {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      color: #007dff;
      font-size: 15px;
    }
  }
`;

export const ItemFile = (props: ItemProps<FileSystemFileHandle>) => {
  const selected = useCurrentSelected(props.handle);

  const [info, setInfo] = useState<{
    modification?: Date;
    size: number;
  }>({
    size: 0,
  });
  const [fileIconType, setFileIconType] = useState("");
  useEffect(() => {
    const handle = props.handle;
    handle.getFile().then((file) => {
      setInfo({
        size: file.size,
        modification: new Date(file.lastModified),
      });
    });
  }, []);
  useEffect(() => {
    const nameSlice = props.handle.name.split(".");
    if (nameSlice.length > 1) {
      setFileIconType(nameSlice[nameSlice.length - 1]);
    }
  }, []);
  return (
    <div
      css={cssItemFile}
      data-tap-action
      title={props.handle.name}
      className={selected ? "selected" : ""}
    >
      <div className="icon">
        <img src={MacFilePng} alt="icon" draggable="false" />
        <div className="type">{fileIconType}</div>
      </div>
      <div className="info">
        <div className="name">
          <span>{props.handle.name}</span>
        </div>
        <div className="more">
          {info.modification ? (
            <div className="modification">
              {dayjs(info.modification).format("YYYY/MM/DD")}
            </div>
          ) : null}
          <div className="size">
            {prettyBytes(info.size, { maximumFractionDigits: 1 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const cssITemFolder = css`
  ${cssItem}
`;

export const ItemFolder = (props: ItemProps<FileSystemDirectoryHandle>) => {
  const selected = useCurrentSelected(props.handle);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    const handle = props.handle;
    asyncMap(handle.entries(), (item) => item).then(({ length }) =>
      setItemCount(length)
    );
  }, []);
  return (
    <div
      css={cssITemFolder}
      data-tap-action
      title={props.handle.name}
      className={selected ? "selected" : ""}
    >
      <div className="icon">
        <img src={MacFolderPng} alt="icon" draggable="false" />
      </div>
      <div className="info">
        <div className="name">
          <span>{props.handle.name}</span>
        </div>
        <div className="more">
          <div className="count">{itemCount}项</div>
        </div>
      </div>
    </div>
  );
};

export const cssFileArea = css`
  display: flex;
  flex-flow: row wrap;
  gap: 42px;
  box-sizing: border-box;
  padding: 0 40px;
`;

const FileArea = () => {
  const list = useAtomValue(currentDictList);
  const setCurrentSelected = useSetAtom(currentSelected);
  const handleItemClick = useCallback(
    (item: FileSystemHandle) => {
      setCurrentSelected(item);
    },
    [list]
  );
  return (
    <div css={cssFileArea}>
      {list.map((item) => {
        return (
          <div
            key={`${item.kind}-${item.name}`}
            onClick={() => handleItemClick(item)}
          >
            {item.kind === "directory" ? (
              <ItemFolder handle={item as FileSystemDirectoryHandle} />
            ) : (
              <ItemFile handle={item as FileSystemFileHandle} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FileArea;
