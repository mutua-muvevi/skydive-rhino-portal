import PropTypes from "prop-types";

import { Dialog, DialogTitle } from "@mui/material";

const ReusableDialog = ({ children, title, open, onClose, maxWidth }) => {
	return (
		<Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose}>
			{title && title.length > 0 ? <DialogTitle>{title}</DialogTitle> : null}
			{children}
		</Dialog>
	);
};

ReusableDialog.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	open: PropTypes.bool,
	onClose: PropTypes.func,
	maxWidth: PropTypes.string,
};

export default ReusableDialog;
