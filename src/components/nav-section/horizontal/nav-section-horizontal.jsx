import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { Stack } from "@mui/material";
// utils
import { hideScrollbarY } from "../../../utils/css-styles";
//
import NavList from "./nav-list";
import Scrollbar from "../../scrollbar";

// ----------------------------------------------------------------------

NavSectionHorizontalComponent.propTypes = {
	sx: PropTypes.object,
	data: PropTypes.array,
};

function NavSectionHorizontalComponent({ data, sx, ...other }) {
	return (
		<Scrollbar sx={{ pb: 0 }}>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					mx: "auto",
					...hideScrollbarY,
					...sx,
				}}
				{...other}
			>
				{data.map((group) => (
					<Items key={group.subheader} items={group.items} />
				))}
			</Stack>
		</Scrollbar>
	);
}

const NavSectionHorizontal = memo(NavSectionHorizontalComponent);

export default NavSectionHorizontal;

// ----------------------------------------------------------------------

Items.propTypes = {
	items: PropTypes.array,
};

function Items({ items }) {
	return (
		<>
			{items.map((list) => (
				<NavList
					key={list.title + list.path}
					data={list}
					depth={1}
					hasChild={!!list.children}
				/>
			))}
		</>
	);
}
