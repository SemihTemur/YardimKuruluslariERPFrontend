import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PeopleIcon from "@mui/icons-material/People";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import SupportIcon from "@mui/icons-material/Support";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import { FaHistory } from "react-icons/fa";

const menuItems = [
  {
    menu: "Bağış",
    icon: <VolunteerActivismIcon />,
    subItems: [
      {
        menu: "Nakdi Bağış",
        icon: <AttachMoneyIcon />,
        subItems: [
          { menu: "Nakdi Bağış Ekle" },
          { menu: "Nakdi Bağış Listele" },
        ],
      },
      {
        menu: "Ayni Bağış",
        icon: <CardGiftcardIcon />,
        subItems: [{ menu: "Ayni Bağış Ekle" }, { menu: "Ayni Bağış Listele" }],
      },
    ],
  },
  {
    menu: "Bağışçı",
    icon: <PeopleIcon />,
    subItems: [{ menu: "Bağışçı Ekle" }, { menu: "Bağışçı Listele" }],
  },
  {
    menu: "Aile",
    icon: <FamilyRestroomIcon />,
    subItems: [{ menu: "Aile Ekle" }, { menu: "Aile Listele" }],
  },
  {
    menu: "Öğrenci",
    icon: <SchoolIcon />,
    subItems: [{ menu: "Öğrenci Ekle" }, { menu: "Öğrenci Listele" }],
  },
  {
    menu: "Yardım",
    icon: <SupportIcon />,
    subItems: [
      {
        menu: "Nakdi Yardım",
        icon: <AttachMoneyIcon />,
        subItems: [
          { menu: "Nakdi Yardım Ekle" },
          { menu: "Nakdi Yardım Listele" },
        ],
      },
      {
        menu: "Ayni Yardım",
        icon: <CardGiftcardIcon />,
        subItems: [
          { menu: "Ayni Yardım Ekle" },
          { menu: "Ayni Yardım Listele" },
        ],
      },
    ],
  },
  {
    menu: "Burs",
    icon: <SavingsIcon />,
    subItems: [{ menu: "Burs Ekle" }, { menu: "Burs Listele" }],
  },
  {
    menu: "Gelirler",
    icon: <TrendingUpIcon />,
    subItems: [
      {
        menu: "Bağış Gelirleri",
        subItems: [
          { menu: "Nakdi Bağış Gelirleri" },
          { menu: "Ayni Bağış Gelirleri" },
        ],
      },
      {
        menu: "Diğer Gelirleri",
        subItems: [
          { menu: "Diğer Gelir Ekle" },
          { menu: "Diğer Gelir Listele" },
        ],
      },
    ],
  },
  {
    menu: "Giderler",
    icon: <TrendingDownIcon />,
    subItems: [
      { menu: "Burs Giderleri" },
      {
        menu: "Yardım Giderleri",
        subItems: [
          { menu: "Nakdi Yardim Giderleri" },
          { menu: "Ayni Yardım Giderleri" },
        ],
      },
      {
        menu: "Diğer Giderler",
        subItems: [
          { menu: "Diğer Gider Ekle" },
          { menu: "Diğer Gider Listele" },
        ],
      },
    ],
  },
  {
    menu: "Tür",
    icon: <CategoryIcon />,
    subItems: [{ menu: "Tür Ekle" }, { menu: "Tür Listele" }],
  },
  {
    menu: "Envanter",
    icon: <InventoryIcon />,
    subItems: [{ menu: "Envanteri Listele" }],
  },
  {
    menu: "Log",
    icon: <FaHistory />,
    subItems: [{ menu: "Loglari Listele" }],
  },
];

export default menuItems;
