import React from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { func, number, bool, string, oneOfType } from 'prop-types';

function NumberField({
  max,
  min,
  isDisabled,
  value,
  handleChange,
  step,
  precision,
}) {
  return (
    <NumberInput
      minW="100px"
      inputMode="numeric"
      max={max}
      min={min}
      keepWithinRange={false}
      clampValueOnBlur={false}
      isDisabled={isDisabled}
      value={value}
      onChange={handleChange}
      step={step}
      precision={precision}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

NumberField.propTypes = {
  max: number.isRequired,
  min: number.isRequired,
  isDisabled: bool.isRequired,
  value: oneOfType([string, number]).isRequired,
  handleChange: func.isRequired,
  step: number,
  precision: number,
};

export default NumberField;
