import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { components } from './components/index';
import { typography } from './typography';

const theme = createTheme({
    palette,
    typography,
    components,
});

export { theme, components, typography }