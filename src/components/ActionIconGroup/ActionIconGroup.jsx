import React from 'react';
import { DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import { ConfirmIconGroup } from '../';
import { string, func, bool, number } from 'prop-types';

function ActionIconGroup({
  fontSize,
  handlePreview,
  handleEdit,
  handleDelete,
  isDisabled,
  displayConfirmGroup,
  handleDecline,
  handleConfirm,
  selectedProdId,
  id,
}) {
  return displayConfirmGroup && selectedProdId === id ? (
    <>
      Delete?
      <ConfirmIconGroup
        handleConfirm={handleConfirm}
        handleDecline={handleDecline}
      />
    </>
  ) : (
    <Stack spacing="2" direction="row">
      <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Preview product"
        fontSize={fontSize}
        icon={<InfoOutlineIcon />}
        isDisabled={isDisabled}
        onClick={handlePreview}
      />
      <IconButton
        variant="outline"
        colorScheme="yellow"
        aria-label="Edit product"
        fontSize={fontSize}
        icon={<EditIcon />}
        isDisabled={isDisabled}
        onClick={handleEdit}
      />
      <IconButton
        variant="outline"
        colorScheme="red"
        aria-label="Delete product"
        fontSize={fontSize}
        icon={<DeleteIcon />}
        isDisabled={isDisabled}
        onClick={handleDelete}
      />
    </Stack>
  );
}

ActionIconGroup.propTypes = {
  fontSize: string,
  handlePreview: func.isRequired,
  handleEdit: func.isRequired,
  handleDelete: func.isRequired,
  isDisabled: bool,
  displayConfirmGroup: bool.isRequired,
  handleDecline: func.isRequired,
  handleConfirm: func.isRequired,
  selectedProdId: number.isRequired,
  id: number.isRequired,
};

export default ActionIconGroup;
