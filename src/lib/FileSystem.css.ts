import { css } from "@emotion/react";

// const fileSystemTopHeight = 96
export const fileSystemTopHeight = 40
export const fileSystemToolColor = '#1e76d8'
export const fileSystemToolSize = 20

export const cssFileSystemTop = css`
	height: ${fileSystemTopHeight}px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	z-index: 9;
	&.shadow {
		box-shadow: #b2b2b2 0 1px 0;
		background-color: rgba(252, 252, 252, .95);
		.background{
			background-color: rgba(252, 252, 252, .95);
			filter: saturate(180%) blur(10px);
		}
	}
	.background {
		background-color: rgb(255, 255, 255);
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		display: flex;
		flex-flow: column nowrap;
		.info {
			height: 45px;
			position: relative;
			.title {
				position: relative;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				line-height: 20px;
				font-weight: 600;
			}
			.tools {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30px;
				box-sizing: border-box;
				.left,.right{
					display: flex;
					align-items: center;
				}
				.fs-icon {
					cursor: pointer;
				}
				.left {
					.tool {
						margin-right: 25px;
						color: ${fileSystemToolColor};
					}
				}
				.right {
					.tool {
						margin-left: 25px;
						color: ${fileSystemToolColor};
					}
				}
			}
		}
	}
`;

export const cssFileSystemMain = css`
	display: flex;
	flex-flow: column nowrap;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.body {
		flex: 1;
		background-color: #fff;
		.wrapper {
			margin-top: ${fileSystemTopHeight}px;
		}
	}
`
