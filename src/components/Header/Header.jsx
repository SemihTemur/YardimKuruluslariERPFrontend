import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCashBalance } from "../../redux/cashSlice";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMdHome } from "react-icons/io";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Divider, Box } from "@mui/material";
import { logoutUser } from "../../redux/authSlice";
import "./header.css";

export const Header = ({ setCollapsed }) => {
  const cashBalance = useSelector((state) => state.cash);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutDialog, setLogoutDialog] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getTreasuryBalance();
  }, []);

  const getTreasuryBalance = () => {
    dispatch(getCashBalance());
  };

  const clickMenu = () => {
    setCollapsed((prev) => !prev);
  };

  const goToHome = () => {
    navigate("/home");
  };

  const logoutDialogHandle = () => {
    setLogoutDialog(true);
  };

  const closeLogoutDialogHandle = () => {
    setLogoutDialog(false);
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const cancel = () => {
    setLogoutDialog(false);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const hasRole = (role) => {
    return user?.authorities?.includes(`ROLE_${role}`);
  };

  return (
    <>
      <div className="header">
        <div className="header__icon-container">
          <MenuIcon onClick={clickMenu} id="menu-icon" />
        </div>

        <div className="header__content">
          <IoMdHome className="home-icon" onClick={goToHome} />
          {hasRole("SUPER_ADMIN") ? (
            <Tooltip title={`Kasadaki para miktarı:${cashBalance.amount}₺`}>
              <IconButton>
                <AttachMoneyIcon id="saving-icon" />
              </IconButton>
            </Tooltip>
          ) : hasRole("TREASURY") ? (
            <Tooltip title={`Kasadaki para miktarı:${cashBalance.amount}₺`}>
              <IconButton>
                <AttachMoneyIcon id="saving-icon" />
              </IconButton>
            </Tooltip>
          ) : null}

          <div className="person-content">
            <PersonIcon
              id="person-icon"
              onClick={handleClick}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            />
            <p>{user?.displayUsername}</p>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              disableScrollLock
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "#1E1E1E",
                  width: 160,
                  borderRadius: 2,
                  boxShadow: 3,
                  marginLeft: -2, // Ekstra sola kaydırma (isteğe göre ayarlayın)
                },
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  color: "#fff",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={goToProfile}
                >
                  <PersonIcon
                    sx={{ color: "#fff", fill: "#ffff  !important" }}
                  />
                  <p
                    className="profile"
                    style={{
                      color: "#fff !important",
                      fill: "#fff !important",
                      textDecoration: "none",
                    }}
                  >
                    Profile
                  </p>
                </Box>

                <Divider
                  sx={{ width: "100%", backgroundColor: "#555", my: 1 }}
                />

                <Box
                  onClick={logoutDialogHandle}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <LogoutIcon
                    sx={{ color: "#fff !important", fill: "#fff !important" }}
                  />
                  <p style={{ margin: 0, color: "#fff" }}>Çıkış Yap</p>
                </Box>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <Dialog
        open={logoutDialog}
        onClose={closeLogoutDialogHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
          {"Çıkış yapmak istediğinize emin misiniz?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={logout} color="primary">
            Evet
          </Button>
          <Button onClick={cancel} color="error" autoFocus>
            Hayır
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
