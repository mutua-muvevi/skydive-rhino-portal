// @mui
import { RadioGroup } from "@mui/material";
//
import { useSettingsContext } from "../settings-context";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import Iconify from "../../iconify";

// ----------------------------------------------------------------------

const OPTIONS = ["light", "dark"];

export default function ModeOptions() {
	const { themeMode, onChangeMode } = useSettingsContext();

	return (
		<RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
			<StyledWrap>
				{OPTIONS.map((mode) => (
					<StyledCard key={mode} selected={themeMode === mode}>
						{mode === "light" ? (
							<Iconify
								icon="line-md:sun-rising-filled-loop"
								width={45}
								sx={{ color: "#fb9062" }}
							/>
						) : (
							<Iconify
								icon="line-md:moon-rising-filled-loop"
								width={45}
								sx={{ color: "#ced3e0" }}
							/>
						)}

						<MaskControl value={mode} />
					</StyledCard>
				))}
			</StyledWrap>
		</RadioGroup>
	);
}
