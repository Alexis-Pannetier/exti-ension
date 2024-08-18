import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const colorPalette = {
    primary: { main: "rgb(252, 136, 84)" },
    white: { main: "#fdfdfd", light: "#ffffff" }
};

export const theme = createTheme({
    palette: colorPalette,
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { color: 'primary' },
                            style: {
                                borderRadius: 2,
                                backgroundColor: colorPalette.primary.main,
                                fontWeight: 900,
                                '&:hover': {
                                    color: colorPalette.primary.main,
                                    backgroundColor: colorPalette.white.main
                                }
                            },
                        },
                    ],
                },
            }
        }
    }
});
