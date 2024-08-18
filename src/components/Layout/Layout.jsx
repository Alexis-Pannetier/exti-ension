import * as React from 'react';
import { styled, } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, SmartToy } from '@mui/icons-material';
import './Layout.css';
import Links from '../Links/Links';
import EChat from '../EChat/EChat';

const drawerWidth = 125;

const menuItems = [
    { name: "Liens", icon: <Link />, content: <Links />, openContent: "usefull-link" },
    { name: "E-chat", icon: <SmartToy />, content: <EChat />, openContent: " " }
]

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(4)} + 1px)`,
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: theme.spacing(0.5, 0.5),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Layout(props) {
    const { children } = props;
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState(<EChat />);
    // const [content, setContent] = React.useState(<EChat />);

    const handleItemClick = (content) => {
        setContent(content);
    }

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <IconButton onClick={handleOpen} size="small" sx={{ padding: 0.5 }}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => { handleItemClick(item.content) }}
                                sx={{
                                    height: 32,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 0.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 0.5 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: open ? 2 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                {content}
            </Box>
        </Box >
    );
}
