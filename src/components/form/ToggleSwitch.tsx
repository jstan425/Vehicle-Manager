/**
 * Toggle Switch Component
 * 
 * NativeWind-styled toggle for boolean options.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-wind';
import { Theme } from '@/lib/theme';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  theme: Theme;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  value,
  onValueChange,
  theme,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      
      <TouchableOpacity
        style={[styles.toggle, value && styles.toggleActive]}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.toggleCircle, value && styles.toggleCircleActive]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 12,
  },
  toggle: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: value ? '#3B82F6' : '#D1D5DB',
    position: 'relative',
  },
  toggleActive: {
    backgroundColor: '#2563EB',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 2,
    left: value ? 24 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleCircleActive: {
    left: 24,
  },
});
