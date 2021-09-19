import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NAVBAR, TEXT } from '@statics';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { appActions } from '@redux/generics/AppRedux';
import { authActions, selectIsLoggedIn } from '@redux/generics/AuthRedux';
import { CONSTANTS } from '@statics';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC<{}> = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLoginModal = () => {
    dispatch(
      appActions.openModal({
        key: CONSTANTS.MODALS.LOGIN,
      })
    );

    handleMenuClose();
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    handleMenuClose();
  };

  const renderedLinks = NAVBAR.map(({ TITLE, REF }) => {
    const active = REF === location.pathname ? 'active' : '';

    return (
      <React.Fragment key={REF}>
        <Link className={`nav-link ${active}`} to={REF}>
          {TITLE}
        </Link>
      </React.Fragment>
    );
  });

  return (
    <div>
      <AppBar position="sticky" className="nav-appbar">
        <Toolbar className="nav-toolbar">
          <Typography className="nav-title">{TEXT.COMMON.TITLE}</Typography>
          <span className="nav-rendered-links">{renderedLinks}</span>
          <IconButton onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button',
            }}>
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleOpenLoginModal}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
