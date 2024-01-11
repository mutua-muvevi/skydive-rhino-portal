import { CardMedia, Stack, Typography } from "@mui/material";
import { sentenceCase } from "change-case";
import PropTypes from "prop-types";
import Iframe from "../../../../components/iframe";

const Curriculum = ({ curriculum }) => {

	const {
		title,
		introDescription,
		contentBlocks,
		thumbnail,
		author: { fullname, email },
	} = curriculum;
	
  return (
	<Stack direction="column" spacing={3}>
		{/* Thumbnail */}
		<Stack direction="column" spacing={1.5}>
			<Typography variant="subtitle1" color="primary">
				Thumbnail
			</Typography>

			<CardMedia
				component="img"
				height={350}
				image={thumbnail}
				alt={title}
			/>
		</Stack>
		<Stack direction="column">
			<Typography variant="subtitle1" color="primary">
				Intro Description
			</Typography>
			<Typography variant="body2" textAlign="justify">
				{sentenceCase(introDescription)}
			</Typography>
		</Stack>

		{/* contentBlocks */}
		<Stack direction="column" spacing={3}>
			<Typography variant="subtitle1" color="primary">
				Content Blocks
			</Typography>
			{
				// Loop through the contentBlocks
				contentBlocks.map((detail) => (
					<Stack
						direction="column"
						spacing={1.5}
						key={detail._id}
						color="primary"
					>
						{
							detail.file && (
								<Iframe
									src={detail.file}
									title={detail.title}
									style={{
										width: "100%",
										height: "500px",
									}}
								/>
							)

						}
						<Typography variant="subtitle2" color="primary">
							{sentenceCase(detail.title)}
						</Typography>
						<Typography variant="body2" textAlign="justify">
							{sentenceCase(detail.details)}
						</Typography>
					</Stack>
				))
			}
		</Stack>

		{/* Author */}
		<Stack direction="column">
			<Typography variant="subtitle1" color="primary">
				Author
			</Typography>
			<Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
				<Typography variant="subtitle2" >
					Fullname :
				</Typography>
				
				<Typography variant="body2" textAlign="justify">
					{sentenceCase(fullname)}
				</Typography>
			</Stack>
			<Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
				<Typography variant="subtitle2" >
					Email :
				</Typography>

				<Typography variant="body2" textAlign="justify">
					{sentenceCase(email)}
				</Typography>
			</Stack>
		</Stack>
	</Stack>
  )
}


Curriculum.propTypes = {
	curriculum: PropTypes.object.isRequired,
};

export default Curriculum
