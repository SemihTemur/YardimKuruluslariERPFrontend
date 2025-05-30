import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { FaRedo as ArrowClockwise } from "react-icons/fa";
import Chart from "react-apexcharts";
import useApi from "../../hooks/useApi ";

const AYLAR_KISALTMA = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];

const AYLAR_TAM = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const Grafic = ({ sx }) => {
  const [data, setData] = useState(null);
  const { makeRequest } = useApi();

  const fetchData = async () => {
    try {
      const response = await makeRequest("get", "/getMonthlyDonationStats");
      const apiData = response.data;

      const aylar = Array.from({ length: 12 }, (_, i) => {
        const monthNum = (i + 1).toString().padStart(2, "0");
        return `2025-${monthNum}`;
      });

      const topDonors = [];
      const topDonations = [];
      const avgDonations = [];

      aylar.forEach((ay) => {
        const record = apiData.find((d) => d.donation_month === ay);
        if (record) {
          topDonors.push(`${record.donor_name} ${record.last_name}`);
          topDonations.push(record.total_donation);
          avgDonations.push(record.average_donation);
        } else {
          topDonors.push("Veri Yok");
          topDonations.push(0);
          avgDonations.push(0);
        }
      });

      setData({ topDonors, topDonations, avgDonations });
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setData({ topDonors: [], topDonations: [], avgDonations: [] });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true },
    },
    colors: ["#38bdf8", "#94a3b8"],
    stroke: {
      width: [0, 3],
      curve: "smooth",
    },
    xaxis: {
      categories: AYLAR_KISALTMA,
      labels: {
        style: { colors: "#cbd5e1", fontSize: "12px" },
        rotate: -45,
      },
      axisBorder: { color: "#475569" },
      axisTicks: { color: "#475569" },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}₺`,
        style: { colors: "#cbd5e1" },
      },
    },
    tooltip: {
      theme: "dark",
      shared: true,
      custom: ({ dataPointIndex }) => {
        const donor = data?.topDonors?.[dataPointIndex] || "Veri Yok";
        const max = data?.topDonations?.[dataPointIndex] ?? 0;
        const avg = data?.avgDonations?.[dataPointIndex] ?? 0;
        const month = AYLAR_TAM[dataPointIndex];

        return `
          <div style="padding: 8px; color: #fff;">
            <strong>${month}</strong><br/>
            En Yüksek Bağışçı: ${donor}<br/>
            Bağış Miktarı: ${max > 0 ? `${max}₺` : "-"}<br/>
            Ortalama Bağış: ${avg > 0 ? `${avg}₺` : "-"}
          </div>
        `;
      },
    },
    grid: {
      borderColor: "#334155",
      strokeDashArray: 4,
    },
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1e293b",
        color: "#fff",
        borderRadius: 3,
        boxShadow: 4,
        ...sx,
      }}
    >
      <CardHeader
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<ArrowClockwise />}
            onClick={fetchData}
          >
            Yenile
          </Button>
        }
        title="Aylık Bağış Rakamları"
        subheader="Her ay için en yüksek bağış yapan kişi ve ortalama bağış miktarları"
        sx={{
          color: "#cbd5e1",
          "& .MuiCardHeader-title": {
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: "#f1f5f9",
          },
          "& .MuiCardHeader-subheader": {
            fontSize: "0.9rem",
            color: "#94a3b8",
          },
        }}
      />
      <CardContent>
        <Chart
          height={320}
          options={chartOptions}
          series={[
            {
              name: "En Yüksek Bağış",
              type: "column",
              data: data?.topDonations || [],
            },
            {
              name: "Ortalama Bağış",
              type: "line",
              data: data?.avgDonations || [],
            },
          ]}
        />
      </CardContent>
      <Divider sx={{ borderColor: "#334155" }} />
    </Card>
  );
};

export default Grafic;
