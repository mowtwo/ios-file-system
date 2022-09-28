import { PropsWithChildren } from "react";
import { AllApplication, ExpandLeft, FolderPlus } from "@icon-park/react";
import { useAtom } from "jotai";
import { fileSystemTitle } from "../data/global";
import { useState } from "react";
import {
	cssFileSystemMain,
	cssFileSystemTop,
	fileSystemToolColor,
	fileSystemToolSize,
	fileSystemTopHeight,
} from "./FileSystem.css";
import { UIEventHandler } from "react";
import MacScrollbar from "../components/MacScrollbar";

const FileSystemTop = (props: { shadow: boolean }) => {
	const [title] = useAtom(fileSystemTitle);

	return (
		<div css={cssFileSystemTop} className={props.shadow ? "shadow" : ""}>
			<div className="background"></div>
			<div className="content">
				<div className="info">
					<div className="title">{title}</div>
					<div className="tools">
						<div className="left">
							<ExpandLeft
								size={fileSystemToolSize}
								fill={fileSystemToolColor}
								title="浏览"
								data-tap-active
								className="tool"
							/>
						</div>
						<div className="right">
							<FolderPlus
								size={fileSystemToolSize}
								fill={fileSystemToolColor}
								title="新建文件夹"
								data-tap-active
								className="tool"
							/>
							<AllApplication
								size={fileSystemToolSize}
								fill={fileSystemToolColor}
								title="排列方式"
								data-tap-active
								className="tool"
							/>
							<div className="tool">选择</div>
						</div>
					</div>
				</div>
				<div className="search"></div>
			</div>
		</div>
	);
};

const FileSystem = (props: PropsWithChildren) => {
	const [topShadow, setTopShadow] = useState(false);
	const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
		if (e.currentTarget.scrollTop > 0) {
			setTopShadow(true);
		} else {
			setTopShadow(false);
		}
	};
	return (
		<div css={cssFileSystemMain}>
			<FileSystemTop shadow={topShadow}></FileSystemTop>
			<MacScrollbar
				className="body"
				onScroll={handleScroll}
				scrollYTrackStyle={({ viewport }) => {
					const height = viewport - fileSystemTopHeight;
					const top = fileSystemTopHeight;
					return {
						height,
						top,
					};
				}}
				scrollYThumbStyle={({ originOffset, content, viewport }) => {
					const height = (viewport - fileSystemTopHeight) ** 2 / content;
					const top =
						originOffset * ((viewport - fileSystemTopHeight) / content);
					return {
						height: isNaN(height) ? 0 : isFinite(height) ? height : 0,
						top: isNaN(top) ? 0 : isFinite(top) ? top : 0,
					};
				}}
			>
				<div className="wrapper">{props.children}</div>
			</MacScrollbar>
		</div>
	);
};

export default FileSystem;
