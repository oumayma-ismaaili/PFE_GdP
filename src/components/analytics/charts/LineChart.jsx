import { Line } from "react-chartjs-2";
import { data, options } from "../../../data/chart/line-chart";

const LineChart = () => {
  return <Line data={data} options={options} />;
};

export default LineChart;
