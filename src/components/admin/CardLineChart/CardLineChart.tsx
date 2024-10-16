import React, { useEffect } from "react";
import { Card } from "antd";
import { Chart, registerables } from "chart.js";
import "./style.scss";

// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(...registerables);

// Định nghĩa props cho CardLineChart
interface CardLineChartProps {
  labels: string[];
  data: number[];
  label: string;
}

const CardLineChart: React.FC<CardLineChartProps> = ({
  labels,
  data,
  label,
}) => {
  useEffect(() => {
    const maxDataValue = Math.max(...data);
    const stepSize = Math.ceil(maxDataValue / 10);

    const config: any = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: data,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          position: "bottom", // Đặt vị trí chữ hiển thị ở dưới
          labels: {
            color: "white",
            boxWidth: 20, // Độ rộng hộp biểu thị
          },
        },
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        hover: {
          mode: "nearest" as const,
          intersect: true,
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(0,0,0)",
            },
            grid: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: maxDataValue + stepSize,
            ticks: {
              color: "rgba(0,0,0)",
              stepSize: stepSize,
            },
            grid: {
              borderDash: [3],
              color: "rgba(0, 0, 0, 0.15)",
            },
          },
        },
      },
    };

    const ctx = document.getElementById("line-chart") as HTMLCanvasElement;
    const myLine = new Chart(ctx.getContext("2d")!, config);

    return () => {
      myLine.destroy(); // Dọn dẹp khi component unmount
    };
  }, [labels, data, label]);

  return (
    <Card className="line-chart-card" title="Lượng truy cập hàng tháng">
      <div className="line-chart-container">
        <canvas id="line-chart" />
      </div>
    </Card>
  );
};

export default CardLineChart;
