export const palette = {
    white: {
        main: '#FFFFFF',
    },
}

declare module '@mui/material/styles' {
    interface Palette {
        white: Palette['primary']
    }

    interface PaletteOptions {
        white?: PaletteOptions['primary'];
    }
}

declare module '@mui/material' {
    interface CircularProgressPropsColorOverrides {
        white: true
    }
}