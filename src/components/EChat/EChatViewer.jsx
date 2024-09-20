import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { IconButton, Link, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { getStorage } from '../../services/storage';
import { scrap } from '../../services/scraping';

export default function EChatViewer(props) {
    const theme = useTheme();
    const [items, setItems] = useState([]);
    const noItems = !items?.length > 0;

    useEffect(() => {
        getStorage("e-chat-items").then((data) => {
            const result = data["e-chat-items"] || [];
            setItems(result);
        });
    });

    const handleListItemClick = async (item) => {
        const context = await scrap();
        console.log("context", context);
        // TODO : call API service to request ChatGPT with context
    }

    const handleEditClick = () => {
        if (!chrome.runtime.openOptionsPage) window.open(chrome.runtime.getURL('options.html'));
        chrome.runtime.openOptionsPage();
    }

    const editButton = <IconButton aria-label="edit" color="white"
        onClick={handleEditClick}>
        <Settings />
    </IconButton>

    return (
        <Box >

            <Box sx={{ display: "flex", justifyContent: noItems ? "center" : "end", alignItems: "center" }}>
                {noItems && <Link href="#" onClick={handleEditClick} style={{ color: "white" }}>Créer des actions</Link>}
                {editButton}
            </Box>

            <List dense >
                {items?.map((item, index) =>
                    <ListItem id="test" key={index}>
                        <ListItemButton key={index} onClick={() => handleListItemClick(item)} color="primary">
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>)}
            </List>

        </Box >
    );
}
