import { Button, Stack } from "@mui/material"
import ModalComponent from "../../../../../components/modal/modal"
import { useState } from "react"
import NewHomepage from "./new/new"
import EditHomepage from "./edit/edit"

const HomePage = () => {
	const [openNewHomepage, setOpenNewHomepage] = useState(false)
	const [openEditHomepage, setOpenEditHomepage] = useState(false)

	const handleOpenCreateHomepage = () => {
		setOpenNewHomepage(true)
	}

	const handleOpenEditHomepage = () => {
		setOpenEditHomepage(true)
	}
  return (
	<>
		<Stack spacing={3}>
			<div>
				<Button variant="contained" color="primary" onClick={handleOpenCreateHomepage}>
					Create homepage
				</Button>
				<Button variant="contained" color="secondary" onClick={handleOpenEditHomepage}>
					Edit homepage
				</Button>
			</div>
		HomePage
		</Stack>

		<ModalComponent
			title="Create Homepage"
			open={openNewHomepage}
			onClose={() => setOpenNewHomepage(false)}
			height={700}
		>
			<NewHomepage onClose={() => setOpenNewHomepage(false)}/>
		</ModalComponent>

		<ModalComponent
			title="Edit Homepage"
			open={openEditHomepage}
			onClose={() => setOpenEditHomepage(false)}
			height={700}
		>
			<EditHomepage onClose={() => setOpenEditHomepage(false)}/>
		</ModalComponent>
	</>
  )
}

export default HomePage
