import PropTypes from "prop-types";

import ThemeColorPresets from "./theme-color-presets";
import ThemeRtlLayout from "./theme-rtl-layout";
import ThemeContrast from "./theme-contract";
import SettingsDrawer from "./drawer";

const ThemeSettings = ({ children }) => {
	return (
		<ThemeColorPresets>
			<ThemeContrast>
				<ThemeRtlLayout>
					{children}
					<SettingsDrawer/>
				</ThemeRtlLayout>
			</ThemeContrast>
		</ThemeColorPresets>
	);
};

//===============================
ThemeSettings.propTypes = {
	children: PropTypes.node,
};

export default ThemeSettings;
