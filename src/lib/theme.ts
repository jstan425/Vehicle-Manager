/**
 * Theme Configuration
 * 
 * Supports Light Mode, Dark Mode, and "Secret Black" Mode (True #000000 for OLED screens)
 */

export type Theme = 'light' | 'dark' | 'secret-black';

/**
 * Color palette for each theme
 */
export const ThemeConfig = {
  light: {
    background: '#FFFFFF',
    surface: '#F8FAFC',
    primary: '#2563EB', // Blue-600
    secondary: '#64748B', // Slate-500
    textPrimary: '#1E293B', // Slate-800
    textSecondary: '#64748B', // Slate-500
    border: '#E2E8F0', // Slate-200
    success: '#10B981', // Emerald-500
    warning: '#F59E0B', // Amber-500
    error: '#EF4444', // Red-500
    secretBlackBackground: null, // Not applicable
  },
  
  dark: {
    background: '#18181B', // Zinc-900
    surface: '#27272A', // Zinc-800
    primary: '#60A5FA', // Blue-400
    secondary: '#9CA3AF', // Gray-400
    textPrimary: '#F9FAFB', // Gray-100
    textSecondary: '#9CA3AF', // Gray-400
    border: '#3F3F46', // Zinc-700
    success: '#34D399', // Emerald-400
    warning: '#FBBF24', // Amber-400
    error: '#F87171', // Red-400
    secretBlackBackground: null, // Not applicable
  },
  
  'secret-black': {
    background: '#000000', // Pure black for OLED screens
    surface: '#0A0A0A',
    primary: '#60A5FA', // Blue-400 - bright accent
    secondary: '#9CA3AF', // Gray-400
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    border: '#1F2937', // Dark gray for subtle borders
    success: '#34D399', // Emerald-400
    warning: '#FBBF24', // Amber-400
    error: '#F87171', // Red-400
    secretBlackBackground: '#000000',
  },
};

/**
 * Get the current theme configuration
 */
export const getCurrentTheme = (theme: Theme): typeof ThemeConfig[Theme] => {
  return ThemeConfig[theme];
};

/**
 * Check if a color should use secret black background
 */
export const isSecretBlackActive = (theme: Theme): boolean => theme === 'secret-black';
