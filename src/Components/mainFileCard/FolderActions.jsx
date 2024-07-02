import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EditNoteIcon from '@mui/icons-material/EditNote';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListIcon from '@mui/icons-material/List';
const FolderActions = ({
  //add to favourite
  favourite = true,
  onClickFavourite,
  isDisableFavourite = false,

  //remove from Favourite
  removeFavourite = false,
  onClickremoveFavourite,
  isDisableRemoveFavourite,

  //add to rename
  rename = true,
  onClickRename,
  isDisableRename = false,

  // move to trash
  trash = true,
  onClickTrash,
  isDisableTrash = false
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <ListIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {favourite && (
          <MenuItem disabled={isDisableFavourite} onClick={onClickFavourite}>
            <ListItemIcon>
              <StarOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Add To Favourites'} />
          </MenuItem>
        )}
        {removeFavourite && (
          <MenuItem disabled={isDisableRemoveFavourite} onClick={onClickremoveFavourite}>
            <ListItemIcon>
              <ClearOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Remove From Favourites'} />
          </MenuItem>
        )}
        {rename && (
          <MenuItem disabled={isDisableRename} onClick={onClickRename}>
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Rename'} />
          </MenuItem>
        )}
        {trash && (
          <MenuItem onClick={onClickTrash}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Move To Trash'} />
          </MenuItem>
        )}

        {/* {onClickCopyContent && (
          <MenuItem onClick={onClickCopyContent}>
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
            <ListItemText primary={copyContent} />
          </MenuItem>
        )} */}
      </Menu>
    </div>
  );
};

export default FolderActions;
