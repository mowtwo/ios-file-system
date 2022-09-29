import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentArea,
  dictList as _dictList,
  pathStack,
  showFinder,
} from "../data/global";
import {
  cssFinder,
  cssFinderHeader,
  cssFinderList,
  cssFinderMask,
  finderHeaderHeight,
} from "./Finder.css";
import FadeInOut from "../components/FadeInOut";
import { AddItem, MoreTwo, SolidStateDisk } from "@icon-park/react";
import { fileSystemToolColor, fileSystemToolSize } from "./FileSystem.css";
import MacScrollbar from "../components/MacScrollbar";
import { useState } from "react";
import { UIEventHandler } from "react";
import { offset, useFloating } from "@floating-ui/react-dom";
import MacMenu, { MacMenuItem } from "../components/MacMenu";
import { useClickAway } from "ahooks";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const FinderHeader = (props: { shadow?: boolean }) => {
  const [dictList, setDictList] = useAtom(_dictList);

  const {
    reference,
    floating,
    x = 0,
    y = 0,
    strategy = "absolute",
  } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset({
        crossAxis: 10,
        mainAxis: 10,
      }),
    ],
  });

  const [showMenu, setShowMenu] = useState(false);

  const floatRef = useRef<HTMLElement>();

  useClickAway(() => {
    setShowMenu(false);
  }, floatRef);

  const handleSelectNewDict = async (oldList: FileSystemDirectoryHandle[]) => {
    try {
      const dict = await showDirectoryPicker();
      let canPush = true;
      for (const item of dictList) {
        if (await item.isSameEntry(dict)) {
          canPush = false;
          break;
        }
      }
      if (canPush) {
        setDictList((list) => [...list, dict]);
      }
    } catch (e) {
      console.log("select exception:", e);
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <div css={cssFinderHeader} className={props.shadow ? "shadow" : ""}>
      <div className="title">浏览</div>
      <div className="tools">
        <span
          className="tool"
          ref={reference}
          onClick={() => {
            setShowMenu(true);
          }}
        >
          <MoreTwo
            size={fileSystemToolSize}
            fill={fileSystemToolColor}
            title="新建文件夹"
            style={{
              opacity: showMenu ? 0.4 : 1,
            }}
            data-tap-active
          />
        </span>
      </div>
      <FadeInOut show={showMenu}>
        <MacMenu
          ref={(el) => {
            floating(el);
            floatRef.current = el!;
          }}
          style={{
            top: y!,
            left: x!,
            position: strategy!,
          }}
        >
          <MacMenuItem
            icon={<AddItem></AddItem>}
            onClick={() => handleSelectNewDict(dictList)}
          >
            添加存储单元
          </MacMenuItem>
        </MacMenu>
      </FadeInOut>
    </div>
  );
};

const FinderList = () => {
  const dictList = useAtomValue(_dictList);
  const activeArea = useAtomValue(currentArea);
  const setPathStack = useSetAtom(pathStack);

  return (
    <div css={cssFinderList}>
      <div className="group">
        <div className="name">位置</div>
        <div className="areas">
          {dictList.map((item) => {
            const active = item.name === activeArea?.name;
            return (
              <div
                className={`item ${active ? "active" : ""}`}
                key={item.name}
                onClick={() => {
                  setPathStack([item]);
                }}
                title={item.name}
                data-tap-active
              >
                <div className="icon">
                  <SolidStateDisk
                    size={24}
                    fill={active ? "#fff" : fileSystemToolColor}
                    className="default"
                  />
                </div>
                <div className="name">{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Finder = () => {
  const [display, setDisplay] = useAtom(showFinder);
  const animDuration = 400;
  const [topShadow, setTopShadow] = useState(false);
  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.scrollTop > 0) {
      setTopShadow(true);
    } else {
      setTopShadow(false);
    }
  };
  return (
    <>
      <FadeInOut show={display} style={{ zIndex: 9 }} duration={animDuration}>
        <div
          css={cssFinderMask}
          onClick={() => {
            setDisplay(false);
          }}
        ></div>
      </FadeInOut>
      <div
        css={cssFinder}
        style={{
          left: display ? "0" : "-100%",
          transition: `left ${animDuration}ms`,
        }}
      >
        <FinderHeader shadow={topShadow}></FinderHeader>
        <MacScrollbar
          onScroll={handleScroll}
          className="body"
          scrollYTrackStyle={({ viewport }) => {
            const height = viewport - finderHeaderHeight;
            const top = finderHeaderHeight;
            return {
              height,
              top,
            };
          }}
          scrollYThumbStyle={({ originOffset, content, viewport }) => {
            const height = (viewport - finderHeaderHeight) ** 2 / content;
            const top =
              originOffset * ((viewport - finderHeaderHeight) / content);
            return {
              height: isNaN(height) ? 0 : isFinite(height) ? height : 0,
              top: isNaN(top) ? 0 : isFinite(top) ? top : 0,
            };
          }}
        >
          <FinderList></FinderList>
        </MacScrollbar>
      </div>
    </>
  );
};

export default Finder;
