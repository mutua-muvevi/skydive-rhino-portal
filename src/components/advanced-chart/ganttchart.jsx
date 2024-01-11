import PropTypes from "prop-types";
//component for Ganttchart
import { Chart } from "react-google-charts";

const Ganttchart = ({ data }) => {
	const { columns, rows } = data;
	return (
		<Chart
			chartType="Gantt"
			width="100%"
			height={data.height ? data.height : "500px"}
			data={[columns, ...rows]}
			options={data.options}
		/>
	);
};

Ganttchart.propTypes = {
	data: PropTypes.array.isRequired,
};

export default Ganttchart;
