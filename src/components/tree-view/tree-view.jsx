import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { TreeView, TreeItem, treeItemClasses } from "@mui/lab";
import Iconify from "../iconify";

// ----------------------------------------------------------------------

const StyledTreeView = styled(TreeView)({
	height: 240,
	flexGrow: 1,
	maxWidth: 400,
});

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
	({ theme }) => ({
		[`& .${treeItemClasses.iconContainer}`]: {
			"& .close": {
				opacity: 0.3,
			},
		},
		[`& .${treeItemClasses.group}`]: {
			marginLeft: 15,
			paddingLeft: 18,
			borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
		},
	})
);


function renderTreeItems(nodes) {
	return nodes.map((node) => (
		<StyledTreeItem
			nodeId={node.nodeId}
			label={node.label}
			key={node.nodeId}
		>
			{Array.isArray(node.children)
				? renderTreeItems(node.children)
				: null}
		</StyledTreeItem>
	));
}

const TreeViewComponent = ({data, multiSelect}) => {
	return (
		<StyledTreeView
			multiSelect={multiSelect}
			defaultCollapseIcon={<Iconify icon="eva:chevron-down-fill" />}
			defaultExpandIcon={<Iconify icon="eva:chevron-right-fill" />}
			defaultEndIcon={null}
		>
			{renderTreeItems(data)}
		</StyledTreeView>
	);
};

TreeViewComponent.propTypes = {
	data: PropTypes.array,
	multiSelect: PropTypes.bool
};

export default TreeViewComponent;
