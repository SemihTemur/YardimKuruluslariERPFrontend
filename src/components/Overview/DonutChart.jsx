import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import useApi from "../../hooks/useApi ";

const DonutChart = () => {
  // const labelss = ["Ali Yılmaz", "Zeynep Kaya", "Mehmet Demir"];
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  const { makeRequest } = useApi();

  const colors = ["#F87171", "#60A5FA", "#FCD34D"];

  useEffect(() => {
    const getTopDonorList = async () => {
      try {
        const response = await makeRequest("get", "/getTopDonors");
        getInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTopDonorList();
  }, []);

  const getInformation = (data) => {
    const total = data.reduce((acc, curr) => acc + curr.totalDonation, 0);

    const names = data.map(
      (element) => `${element.firstName} ${element.lastName}`
    );
    setLabels(names);

    const rate = data.map((element) =>
      Math.round((element.totalDonation / total) * 100)
    );
    setSeries(rate);
  };

  const chartOptions = {
    chart: {
      background: "transparent",
    },
    labels,
    colors,
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: "#ffffff", // beyaz yazı
        useSeriesColors: false, // true olursa her label kendi rengiyle görünür
      },
      markers: {
        fillColors: colors,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              color: "#ffffff",
              fontSize: "16px",
            },
            value: {
              show: true,
              color: "#ffffff",
              fontSize: "14px",
            },
            total: {
              show: true,
              label: "Toplam",
              color: "#ffffff",
              formatter: () => {
                return `${series.reduce((a, b) => a + b, 0)}%`;
              },
            },
          },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1e293b", // slate-800
        color: "#ffffff",
        borderRadius: 3,
        boxShadow: 4,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          En Çok Bağış Yapan 3 Kişi
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            width="100%"
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
