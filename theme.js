import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#14181c',
        minHeight: '100vh',
      },
    },
  },
  colors: {
    brand: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    purple: {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: '10px',
      },
      variants: {
        gradient: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
            _disabled: {
              transform: 'none',
            },
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: '10px',
            borderWidth: '2px',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #7c3aed',
            },
          },
        },
      },
    },
  },
});

export default theme;

