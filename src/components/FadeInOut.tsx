import { css } from "@emotion/react";
import { HtmlHTMLAttributes, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { PropsWithChildren } from "react";

export interface Props extends HtmlHTMLAttributes<HTMLElement> {
  show: boolean;
  duration?: number;
}

export const cssFadeInOut = css`
  position: relative;
`;

const FadeInOut = (props: PropsWithChildren<Props>) => {
  const { duration = 500, children, show, ...attrs } = props;
  const timer = useRef<number>();
  const [showChildren, setShowChildren] = useState(props.show);
  useEffect(() => {
    const cleanup = () => {
      clearTimeout(timer.current);
    };
    if (show) {
      cleanup();
      setShowChildren(true);
    } else {
      timer.current = setTimeout(() => {
        setShowChildren(false);
      }, duration + 10);
    }
    return cleanup;
  }, [show]);
  return (
    <span
      {...attrs}
      css={css`
        ${cssFadeInOut}
        transition: opacity ${duration}ms;
        opacity: ${show ? 1 : 0};
      `}
    >
      {showChildren ? children : null}
    </span>
  );
};

export default FadeInOut;
