import React from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import { func } from 'prop-types';

function ConfirmIconGroup({ handleConfirm, handleDecline }) {
  return (
    <Stack direction="row" spacing="2">
      <IconButton
        variant="outline"
        colorScheme="red"
        aria-label="Confirm"
        fontSize="16px"
        icon={<CheckIcon />}
        onClick={handleConfirm}
      />
      <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Decline"
        fontSize="16px"
        icon={<CloseIcon />}
        onClick={handleDecline}
      />
    </Stack>
  );
}

ConfirmIconGroup.propTypes = {
  handleConfirm: func.isRequired,
  handleDecline: func.isRequired,
};

export default ConfirmIconGroup;
