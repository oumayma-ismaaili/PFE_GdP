import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";

const Body = () => {
  return (
    <div className="w-full p-8 my-5 relative">
      <div className="grid grid-cols-1 h-1/2 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-3 shadow rounded-lg p-6">
          <BarChart />
        </div>
        <div className="shadow rounded-lg p-6 col-span-2">
          <PieChart />
        </div>
      </div>
      <div className="h-96 mt-4 shadow rounded-lg p-6 col-span-5">
        <LineChart />
      </div>
    </div>
  );
};

export default Body;
