import { Container, Stack, Typography } from "@mui/material";
import TimelineAlternate from "../../components/timeline/timeline-alternate";
import TimelineLeft from "../../components/timeline/timeline-left";

const TimelinePlayground = () => {
	return (
		<Container maxWidth="xl">
			<Stack direction="column" spacing={3}>
				<Typography variant="h4">Timeline Playground</Typography>

				<TimelineAlternate/>
				<TimelineLeft/>
			</Stack>
		</Container>
	);
};

export default TimelinePlayground;
