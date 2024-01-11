import { useState } from "react";
import DataGridCustom from "../../../../components/datagrid/custom";
import { useDispatch, useSelector } from "../../../../redux/store";
import { setReservation } from "../../../../redux/slices/reservations";
import ModalComponent from "../../../../components/modal/modal";
import DeleteReservation from "../delete/delete";

const BookingMain = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const {
		reservations: { data: reservationsData },
	} = useSelector((state) => state.reservations);

	const modalActions = [
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			onClick: (rowData) => {
				setOpen(true);
				dispatch(setReservation(rowData));
			}
		},
	];

	return (
		<div>
			<DataGridCustom
				data={reservationsData}
				title="Reservations List"
				modalTitle="Reservations"
				modalActions={modalActions}
			/>

			<ModalComponent
				open={open}
				onClose={() => setOpen(false)}
				title="Delete Reservation"
				height={230}
				maxWidth="sm"
			>
				<DeleteReservation/>
			</ModalComponent>
		</div>
	);
};

export default BookingMain;
