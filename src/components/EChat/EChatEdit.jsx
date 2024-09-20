import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, IconButton, Input, List, ListItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { getStorage, setStorage } from '../../services/storage';

export default function EChatEdit() {
    const newItemName = useRef();
    const newItemValue = useRef();
    const [items, setItems] = useState([]);

    useEffect(() => {
        getStorage("e-chat-items").then((data) => {
            const result = data["e-chat-items"] || [];
            setItems(result);
        });
    });

    const handleListItemDelete = (e, itemToRemove) => {
        const itemsFiltered = items.filter((item) => item.timestamp !== itemToRemove.timestamp);
        setStorage("e-chat-items", itemsFiltered);
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
            <List dense >
                <ListItem key="new"
                    secondaryAction={
                        <IconButton edge="end" aria-label="add"
                            onClick={handleListItemAdd}>
                            <Add />
                        </IconButton>
                    }
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Input inputRef={newItemName} placeholder="Nom" sx={{ mr: 2 }} />
                        <Input inputRef={newItemValue} placeholder="Action ChatGPT" multiline />
                    </Box>
                </ListItem>

                <Divider sx={{ my: 2 }} />

                {items?.map((item, index) =>
                    <ListItem key={index}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete"
                                onClick={(event) => handleListItemDelete(event, item)}>
                                <Delete />
                            </IconButton>
                        }
                    >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Input value={item.name} sx={{ mr: 2 }} />
                            <Input value={item.value} multiline />
                        </Box>
                    </ListItem>)}
            </List>
        </Box >
    );
}
