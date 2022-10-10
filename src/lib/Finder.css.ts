import { css } from "@emotion/react";

export const finderHeaderHeight = 44

export const cssFinder = css`
  position: fixed;
  z-index: 999;
  width: 310px;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(248,248,248,.9);
  backdrop-filter: saturate(50%) blur(10px);
  transition: left .8s;
  will-change: left;
  box-shadow: #b2b2b2 1px 0  0;
  display: flex;
  flex-flow: column nowrap;
  .body {
    flex: 1;
  }
`

export const cssFinderMask = css`
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.2);
`

export const cssFinderHeader = css`
  height: ${finderHeaderHeight}px;
  /* box-shadow: #b2b2b2 0 1px 0; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  background-color: #f8f8f8;
  &.shadow {
		box-shadow: #b2b2b2 0 1px 0;
	}
  .title {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 44px;
  }
  .tools {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    .tool {
      margin-left: auto;
      margin-right: 15px;
      cursor: pointer;
    }
  }
`

export const cssFinderList = css`
  margin-top: ${finderHeaderHeight}px;
  .group {
    >.name {
      height: 40px;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .areas {
      margin: 0 6px;
      .item {
        display: flex;
        align-items: center;
        padding: 0 8px;
        height: 44px;
        border-radius: 12px;
        cursor: pointer;
        &.active {
          background-color: #087cff;
          color: #fff;
        }
        .icon {
          margin-right: 12px;
        }
        .name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
        }
      }
    }
  }
`
