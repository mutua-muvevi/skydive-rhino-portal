import PropTypes from "prop-types";
// components
import Chart, { useChart } from "../index";

// ----------------------------------------------------------------------

const ChartPie = ({ data }) => {
	const chartOptions = useChart(data.options);

	return (
		<Chart
			type={data.type}
			series={data.series}
			options={chartOptions}
			height={data.height ? data.height : 350}
		/>
	);
};

ChartPie.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ChartPie;

// ----------------------------------------------------------------------

