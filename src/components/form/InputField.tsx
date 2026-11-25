/**
 * Reusable Input Field Component
 * 
 * Strictly typed, NativeWind-styled input field with validation support.
 */

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'native-wind';
import { Theme } from '@/lib/theme';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string | number;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  error?: string;
  disabled?: boolean;
  theme: Theme;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  error,
  disabled,
  theme,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        placeholder={placeholder}
        value={value.toString()}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={!disabled}
      />
      
      {error && (
        <Text variant="caption" style={styles.error}>
          {error}
        </Text>
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
  input: {
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});
