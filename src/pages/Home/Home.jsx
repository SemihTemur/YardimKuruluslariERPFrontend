import Box from "@mui/material/Box";
import Grafic from "../../components/Overview/Grafic";
import Cards from "../../components/Overview/Cards/Cards";
import SchoolIcon from "@mui/icons-material/School";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import GroupIcon from "@mui/icons-material/Group";
import DonutChart from "../../components/Overview/DonutChart";

const Home = () => {
  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Kartlar (Üst Satır) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: "1 1 240px", // Minimum 240px, geniş alanda esnek büyüme
            minWidth: "240px",
          }}
        >
          <Cards
            title="Öğrenci"
            icon={<SchoolIcon className="stat-icon" />}
            description="Toplam öğrenci sayısı"
            url="/getStudentCount"
          />
        </Box>
        <Box
          sx={{
            flex: "1 1 240px",
            minWidth: "240px",
          }}
        >
          <Cards
            title="Aile"
            icon={<FamilyRestroomIcon className="stat-icon" />}
            description="Toplam aile sayısı"
            url="/getFamilyCount"
          />
        </Box>
        <Box
          sx={{
            flex: "1 1 240px",
            minWidth: "240px",
          }}
        >
          <Cards
            title="Bağışçı"
            icon={<GroupIcon className="stat-icon" />}
            description="Toplam bağışçı sayısı"
            url="/getDonorCount"
          />
        </Box>
        <Box
          sx={{
            flex: "1 1 240px",
            minWidth: "240px",
          }}
        >
          <Cards
            title="Nakdi Bağış"
            icon={<CurrencyLiraIcon className="stat-icon" />}
            description="Toplam yapılan nakdi bağış miktarı"
            url="/getCashDonationAmounts"
          />
        </Box>
      </Box>

      {/* Grafik ve DonutChart (Alt Satır) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: "1 1 600px", // Grafik daha büyük alan kaplasın
            minWidth: "300px",
          }}
        >
          <Grafic />
        </Box>

        <Box
          sx={{
            flex: "1 1 300px",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Dikeyde de ortalanması isteniyorsa
          }}
        >
          <DonutChart
            sx={{ height: "100%", width: "100%", maxWidth: "300px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
