import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------
const StyledPage = styled(Box)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	paddingRight: theme.spacing(2),
	paddingLeft: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
}));

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
	<>
		<Helmet>
			<title>{`${title} | Freelancer's workstation`}</title>
			{meta}
		</Helmet>

		<StyledPage ref={ref} {...other}>
			{children}
		</StyledPage>
	</>
));

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	meta: PropTypes.node,
};

Page.displayName = "Page";

export default Page;
