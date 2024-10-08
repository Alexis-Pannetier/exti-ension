import * as React from 'react';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';

const linksItemsData = [
    { name: "CSE", link: "https://cse-extia.fr/" },
    { name: "Hora", link: "https://hora.vsactivity.com/common/login/" },
    { name: "Vamos", link: "https://vamos.extia.fr/" }
]

export default function Links() {
    const theme = useTheme();

    const linksItems = linksItemsData.map((item, index) =>
        <ListItem key={index}>
            <ListItemButton target="_blank" href={item.link} color={'primary'}>
                <ListItemText primary={item.name} />
            </ListItemButton>
        </ListItem>
    );

    return (
        <Box>
            <List>
                {linksItems}
            </List>
        </Box >
    );
}
