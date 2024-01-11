// @mui
import { RadioGroup } from "@mui/material";
//
import SvgColor from "../../svg-color";
import { useSettingsContext } from "../settings-context";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import Iconify from "../../iconify";

// ----------------------------------------------------------------------

const OPTIONS = ["default", "bold"];

export default function ContrastOptions() {
	const { themeContrast, onChangeContrast } = useSettingsContext();

	return (
		<RadioGroup
			name="themeContrast"
			value={themeContrast}
			onChange={onChangeContrast}
		>
			<StyledWrap>
				{OPTIONS.map((contrast) => (
					<StyledCard
						key={contrast}
						selected={themeContrast === contrast}
					>
						{contrast === "bold" ? (
							<Iconify icon="ion:contrast-sharp" width={40} />
						) : (
							<Iconify
								icon="icon-park-solid:contrast-view-circle"
								width={40}
							/>
						)}
						<SvgColor
							src={`/assets/icons/setting/${
								contrast === "bold"
									? "ic_contrast_bold"
									: "ic_contrast"
							}.svg`}
						/>

						<MaskControl value={contrast} />
					</StyledCard>
				))}
			</StyledWrap>
		</RadioGroup>
	);
}
