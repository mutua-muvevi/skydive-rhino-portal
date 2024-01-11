//
import { InputSelectIcon } from "./custom-icons";

// ----------------------------------------------------------------------

export default function Select() {
	return {
		MuiSelect: {
			defaultProps: {
				IconComponent: InputSelectIcon,
			},
		},
	};
}
