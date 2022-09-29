import { css } from "@emotion/react";
import { forwardRef, LegacyRef } from "react";
import { HTMLAttributes, PropsWithChildren } from "react";
import { withNamespace } from "../util/class-bem";

const bem = withNamespace("mac-menu");
const itemBem = bem.block("item");

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: JSX.Element;
}

export const cssMacMenuItem = css`
  height: 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  font-weight: 400;
  color: #080a09;
  font-size: 14px;
  &:not(:last-child) {
    border-bottom: #d2d5db solid 1px;
  }
  .mac-menu__item {
    &__text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__icon {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      > * {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const MacMenuItem = forwardRef(
  (props: PropsWithChildren<ItemProps>, ref: LegacyRef<HTMLDivElement>) => {
    const { children, icon, ...attrs } = props;
    return (
      <div {...attrs} ref={ref} css={cssMacMenuItem} data-tap-active>
        <div className={itemBem("text")}>{children}</div>
        {!!icon ? <div className={itemBem("icon")}>{icon}</div> : null}
      </div>
    );
  }
);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  width?: number;
}

export const cssMacMenu = css`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 50px;
  .mac-menu {
    &__background {
      position: absolute;
      background-color: rgba(252, 252, 252, 0.96);
      filter: saturate(180%) blur(1px);
      height: 100%;
      width: 100%;
      z-index: 1;
    }
    &__wrapper {
      position: relative;
      z-index: 2;
    }
  }
`;

const MacMenu = (
  props: PropsWithChildren<Props>,
  ref: LegacyRef<HTMLDivElement>
) => {
  const { children, width = 250, ...attrs } = props;
  return (
    <div
      {...attrs}
      css={css`
        ${cssMacMenu}
        width: ${width}px;
      `}
      ref={ref}
    >
      <div className={bem("background")}></div>
      <div className={bem("wrapper")}>{children}</div>
    </div>
  );
};

export default forwardRef(MacMenu);
