import { css } from "@emotion/react";
import { LegacyRef, UIEventHandler } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { CSSProperties } from "react";
import { useCallback } from "react";
import { forwardRef } from "react";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";
import { withNamespace } from "../util/class-bem";

export interface ScrollValue {
	viewport: number;
	content: number;
	thumb: number;
	position: number;
	show: boolean;
	originOffset: number;
}

export type ComputedScrollStyle = (scrollValue: ScrollValue) => CSSProperties;

export const noopCompuetdScrollStyle = (_: ScrollValue) =>
	({} as CSSProperties);

export interface Props extends HtmlHTMLAttributes<HTMLElement> {
	scrollXTrackStyle?: ComputedScrollStyle;
	scrollXThumbStyle?: ComputedScrollStyle;
	scrollYTrackStyle?: ComputedScrollStyle;
	scrollYThumbStyle?: ComputedScrollStyle;
	thumbDuration?: number;
}

const bem = withNamespace("mac-scrollbar");

const classTrack = ".mac-scrollbar__track";

export const cssScrollbar = css`
	position: relative;
	overflow: hidden;
	.mac-scrollbar {
		&__wrapper {
			overflow-y: scroll;
			height: 100%;
			::-webkit-scrollbar {
				display: none;
			}
		}
		&__track {
			&__x,
			&__y {
				position: absolute;
			}
			&__x {
				bottom: 0;
				left: 0;
				width: 100%;
				padding: 2px 0;
				${classTrack}__panel {
					height: 6px;
				}
				${classTrack}__thumb {
					height: 100%;
					width: 20px;
				}
			}
			&__y {
				top: 0;
				right: 0;
				height: 100%;
				padding: 0 2px;
				${classTrack}__panel {
					width: 6px;
					height: 100%;
				}
				${classTrack}__thumb {
					width: 100%;
					height: 20px;
				}
			}
			&__panel {
				position: relative;
			}
			&__thumb {
				position: absolute;
				background: #999999;
				border-radius: 999vmax;
				transition: opacity 0.5s;
			}
		}
	}
`;

const Scrollbar = (
	props: PropsWithChildren<Props>,
	ref: LegacyRef<HTMLDivElement>
) => {
	const {
		scrollXThumbStyle = noopCompuetdScrollStyle,
		scrollXTrackStyle = noopCompuetdScrollStyle,
		scrollYThumbStyle = noopCompuetdScrollStyle,
		scrollYTrackStyle = noopCompuetdScrollStyle,
		children,
		thumbDuration = 800,
		...attrs
	} = props;

	const [scrollX, setScrollX] = useState<ScrollValue>({
		viewport: 0,
		content: 0,
		thumb: 0,
		position: 0,
		show: false,
		originOffset: 0,
	});

	const [scrollY, setScrollY] = useState<ScrollValue>({
		viewport: 0,
		content: 0,
		thumb: 0,
		position: 0,
		show: false,
		originOffset: 0,
	});

	const timer = useRef<number>();
	useEffect(() => {
		const cleanup = () => {
			clearTimeout(timer.current);
		};
		timer.current = setTimeout(() => {
			setScrollX((o) => {
				return {
					...o,
					show: false,
				};
			});
			setScrollY((o) => {
				return {
					...o,
					show: false,
				};
			});
		}, thumbDuration);
		return cleanup;
	}, [scrollX, scrollY]);

	const handleScroll = useCallback<UIEventHandler<HTMLElement>>((e) => {
		const {
			scrollTop,
			scrollLeft,
			scrollWidth,
			scrollHeight,
			clientHeight,
			clientWidth,
		} = e.currentTarget;

		setScrollX({
			viewport: clientWidth,
			content: scrollWidth,
			thumb: clientWidth ** 2 / scrollWidth,
			position: scrollLeft * (clientWidth / scrollWidth),
			show: true,
			originOffset: scrollLeft,
		});
		setScrollY({
			viewport: clientHeight,
			content: scrollHeight,
			thumb: clientHeight ** 2 / scrollHeight,
			position: scrollTop * (clientHeight / scrollHeight),
			show: true,
			originOffset: scrollTop,
		});

		props?.onScroll?.(e);
	}, []);

	return (
		<div {...attrs} css={cssScrollbar} ref={ref}>
			<div className={bem("track")}>
				<div
					className={bem.block("track")("x")}
					style={{
						width: scrollX.viewport,
						display: scrollX.content > scrollX.viewport ? "block" : "none",
						...scrollXTrackStyle(scrollX),
					}}
				>
					<div className={bem.block("track")("panel")}>
						<div
							className={bem.block("track")("thumb")}
							style={{
								left: scrollX.position,
								width: scrollX.thumb,
								...scrollXThumbStyle(scrollX),
								opacity: scrollX.show ? 1 : 0,
							}}
						></div>
					</div>
				</div>
				<div
					className={bem.block("track")("y")}
					style={{
						height: scrollY.viewport,
						display: scrollY.content > scrollY.viewport ? "block" : "none",
						...scrollYTrackStyle(scrollY),
					}}
				>
					<div className={bem.block("track")("panel")}>
						<div
							className={bem.block("track")("thumb")}
							style={{
								top: scrollY.position,
								height: scrollY.thumb,
								...scrollYThumbStyle(scrollY),
								opacity: scrollY.show ? 1 : 0,
							}}
						></div>
					</div>
				</div>
			</div>
			<div className={bem("wrapper")} onScroll={handleScroll}>
				{children}
			</div>
		</div>
	);
};

export default forwardRef(Scrollbar);
