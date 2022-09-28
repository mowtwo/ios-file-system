import { css } from "@emotion/react";

export const cssFinder = css`
  position: fixed;
  z-index: 999;
  width: 310px;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #f8f8f8;
  transition: left .8s;
  will-change: left;
  box-shadow: #b2b2b2 1px 0  0;
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
  height: 44px;
  box-shadow: #b2b2b2 0 1px 0;
  position: relative;
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
      margin-right: 25px;
    }
  }
`

export const cssFinderList = css`

`
