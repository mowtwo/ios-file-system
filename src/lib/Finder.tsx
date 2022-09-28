import { useAtom } from "jotai";
import { currentArea, showFinder, storageAreas } from "../data/global";
import {
  cssFinder,
  cssFinderHeader,
  cssFinderList,
  cssFinderMask,
  finderHeaderHeight,
} from "./Finder.css";
import FadeInOut from "../components/FadeInOut";
import { MoreTwo, SolidStateDisk } from "@icon-park/react";
import { fileSystemToolColor, fileSystemToolSize } from "./FileSystem.css";
import MacScrollbar from "../components/MacScrollbar";
import { useState } from "react";
import { UIEventHandler } from "react";

const FinderHeader = (props: { shadow?: boolean }) => {
  return (
    <div css={cssFinderHeader} className={props.shadow ? "shadow" : ""}>
      <div className="title">浏览</div>
      <div className="tools">
        <MoreTwo
          size={fileSystemToolSize}
          fill={fileSystemToolColor}
          title="新建文件夹"
          data-tap-active
          className="tool"
        />
      </div>
    </div>
  );
};

const FinderList = () => {
  const [areas] = useAtom(storageAreas);
  const [activeArea, setActiveArea] = useAtom(currentArea);

  return (
    <div css={cssFinderList}>
      <div className="group">
        <div className="name">位置</div>
        <div className="areas">
          {areas.map((item) => {
            const active = item === activeArea;
            return (
              <div
                className={`item ${active ? "active" : ""}`}
                key={item}
                onClick={() => {
                  setActiveArea(item);
                }}
              >
                <div className="icon">
                  <SolidStateDisk
                    size={24}
                    fill={active ? "#fff" : fileSystemToolColor}
                    className="default"
                  />
                </div>
                <div className="name">{item}</div>
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
