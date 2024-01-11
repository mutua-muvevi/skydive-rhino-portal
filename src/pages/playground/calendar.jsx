import { Container, Stack, Typography } from "@mui/material"
import ReusableCalendar from "../../components/calendar/calendar"

const CalendarPlayground = () => {
  return (
	<Container maxWidth="xl" sx={{mt: "50px"}}>
		<Stack direction="column" spacing={3}>
			<Typography variant="h4">
				Calendar Playground
			</Typography>
			<ReusableCalendar/>
		</Stack>
	</Container>
  )
}

export default CalendarPlayground