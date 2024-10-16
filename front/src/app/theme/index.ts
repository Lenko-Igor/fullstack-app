import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { components } from './components/index';

const theme = createTheme({
    palette,
    components,
});

export { theme, components }