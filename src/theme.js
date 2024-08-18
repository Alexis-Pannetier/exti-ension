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
                    textAlign: "center",
                    padding: 3,
                    m: 1,
                    // fontFamily: "roboto",
                    // fontWeight: 900,
                    variants: [
                        {
                            props: { color: 'primary' },
                            style: {
                                color: colorPalette.primary.main,
                                backgroundColor: colorPalette.white.main,
                                '&:hover': {
                                    color: colorPalette.white.main,
                                    backgroundColor: colorPalette.primary.main
                                }
                            },
                        },
                        {
                            props: { color: 'secondary' },
                            style: {
                                color: colorPalette.white.main,
                                backgroundColor: colorPalette.primary.main,
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
