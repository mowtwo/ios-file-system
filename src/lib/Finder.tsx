import { useAtom } from "jotai";
import { showFinder } from "../data/global";
import { cssFinder, cssFinderMask } from "./Finder.css";
import FadeInOut from "../components/FadeInOut";

const Finder = () => {
	const [display, setDisplay] = useAtom(showFinder);

	return (
		<>
			<FadeInOut>
				<div css={cssFinderMask}></div>
			</FadeInOut>
			<div css={cssFinder}></div>
		</>
	);
};

export default Finder;
