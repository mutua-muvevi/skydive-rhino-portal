import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
} from "@mui/lab";
import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import  Iconify from "../iconify";

const TIMELINES = [
	{
		key: 1,
		title: "Default",
		des: "Morbi mattis ullamcorper",
		time: "09:30 am",
		icon: <Iconify icon="eva:folder-add-fill" width={24} />,
	},
	{
		key: 2,
		title: "Primary",
		des: "Morbi mattis ullamcorper",
		time: "10:00 am",
		color: "primary",
		icon: <Iconify icon="eva:image-2-fill" width={24} />,
	},
	{
		key: 3,
		title: "Secondary",
		des: "Morbi mattis ullamcorper",
		time: "10:00 am",
		color: "secondary",
		icon: <Iconify icon="eva:pantone-fill" width={24} />,
	},
	{
		key: 4,
		title: "Info",
		des: "Morbi mattis ullamcorper",
		time: "10:30 am",
		color: "info",
		icon: <Iconify icon="eva:tv-fill" width={24} />,
	},
	{
		key: 5,
		title: "Success",
		des: "Morbi mattis ullamcorper",
		time: "11:00 am",
		color: "success",
		icon: <Iconify icon="eva:activity-fill" width={24} />,
	},
	{
		key: 6,
		title: "Warning",
		des: "Morbi mattis ullamcorper",
		time: "11:30 am",
		color: "warning",
		icon: <Iconify icon="eva:cube-fill" width={24} />,
	},
	{
		key: 7,
		title: "Error",
		des: "Morbi mattis ullamcorper",
		time: "12:00 am",
		color: "error",
		icon: <Iconify icon="eva:film-fill" width={24} />,
	},
];

const TimelineAlternate = () => {
	
	return (
		<Timeline position="alternate">
			{TIMELINES.map((item) => (
				<TimelineItem key={item.key}>
					<TimelineOppositeContent>
						<Typography
							variant="body2"
							sx={{ color: "text.secondary" }}
						>
							{item.time}
						</Typography>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot color={item.color}>
							{item.icon}
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<Paper
							sx={{
								p: 3,
								bgcolor: (theme) =>
									alpha(theme.palette.grey[500], 0.12),
							}}
						>
							<Typography variant="subtitle2">
								{item.title}
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "text.secondary" }}
							>
								{item.des}
							</Typography>
						</Paper>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
};

export default TimelineAlternate;
