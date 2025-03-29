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
    menu: "Bağışçı",
    icon: <PeopleIcon />,
    url: "/donor",
  },
  {
    menu: "Bağış",
    icon: <VolunteerActivismIcon />,
    subItems: [
      {
        menu: "Nakdi Bağış",
        icon: <AttachMoneyIcon />,
        url: "/donation/cash",
      },
      {
        menu: "Ayni Bağış",
        icon: <CardGiftcardIcon />,
        url: "/donation/inkind",
      },
    ],
  },

  {
    menu: "Aile",
    icon: <FamilyRestroomIcon />,
    url: "/family",
  },
  {
    menu: "Öğrenci",
    icon: <SchoolIcon />,
    url: "/student",
  },
  {
    menu: "Yardım",
    icon: <SupportIcon />,
    subItems: [
      {
        menu: "Nakdi Yardım",
        icon: <AttachMoneyIcon />,
        url: "/aid/cash",
      },
      {
        menu: "Ayni Yardım",
        icon: <CardGiftcardIcon />,
        url: "/aid/inkind",
      },
    ],
  },
  {
    menu: "Burs",
    icon: <SavingsIcon />,
    url: "/scholarship",
  },
  {
    menu: "Gelirler",
    icon: <TrendingUpIcon />,
    subItems: [
      {
        menu: "Bağış Gelirleri",
        subItems: [
          {
            menu: "Nakdi Bağış Gelirleri",
            url: "/income/donation-income/cash-donations",
          },
          {
            menu: "Ayni Bağış Gelirleri",
            url: "/income/donation-income/in-kind-donations",
          },
        ],
      },
      {
        menu: "Diğer Gelirleri",
        url: "/income/other",
      },
    ],
  },
  {
    menu: "Giderler",
    icon: <TrendingDownIcon />,
    subItems: [
      { menu: "Burs Giderleri", url: "/giderler/burs-giderler" },
      {
        menu: "Yardım Giderleri",
        subItems: [
          {
            menu: "Nakdi Yardim Giderleri",
            url: "/giderler/yardim-giderler/nakdi-yardim-giderler",
          },
          {
            menu: "Ayni Yardım Giderleri",
            url: "/giderler/yardim-giderler/ayni-yardim-giderler",
          },
        ],
      },
      {
        menu: "Diğer Giderler",
        url: "/expense/other",
      },
    ],
  },
  {
    menu: "Tür",
    icon: <CategoryIcon />,
    url: "/category",
  },
  {
    menu: "Envanter",
    icon: <InventoryIcon />,
    url: "/inventory",
  },
  {
    menu: "Log",
    icon: <FaHistory />,
  },
];

export default menuItems;
