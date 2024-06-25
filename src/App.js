import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={themes({
          isOpen: ['util-clients'],
          defaultId: 'default',
          fontFamily: "'Roboto', sans-serif",
          borderRadius: 12,
          opened: true
        })}
      >
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <ToastContainer theme="dark" />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
