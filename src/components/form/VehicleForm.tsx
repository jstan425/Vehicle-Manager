/**
 * Vehicle Profile Form Component
 * 
 * Reusable form for creating/editing vehicle profiles with validation.
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-wind';
import { InputField } from './InputField';
import { SelectDropdown } from './SelectDropdown';
import { ToggleSwitch } from './ToggleSwitch';
import { Theme } from '@/lib/theme';

interface VehicleFormProps {
  theme: Theme;
  initialData?: Partial<VehicleProfile>;
  onSubmit: (data: VehicleFormData) => void;
  onCancel?: () => void;
}

export interface VehicleFormData {
  name: string;
  model: string;
  plateNumber: string;
  year: number | null;
  color: string | null;
  isDualFuel: boolean;
  primaryFuelType: FuelType | null;
  secondaryFuelType: FuelType | null;
  primaryTankCapacity: number | null;
  secondaryTankCapacity: number | null;
  primaryFuelUnit: FuelUnit | null;
  secondaryFuelUnit: FuelUnit | null;
}

export interface VehicleProfile {
  id?: string;
  name: string;
  model: string;
  plateNumber: string;
  year: number | null;
  color: string | null;
  isDualFuel: boolean;
  primaryFuelType: FuelType | null;
  secondaryFuelType: FuelType | null;
  primaryTankCapacity: number | null;
  secondaryTankCapacity: number | null;
  primaryFuelUnit: FuelUnit | null;
  secondaryFuelUnit: FuelUnit | null;
}

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
export type FuelUnit = 'Liters' | 'Gallons' | 'Kilowatt-hours';

const FUEL_TYPES: Array<{ value: FuelType; label: string }> = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const FUEL_UNITS: Array<{ value: FuelUnit; label: string }> = [
  { value: 'Liters', label: 'Liters (L)' },
  { value: 'Gallons', label: 'Gallons (US)' },
  { value: 'Kilowatt-hours', label: 'kWh' },
];

export const VehicleForm: React.FC<VehicleFormProps> = ({
  theme,
  initialData,
  onSubmit,
  onCancel,
}) => {
  // Default values for new vehicle
  const defaults: VehicleFormData = {
    name: '',
    model: '',
    plateNumber: '',
    year: null,
    color: null,
    isDualFuel: false,
    primaryFuelType: 'Petrol',
    secondaryFuelType: null,
    primaryTankCapacity: 50,
    secondaryTankCapacity: null,
    primaryFuelUnit: 'Liters',
    secondaryFuelUnit: null,
  };

  // Merge initial data with defaults
  const [formData, setFormData] = React.useState<VehicleFormData>({
    ...defaults,
    ...(initialData || {}),
  });

  const handleInputChange = (field: keyof VehicleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Apply dual fuel logic: secondary fields must be null if isDualFuel === false
    let processedData = { ...formData };
    
    if (!processedData.isDualFuel) {
      processedData.secondaryFuelType = null;
      processedData.secondaryTankCapacity = null;
      processedData.secondaryFuelUnit = null;
    }

    onSubmit(processedData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Basic Information */}
      <View style={styles.section}>
        <Text variant="heading" style={styles.sectionTitle}>
          Basic Information
        </Text>
        
        <InputField
          label="Vehicle Name"
          placeholder="e.g., Toyota Vios"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          theme={theme}
        />

        <InputField
          label="Model"
          placeholder="e.g., Vios 1.5G"
          value={formData.model}
          onChangeText={(text) => handleInputChange('model', text)}
          theme={theme}
        />

        <InputField
          label="Plate Number"
          placeholder="e.g., ABC-1234"
          value={formData.plateNumber}
          onChangeText={(text) => handleInputChange('plateNumber', text)}
          keyboardType="phone-pad"
          theme={theme}
        />

        <InputField
          label="Year"
          placeholder="e.g., 2020"
          value={formData.year || ''}
          onChangeText={(text) => handleInputChange('year', text ? parseInt(text, 10) : null)}
          keyboardType="numeric"
          theme={theme}
        />

        <InputField
          label="Color"
          placeholder="e.g., Silver"
          value={formData.color || ''}
          onChangeText={(text) => handleInputChange('color', text)}
          theme={theme}
        />
      </View>

      {/* Fuel Configuration */}
      <View style={styles.section}>
        <Text variant="heading" style={styles.sectionTitle}>
          Primary Fuel
        </Text>

        <SelectDropdown<FuelType>
          label="Fuel Type"
          options={FUEL_TYPES}
          selectedValue={formData.primaryFuelType}
          onValueChange={(value) => handleInputChange('primaryFuelType', value)}
          theme={theme}
        />

        {formData.primaryFuelType === 'Electric' ? (
          <SelectDropdown<FuelUnit>
            label="Energy Unit"
            options={FUEL_UNITS.filter(u => u.value === 'Kilowatt-hours')}
            selectedValue={formData.primaryFuelUnit}
            onValueChange={(value) => handleInputChange('primaryFuelUnit', value)}
            theme={theme}
          />
        ) : (
          <InputField
            label="Tank Capacity"
            placeholder="e.g., 50"
            value={formData.primaryTankCapacity || ''}
            onChangeText={(text) => handleInputChange('primaryTankCapacity', text ? parseFloat(text, 10) : null)}
            keyboardType="numeric"
            theme={theme}
          />
        )}

        {formData.primaryFuelUnit && formData.primaryFuelUnit !== 'Kilowatt-hours' && (
          <InputField
            label="Capacity Unit"
            placeholder="e.g., Liters"
            value={formData.primaryFuelUnit}
            onChangeText={(text) => handleInputChange('primaryFuelUnit', text)}
            theme={theme}
          />
        )}
      </View>

      {/* Dual Fuel Configuration */}
      <View style={styles.section}>
        <Text variant="heading" style={styles.sectionTitle}>
          Secondary Fuel (if applicable)
        </Text>

        <ToggleSwitch
          label="Is this a dual-fuel vehicle?"
          value={formData.isDualFuel}
          onValueChange={(value) => handleInputChange('isDualFuel', value)}
          theme={theme}
        />

        {formData.isDualFuel && (
          <>
            <SelectDropdown<FuelType>
              label="Secondary Fuel Type"
              options={FUEL_TYPES.filter(t => t.value !== formData.primaryFuelType)}
              selectedValue={formData.secondaryFuelType}
              onValueChange={(value) => handleInputChange('secondaryFuelType', value)}
              theme={theme}
            />

            {formData.secondaryFuelType === 'Electric' ? (
              <SelectDropdown<FuelUnit>
                label="Energy Unit"
                options={FUEL_UNITS.filter(u => u.value === 'Kilowatt-hours')}
                selectedValue={formData.secondaryFuelUnit}
                onValueChange={(value) => handleInputChange('secondaryFuelUnit', value)}
                theme={theme}
              />
            ) : (
              <InputField
                label="Secondary Tank Capacity"
                placeholder="e.g., 30"
                value={formData.secondaryTankCapacity || ''}
                onChangeText={(text) => handleInputChange('secondaryTankCapacity', text ? parseFloat(text, 10) : null)}
                keyboardType="numeric"
                theme={theme}
              />
            )}

            {formData.secondaryFuelUnit && formData.secondaryFuelUnit !== 'Kilowatt-hours' && (
              <InputField
                label="Secondary Capacity Unit"
                placeholder="e.g., Liters"
                value={formData.secondaryFuelUnit}
                onChangeText={(text) => handleInputChange('secondaryFuelUnit', text)}
                theme={theme}
              />
            )}
          </>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {onCancel && (
          <Text variant="caption" style={styles.cancelHint}>
            Press back to cancel
          </Text>
        )}
        <Text variant="body" style={styles.submitHint}>
          Tap Save to create or update vehicle profile
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  cancelHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  submitHint: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
