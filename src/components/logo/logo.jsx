import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, Link } from "@mui/material";

const logoUrl = "https://res.cloudinary.com/dqweh6zte/image/upload/v1679650180/skydive%20rhino/images/skydive_rhino_kenya_logo_trnkqy.png"
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, width, height, sx, ...other }, ref) => {

	const logo = (
		<Box
			ref={ref}
			component="div"
			sx={{
				width: width ? width : 40,
				height:  height ? height : 40,
				display: "inline-flex",
				...sx,
			}}
			{...other}
		>
			<img src={logoUrl} alt="sky dive rhino logo" style={{
				minWidth: "75px"
			}}/>

		</Box>
	);

	if (disabledLink) {
		return logo;
	}

	return (
		<Link component={RouterLink} to="/" sx={{ display: "contents" }}>
			{logo}
		</Link>
	);
});

Logo.propTypes = {
	sx: PropTypes.object,
	disabledLink: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
};

Logo.displayName = "Logo"

export default Logo;
