import React from 'react';
import { DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import { string, func } from 'prop-types';

function ActionIconGroup({
  fontSize,
  handlePreview,
  handleEdit,
  handleDelete,
}) {
  return (
    <Stack spacing="2" direction="row">
      <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Preview product"
        fontSize={fontSize}
        icon={<InfoOutlineIcon />}
        onClick={handlePreview}
      />
      <IconButton
        variant="outline"
        colorScheme="yellow"
        aria-label="Edit product"
        fontSize={fontSize}
        icon={<EditIcon />}
        onClick={handleEdit}
      />
      <IconButton
        variant="outline"
        colorScheme="red"
        aria-label="Delete product"
        fontSize={fontSize}
        icon={<DeleteIcon />}
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
};

export default ActionIconGroup;
