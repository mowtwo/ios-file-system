import { useAtom } from "jotai";
import { showFinder } from "../data/global";
import {
  cssFinder,
  cssFinderHeader,
  cssFinderList,
  cssFinderMask,
} from "./Finder.css";
import FadeInOut from "../components/FadeInOut";
import { MoreTwo } from "@icon-park/react";
import { fileSystemToolColor, fileSystemToolSize } from "./FileSystem.css";

const FinderHeader = () => {
  return (
    <div css={cssFinderHeader}>
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
  return <div css={cssFinderList}></div>;
};

const Finder = () => {
  const [display, setDisplay] = useAtom(showFinder);

  return (
    <>
      <FadeInOut show={display} style={{ zIndex: 9 }}>
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
        }}
      >
        <FinderHeader></FinderHeader>
        <FinderList></FinderList>
      </div>
    </>
  );
};

export default Finder;
