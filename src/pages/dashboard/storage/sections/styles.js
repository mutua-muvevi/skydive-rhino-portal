import { Card, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFolder = styled(Stack)(({ theme }) => ({
	width: "100%",
	height: "100%",
	borderBottom: `1px solid ${theme.palette.divider}`,
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
	width: "100%",
	height: "100%",
	borderBottom: `1px solid ${theme.palette.divider}`,
}));
