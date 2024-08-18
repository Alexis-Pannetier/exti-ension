import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { IconButton, Input, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Add, Delete, Settings } from '@mui/icons-material';
import { getStorage, setStorage } from '../../pages/Content';

function getPageContent() {
    const pageContent = document.body.innerText;
    console.log("pageContent()", pageContent);

    alert(pageContent); // Vous pouvez afficher le contenu récupéré
}

export default function EChat(props) {
    const theme = useTheme();
    const { isOptions } = props;
    const newItemName = useRef();
    const newItemValue = useRef();
    const [items, setItems] = useState([]);
    let itemsIsLoaded = false;

    const refreshItems = () => {
        return getStorage("e-chat-items").then((data) => {
            const result = data["e-chat-items"]
            setItems(result);
            itemsIsLoaded = true;
            return result;
        });
    }

    refreshItems();

    const handleListItemClick = (item) => {
        const pageContent = chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: getPageContent
            });
        });

        // TODO
        // fetchChatService(pageContent);
    }

    const handleListItemDelete = (e, itemToRemove) => {
        const itemsFiltered = items.filter((item) => item.timestamp !== itemToRemove.timestamp);
        setStorage("e-chat-items", itemsFiltered);
    }

    const handleEditClick = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    }

    const handleListItemAdd = () => {
        const newItem = {
            name: newItemName.current.value,
            timestamp: Date.now(),
            value: newItemValue.current.value
        };
        const newItems = [...items, newItem];
        setStorage("e-chat-items", newItems).then(() => {
            newItemName.current.value = "";
            newItemValue.current.value = "";
        })
    }

    return (
        <Box >

            {!isOptions &&
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <IconButton aria-label="delete" color="white"
                        onClick={handleEditClick}>
                        <Settings />
                    </IconButton>
                </Box>
            }

            <List dense >
                {items?.map((item, index) =>
                    <ListItem key={index}
                        secondaryAction={isOptions &&
                            <IconButton edge="end" aria-label="delete"
                                onClick={(event) => handleListItemDelete(event, item)}>
                                <Delete color="white" />
                            </IconButton>
                        }
                    >
                        {isOptions ?
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Input value={item.name} sx={{ mr: 2 }} />
                                <Input value={item.value} />
                            </Box>
                            :
                            <ListItemButton key={index} onClick={() => handleListItemClick(item)} color="primary" onClick={(event) => handleListItemClick(event, item)}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        }
                    </ListItem>,)}
            </List>

            {isOptions &&
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Input inputRef={newItemName} placeholder="Nom" sx={{ mr: 2 }} />
                    <Input inputRef={newItemValue} placeholder="Action ChatGPT" multiline />
                    <IconButton aria-label="delete" color="white"
                        onClick={handleListItemAdd}>
                        <Add />
                    </IconButton>
                </Box>}

        </Box >
    );
}
