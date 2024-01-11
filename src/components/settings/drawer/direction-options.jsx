// @mui
import { RadioGroup } from "@mui/material";
//
import { useSettingsContext } from "../settings-context";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import Iconify from "../../iconify";

// ----------------------------------------------------------------------

const OPTIONS = ["ltr", "rtl"];

export default function DirectionOptions() {
	const { themeDirection, onChangeDirection } = useSettingsContext();

	return (
		<RadioGroup
			name="themeDirection"
			value={themeDirection}
			onChange={onChangeDirection}
		>
			<StyledWrap>
				{OPTIONS.map((direction) => (
					<StyledCard
						key={direction}
						selected={themeDirection === direction}
					>
						{direction === "rtl" ? (
							<Iconify
								icon="fluent:arrow-export-rtl-16-filled"
								width={40}
							/>
						) : (
							<Iconify
								icon="fluent:arrow-export-ltr-16-filled"
								width={40}
							/>
						)}

						<MaskControl value={direction} />
					</StyledCard>
				))}
			</StyledWrap>
		</RadioGroup>
	);
}
