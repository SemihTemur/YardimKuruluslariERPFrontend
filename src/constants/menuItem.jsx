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
    subItems: [
      { menu: "Bağışçı Ekle", url: "/bagisci/ekle" },
      { menu: "Bağışçı Listele", url: "/bagisci/list" },
    ],
  },
  {
    menu: "Bağış",
    icon: <VolunteerActivismIcon />,
    subItems: [
      {
        menu: "Nakdi Bağış",
        icon: <AttachMoneyIcon />,
        subItems: [
          { menu: "Nakdi Bağış Ekle", url: "/bagis/nakdi/ekle" },
          { menu: "Nakdi Bağış Listele", url: "/bagis/nakdi/list" },
        ],
      },
      {
        menu: "Ayni Bağış",
        icon: <CardGiftcardIcon />,
        subItems: [
          { menu: "Ayni Bağış Ekle", url: "/bagis/ayni/ekle" },
          { menu: "Ayni Bağış Listele", url: "/bagis/ayni/list" },
        ],
      },
    ],
  },

  {
    menu: "Aile",
    icon: <FamilyRestroomIcon />,
    subItems: [
      { menu: "Aile Ekle", url: "/aile/ekle" },
      { menu: "Aile Listele", url: "/aile/list" },
    ],
  },
  {
    menu: "Öğrenci",
    icon: <SchoolIcon />,
    subItems: [
      { menu: "Öğrenci Ekle", url: "/ogrenci/ekle" },
      { menu: "Öğrenci Listele", url: "/ogrenci/list" },
    ],
  },
  {
    menu: "Yardım",
    icon: <SupportIcon />,
    subItems: [
      {
        menu: "Nakdi Yardım",
        icon: <AttachMoneyIcon />,
        subItems: [
          { menu: "Nakdi Yardım Ekle", url: "/yardim/nakdi/ekle" },
          { menu: "Nakdi Yardım Listele", url: "/yardim/nakdi/list" },
        ],
      },
      {
        menu: "Ayni Yardım",
        icon: <CardGiftcardIcon />,
        subItems: [
          { menu: "Ayni Yardım Ekle", url: "/yardim/ayni/ekle" },
          { menu: "Ayni Yardım Listele", url: "/yardim/ayni/list" },
        ],
      },
    ],
  },
  {
    menu: "Burs",
    icon: <SavingsIcon />,
    subItems: [
      { menu: "Burs Ekle", url: "/burs/ekle" },
      { menu: "Burs Listele", url: "/burs/list" },
    ],
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
            url: "/gelirler/bagis-gelirleri/nakdi-bagis-gelirleri",
          },
          {
            menu: "Ayni Bağış Gelirleri",
            url: "/gelirler/bagis-gelirleri/ayni-bagis-gelirleri",
          },
        ],
      },
      {
        menu: "Diğer Gelirleri",
        subItems: [
          { menu: "Diğer Gelir Ekle", url: "/gelirler/diger/ekle" },
          { menu: "Diğer Gelir Listele", url: "/gelirler/diger/list" },
        ],
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
        subItems: [
          { menu: "Diğer Gider Ekle", url: "/giderler/diger/ekle" },
          { menu: "Diğer Gider Listele", url: "/giderler/diger/list" },
        ],
      },
    ],
  },
  {
    menu: "Tür",
    icon: <CategoryIcon />,
    subItems: [
      { menu: "Tür Ekle", url: "/tur/ekle" },
      { menu: "Tür Listele", url: "/tur/list" },
    ],
  },
  {
    menu: "Envanter",
    icon: <InventoryIcon />,
    subItems: [{ menu: "Envanteri Listele", url: "/envanter/list" }],
  },
  {
    menu: "Log",
    icon: <FaHistory />,
    subItems: [{ menu: "Loglari Listele", url: "/log/list" }],
  },
];

export default menuItems;
