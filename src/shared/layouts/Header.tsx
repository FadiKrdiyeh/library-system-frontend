import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Tooltip,
    Avatar,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { AppState, store } from '../../store';
import { logout } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const PAGES = [
    { title: 'Books', to: '/books', needAuth: false },
    { title: 'Borrowings', to: '/borrowings', needAuth: true },
    { title: 'Users', to: '/users', needAuth: false },
];
// const SETTINGS = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header: React.FC = () => {
    const user = useSelector((state: AppState) => state.auth.user);

    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('handleOpenNavMenu', event.currentTarget);
        setAnchorElNav(event.currentTarget);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('handleOpenUserMenu', event.currentTarget);
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        console.log('handleCloseNavMenu');
        setAnchorElNav(null);
    }

    const handleCloseUserMenu = () => {
        console.log('handleCloseUserMenu');
        setAnchorElUser(null);
    }

    const SETTINGS = [
        { title: 'Profile' },
        { title: 'Account' },
        { title: 'Dashboard' },
        {
            title: 'Logout', action: async () => {
                await store.dispatch(logout());
                handleCloseUserMenu();
            }
        },
    ];

    return <AppBar position='sticky'>
        <Container>
            <Toolbar sx={{ padding: { xs: 0 } }}>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography variant='h6' noWrap component='a' href='#app-bar-with-responsive-menu' sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
                    LOGO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                        <MenuIcon />
                    </IconButton>
                    <Menu id='menu-appbar' anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                        {PAGES.map((page) => (
                            (!page.needAuth ? <MenuItem key={page.to} href={page.to} onClick={handleCloseNavMenu}>
                                <Typography textAlign='center'>{page.title}</Typography>
                            </MenuItem> :
                            (page.needAuth && !!user) && <MenuItem key={page.to} href={page.to} onClick={handleCloseNavMenu}>
                                <Typography textAlign='center'>{page.title}</Typography>
                            </MenuItem>)
                        ))}
                    </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {PAGES.map((page) => (
                        (!page.needAuth ?
                            <Typography key={page.to} color='white' sx={{ textDecoration: 'none' }} component={Link} to={page.to}>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.title}
                                </Button>
                            </Typography> :
                            (page.needAuth && !!user) && <Typography key={page.to} color='white' sx={{ textDecoration: 'none' }} component={Link} to={page.to}>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.title}
                                </Button>
                            </Typography>)
                    ))}
                </Box>
                {!user && <Box sx={{ flexGrow: 0, display: 'flex' }}>
                    <Typography color='white' sx={{ textDecoration: 'none' }} component={Link} to='/auth/login'>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Login
                        </Button>
                    </Typography>
                    <Typography color='white' sx={{ textDecoration: 'none' }} component={Link} to='/auth/register'>
                        <Button sx={{ my: 2, marginInlineStart: '10px', color: 'white', display: 'block' }} variant='contained'>
                            Register
                        </Button>
                    </Typography>
                </Box>}
                {!!user && <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
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
                        {SETTINGS.map((setting) => (
                            <MenuItem key={setting.title} onClick={setting.action}>
                                <Typography textAlign="center">{setting.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>}
            </Toolbar>
        </Container>
    </AppBar>
}

export default Header;
