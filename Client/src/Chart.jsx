import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data }) {
    const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
    legend: {
        position: "top",
    },
    title: {
        display: true,
        text: "Study Schedule",
    },
    },
    scales: {
  x: {
    title: {
      display: true,
      text: "Time Slots",
    },
    ticks: {
      callback: function(value, index, ticks) {
        const times = ["3", "6", "9"];
        return times[index] || "";
      }
    }
  },
  y: {
    title: {
      display: true,
      text: "Days",
    },
  },
},
};

  return (
    <div style={{ marginTop: "30px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;