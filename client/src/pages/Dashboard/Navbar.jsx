import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import {User, Settings, Bell,Stethoscope} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';
import { useState } from 'react';

const Navbar = () => {
const [anchorElUser, setAnchorElUser] = useState(null);
  const Navigate=useNavigate();

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    // const [darkMode,setDarkMode]=useState(false);
    
    const handleLogout=()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('loggedinUser');
      handleSuccess("User Logged Out")
      setTimeout(()=>{
        Navigate('/');
      },1000)

    }
  return (
    <nav className="bg-white border-b border-gray-200  px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-gray-900 ">Checkify</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button> */}
            <button className="p-2 text-gray-500  hover:text-gray-700  hover:bg-gray-100  rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500  hover:text-gray-700  hover:bg-gray-100  rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 " />
              </div>
            {/* <span className="text-sm font-medium text-gray-700 pl-4">{loggedinUser}</span> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={()=>{Navigate('/')}}>
                  <Typography sx={{ textAlign: 'center' }}>Home <HomeIcon/></Typography>
                </MenuItem>
                <MenuItem onClick={()=>{handleLogout();handleCloseUserMenu();}}>
                  <Typography sx={{ textAlign: 'center' }}>Logout <LogoutIcon/> </Typography>
                </MenuItem>
            </Menu>
          </Box>
              </div>
            </div>
          </div>
      </nav>
  )
}

export default Navbar