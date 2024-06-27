import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EditNoteIcon from '@mui/icons-material/EditNote';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListIcon from '@mui/icons-material/List';
const FolderActions = () =>
  //     {
  //   translate: t,

  //   // view
  //   onClickView,
  //   viewContent = t('view_key'),

  //   // edit
  //   onClickEdit,
  //   isDisabledEdit = false,

  //   // delete
  //   onClickDelete,
  //   isDisabledDelete = false,

  //   // print preview
  //   onClickPrintPreview,
  //   printPreviewContent = t('print_preview_key'),
  //   isDisabledPrintPreview,

  //   // print certificate
  //   onClickPrintCertificate,
  //   printCertificateContent = t('print_certificate_key'),
  //   isDisabledPrintCertificate,

  //   // print Customer Copy
  //   onClickPrintCustomerCopy,
  //   printCustomerCopyContent,

  //   // print jv
  //   onClickPrintJV,
  //   isDisabledPrintJV,

  //   // print record
  //   onClickPrintRecord,
  //   isDisabledPrintRecord,

  //   // export record
  //   onClickExportRecord,
  //   isDisabledExportRecord,

  //   // activate
  //   onClickActivate,
  //   isDisabledActivate = false,
  //   activeContent,

  //   // Approve
  //   onClickApprove,
  //   isDisabledApprove = false,

  //   // Reject
  //   onClickReject,
  //   isDisabledReject = false,

  //   // send via email
  //   onClickSendEmail,

  //   // send via whatsapp
  //   onClickSendWhatsapp,

  //   // invoice update receipts
  //   onClickUpdateReceipts,
  //   updateContent = t('invoice_update_receipts_key'),

  //   // download attachment
  //   onClickDownloadAttachment,

  //   // new invoice print
  //   onClickNewInvoicePrint,
  //   printNewInvoiceContent,

  //   onClickCopyContent,
  //   copyContent = t('copy_content_key'),

  //   children
  // }
  {
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <StarOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Add To Favourite'} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Rename'} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Move To Trash'} />
          </MenuItem>

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
