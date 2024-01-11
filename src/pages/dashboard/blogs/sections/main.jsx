import { Button, Grid, Stack, Typography } from "@mui/material";
import BlogsCard from "./cards";
import ModalComponent from "../../../../components/modal/modal";
import { useState } from "react";
import NewBlog from "../new/new";
import { useSelector } from "../../../../redux/store";

const BlogsMain = () => {
	const [openModal, setOpenModal] = useState(false);
	const { blogs: { data: allBlogs } } = useSelector((state) => state.blog);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Stack direction="column" spacing={3}>
				<div>
					<Button
						variant="contained"
						color="primary"
						onClick={handleOpenModal}
					>
						<Typography variant="subtitle1">Add a new Blog</Typography>
					</Button>
				</div>

				<div>
					<Grid container spacing={3}>
						{allBlogs ? allBlogs.map((blog, index) => (
							<Grid item xs={12} sm={6} md={4} xl={3} key={index}>
								<BlogsCard blog={blog}/>
							</Grid>
						)): null}
					</Grid>
				</div>
			</Stack>

			<ModalComponent
				title="Add a new Blog"
				open={openModal}
				onClose={() => setOpenModal(false)}
				height={600}
				maxWidth="lg"
			>
				<NewBlog onClose={() => setOpenModal(false)}/>
			</ModalComponent>
		</>
	);
};

export default BlogsMain;
