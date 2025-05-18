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
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

const menuItems = [
  {
    name: "DONOR",
    menu: "Bağışçı",
    icon: <PeopleIcon />,
    url: "/donor",
  },
  {
    name: "DONATION",
    menu: "Bağış",
    icon: <VolunteerActivismIcon />,
    subItems: [
      {
        name: "CASHDONATION",
        menu: "Nakdi Bağış",
        icon: <AttachMoneyIcon />,
        url: "/donation/cash",
      },
      {
        name: "INKINDDONATION",
        menu: "Ayni Bağış",
        icon: <CardGiftcardIcon />,
        url: "/donation/inkind",
      },
    ],
  },

  {
    name: "FAMILY",
    menu: "Aile",
    icon: <FamilyRestroomIcon />,
    url: "/family",
  },
  {
    name: "STUDENT",
    menu: "Öğrenci",
    icon: <SchoolIcon />,
    url: "/student",
  },
  {
    name: "AİD",
    menu: "Yardım",
    icon: <SupportIcon />,
    subItems: [
      {
        name: "CASHAID",
        menu: "Nakdi Yardım",
        icon: <AttachMoneyIcon />,
        url: "/aid/cash",
      },
      {
        name: "INKINDAID",
        menu: "Ayni Yardım",
        icon: <CardGiftcardIcon />,
        url: "/aid/inkind",
      },
    ],
  },
  {
    name: "SCHOLARSHIP",
    menu: "Burs",
    icon: <SavingsIcon />,
    url: "/scholarship",
  },
  {
    name: "INCOME",
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
        name: "OTHERINCOME",
        menu: "Diğer Gelirleri",
        url: "/income/other",
      },
    ],
  },
  {
    name: "EXPENSE",
    menu: "Giderler",
    icon: <TrendingDownIcon />,
    subItems: [
      { menu: "Burs Giderleri", url: "/expense/scholarship-expense" },
      {
        menu: "Yardım Giderleri",
        subItems: [
          {
            menu: "Nakdi Yardim Giderleri",
            url: "/expense/aid-expense/cash-aid-expense",
          },
          {
            menu: "Ayni Yardım Giderleri",
            url: "/expense/aid-expense/in-kind-aid-expense",
          },
        ],
      },
      {
        name: "OTHEREXPENSE",
        menu: "Diğer Giderler",
        url: "/expense/other",
      },
    ],
  },
  {
    name: "CATEGORY",
    menu: "Tür",
    icon: <CategoryIcon />,
    url: "/category",
  },
  {
    name: "INVENTORY",
    menu: "Envanter",
    icon: <InventoryIcon />,
    url: "/inventory",
  },
  {
    name: "CUSTOMUSER",
    menu: "Kullanıcı",
    icon: <PersonIcon />,
    url: "/user",
  },
  {
    name: "ROLE",
    menu: "Rol",
    icon: <SupervisorAccountIcon />,
    url: "/role",
  },
  {
    name: "AUTHORIZATION",
    menu: "Yetkilendirme",
    icon: <LockIcon />,
    url: "/permission",
  },
  {
    name: "LOG",
    menu: "Log",
    icon: <FaHistory />,
    url: "/log",
  },
];

export default menuItems;
