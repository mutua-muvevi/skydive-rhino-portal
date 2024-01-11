import { PropTypes } from "prop-types";
import { Dialog } from "@mui/material";
import MenuPopover from "../../../../components/menu-popover";


const ActionFolderModal = ({ open, onClose, file }) => {
	return (
		<MenuPopover onClose={onClose} open={open} fullWidth>
			<div>ActionFolderModal</div>
		</MenuPopover>
	);
};

ActionFolderModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	file: PropTypes.object,
};

export default ActionFolderModal;
