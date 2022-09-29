import { css, Global } from "@emotion/react";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
import { Suspense } from "react";
import FileArea from "./lib/FileArea";
import FileSystem from "./lib/FileSystem";
import Finder from "./lib/Finder";

const App = () => (
  <IconProvider
    value={{
      ...DEFAULT_ICON_CONFIGS,
      prefix: "fs",
    }}
  >
    <Global
      styles={css({
        "*": {
          WebkitTapHighlightColor: "transparent",
        },
        "[data-tap-active]": {
          transition: "opacity .1s",
          userSelect: "none",
          cursor: "pointer",
          "&:active": {
            opacity: 0.6,
          },
        },
      })}
    />
    <FileSystem>
      <Suspense fallback={"Loading"}>
        <FileArea></FileArea>
      </Suspense>
    </FileSystem>
    <Finder></Finder>
  </IconProvider>
);

export default App;
