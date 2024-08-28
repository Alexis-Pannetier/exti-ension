import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { IconButton, Link, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { getStorage } from '../../pages/Content';
import fetchBase from '../../services/fetch-base';

async function getCurrentTab() {
    return await chrome.tabs.query({ active: true });
}

async function getCurrentTabContent() {
    const [tab] = await getCurrentTab();
    const url = tab.url;
    return fetchBase(url).catch(error => {
        console.error('Erreur:', error);
    });
}

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

    const handleListItemClick = (item) => {
        getCurrentTabContent().then((d) => {
            console.log(d);
            // console.log(d);
        });
    }

    const handleEditClick = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
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
                    <ListItem key={index}>
                        <ListItemButton key={index} onClick={() => handleListItemClick(item)} color="primary">
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>)}
            </List>

        </Box >
    );
}
