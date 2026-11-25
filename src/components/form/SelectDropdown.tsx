/**
 * Reusable Select Dropdown Component
 * 
 * NativeWind-styled dropdown for selecting options.
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Text } from 'native-wind';
import { Theme } from '@/lib/theme';

interface SelectDropdownProps<T> {
  label: string;
  options: Array<{ value: T; label: string }>;
  selectedValue: T | null;
  onValueChange: (value: T) => void;
  theme: Theme;
}

export const SelectDropdown: React.FC<SelectDropdownProps<any>> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      
      <TouchableOpacity
        style={[styles.dropdown, isOpen && styles.dropdownOpen]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.selectedRow}>
          <Text variant="body" style={styles.selectedValue}>
            {selectedValue ? options.find(o => o.value === selectedValue)?.label : 'Select...'}
          </Text>
          <Text variant="caption" style={styles.icon}>
            ▼
          </Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.options, Platform.OS === 'ios' && styles.iosOptions]}>
          {options.map((option) => (
            <TouchableOpacity
              key={String(option.value)}
              style={[
                styles.option,
                selectedValue === option.value && styles.optionSelected,
              ]}
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text
                variant="body"
                style={[
                  styles.optionText,
                  selectedValue === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownOpen: {
    borderColor: '#60A5FA',
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedValue: {
    fontSize: 16,
    color: '#1F2937',
  },
  icon: {
    fontSize: 14,
    color: '#6B7280',
  },
  options: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: Platform.OS === 'ios' ? 300 : 250,
  },
  iosOptions: {
    marginTop: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    fontSize: 15,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '500',
  },
});
