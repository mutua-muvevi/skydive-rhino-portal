import { CardMedia, Stack, Typography } from "@mui/material";
import { sentenceCase } from "change-case";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {

	const {
		title,
		introDescription,
		contentBlocks,
		thumbnail,
		author: { fullname, email },
		tags
	} = blog;
	
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
						<CardMedia
							component="img"
							height={250}
							image={detail.image}
							alt={detail.title}
						/>
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

		{/* Tags */}
		<Stack direction="column" spacing={1.5}>
			<Typography variant="subtitle1" color="primary">
				Tags
			</Typography>
			<Stack direction="row" spacing={3}>
				{
					tags.map((tag, index) => (
						<Stack
							direction="row"
							spacing={3}
							key={index}
							color="primary"
						>
							<Typography variant="subtitle2">
								{sentenceCase(tag)}
							</Typography>
						</Stack>
					))
				}
			</Stack>
		</Stack>
	</Stack>
  )
}


Blog.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default Blog
