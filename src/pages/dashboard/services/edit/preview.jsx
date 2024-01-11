import { Box, Typography, Stack, CardMedia, Paper, Grid } from "@mui/material";

import PropTypes from "prop-types";
import { isFile } from "../../../../utils/is-file";

const ServicePreview = ({ formData }) => {

	return (
		<Stack direction="column" spacing={3}>
			{/* service details */}
			<Stack direction="column" spacing={1}>
				<Typography variant="h6" color="primary">
					Title
				</Typography>
				<Typography variant="body1" textAlign="justify">
					{formData.name}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1}>
				<Typography variant="h6" color="primary">
					Intro Description
				</Typography>
				<Typography variant="body1" textAlign="justify">
					{formData.introDescription}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1}>
				{formData.thumbnail && (
					<Box>
						<Typography variant="h6" color="primary">
							Thumbnail Preview
						</Typography>
						<CardMedia
							component="img"
							image={
								isFile(formData.thumbnail)
									? URL.createObjectURL(formData.thumbnail)
									: formData.thumbnail
							}
							alt="Thumbnail"
						/>
					</Box>
				)}
			</Stack>

			{/* content blocks */}
			<Typography variant="h5" color="primary">
				Content Blocks
			</Typography>
			{formData.contentBlocks.map((block, index) => (
				<Paper
					key={index}
					sx={{ backgroundColor: "rgba(0,0,0,0.1)", p: 3 }}
				>
					<Stack spacing={3}>
						<Typography
							variant="subtitle1"
							color="primary"
						>{`Block ${index + 1} Title`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{block.title}
						</Typography>

						<Typography
							variant="subtitle1"
							color="primary"
						>{`Block ${index + 1} Details`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{block.details}
						</Typography>

						{block.image && (
							<CardMedia
								component="img"
								image={
									isFile(block.image)
										? URL.createObjectURL(block.image)
										: block.image
								}
								alt={`Content Block ${index + 1}`}
							/>
						)}
					</Stack>
				</Paper>
			))}

			{/* prices */}
			<Typography variant="h5" color="primary">
				Prices
			</Typography>

			{formData.prices.map((price, index) => (
				<Paper
					key={index}
					sx={{ backgroundColor: "rgba(0,0,0,0.1)", p: 3 }}
				>
					<Stack spacing={3}>
						<Typography
							variant="subtitle1"
							color="primary"
						>{`Price ${index + 1} Title`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{price.title}
						</Typography>

						<Typography
							variant="subtitle1"
							color="primary"
						>{`Price ${index + 1} Details`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{price.details}
						</Typography>
					</Stack>
				</Paper>
			))}

			{/* requirements */}
			<Typography variant="h5" color="primary">
				Requirements
			</Typography>

			{formData.requirements.map((requirement, index) => (
				<Paper
					key={index}
					sx={{ backgroundColor: "rgba(0,0,0,0.1)", p: 3 }}
				>
					<Stack spacing={3}>
						<Typography
							variant="subtitle1"
							color="primary"
						>{`Requirement ${index + 1} Title`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{requirement.title}
						</Typography>

						<Typography
							variant="subtitle1"
							color="primary"
						>{`Requirement ${index + 1} Details`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{requirement.details}
						</Typography>
					</Stack>
				</Paper>
			))}

			{/* faq */}
			<Typography variant="h5" color="primary">
				FAQ
			</Typography>

			{formData.faqs.map((faq, index) => (
				<Paper
					key={index}
					sx={{ backgroundColor: "rgba(0,0,0,0.1)", p: 3 }}
				>
					<Stack spacing={3}>
						<Typography
							variant="subtitle1"
							color="primary"
						>{`FAQ ${index + 1} Question`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{faq.question}
						</Typography>

						<Typography
							variant="subtitle1"
							color="primary"
						>{`FAQ ${index + 1} Answer`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{faq.answer}
						</Typography>
					</Stack>
				</Paper>
			))}

			{/* gallery */}
			<Typography variant="h5" color="primary">
				Gallery
			</Typography>

			<Grid container spacing={2}>
				{formData.gallery.map((image, index) => (
					<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
						<CardMedia
							component="img"
							image={
								isFile(image)
									? URL.createObjectURL(image)
									: image
							}
							alt={`Gallery Images for service ${index + 1}`}
						/>
					</Grid>
				))}
			</Grid>
			
		</Stack>
	);
};

ServicePreview.propTypes = {
	formData: PropTypes.object,
};

export default ServicePreview;
