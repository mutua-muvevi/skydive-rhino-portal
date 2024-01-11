import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Simplebar = ({ sx, children }) => {
	return <SimpleBar style={sx}>{children}</SimpleBar>;
};

Simplebar.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.node,
};

export default Simplebar;
