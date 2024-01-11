import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";

const Iframe = ({ src, title, style, onLoad, onError }) => {
	const [loading, setLoading] = useState(true);

	// Handler for when the iframe has loaded
	const handleLoad = () => {
		setLoading(false);
		if (onLoad) {
			onLoad();
		}
	};

	// Handler for iframe load errors
	const handleError = (e) => {
		setLoading(false);
		if (onError) {
			onError(e);
		}
	};

	useEffect(() => {
		setLoading(true); // Reset loading state when src changes
	}, [src]);

	return (
		<Box position="relative" style={style}>
			{loading && (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					position="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					bgcolor="background.paper"
				>
					<CircularProgress />
				</Box>
			)}
			<iframe
				src={src}
				title={title}
				onLoad={handleLoad}
				onError={handleError}
				style={{ display: loading ? "none" : "block" }}
				width="100%"
				height="100%"
				frameBorder="0"
			/>
		</Box>
	);
};

Iframe.propTypes = {
	src: PropTypes.string.isRequired,
	title: PropTypes.string,
	style: PropTypes.object,
	onLoad: PropTypes.func,
	onError: PropTypes.func,
};

Iframe.defaultProps = {
	title: "iframe",
	style: {},
	onLoad: null,
	onError: null,
};

export default Iframe;
