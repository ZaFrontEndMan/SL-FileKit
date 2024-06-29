import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  Modal,
  Box as MuiBox,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';
import MainFileCard from 'Components/mainFileCard/MainFileCard';
import axiosInstance from './../../../axiosInstance';
import { toast } from 'react-toastify';
import AddRenameFolder from 'Components/company/addRenameFolder/AddRenameFolder';
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';
import {
  CreateNewFolderOutlined as CreateNewFolderOutlinedIcon,
  UploadFileOutlined as UploadFileOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  ListOutlined as ListOutlinedIcon
} from '@mui/icons-material';

const Documents = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSelection, setAnchorElSelection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderLoading, setFolderLoading] = useState(false);
  const [selectedIDS, setSelectedIDS] = useState([]);
  const [isGridDisplay, setIsGridDisplay] = useState(true); // State for display mode

  const getFiles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/manager/folders');
      setData(response.data?.result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, [refetch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((file) => file?.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelectionMenuOpen = (event) => {
    setAnchorElSelection(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSelectionMenuClose = () => {
    setAnchorElSelection(null);
  };
  const handleAddFolder = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleRenameFolderModal = (file) => {
    setModalOpen(true);
    setSelectedItem(file?.id);
    setNewFolderName(file?.title);
    handleMenuClose();
  };

  const handleTrashedFolderModal = (file) => {
    setTrashModalOpen(true);
    setSelectedItem(file?.id);
    handleMenuClose();
  };

  const handleUploadFile = () => {
    // Handle file upload logic
    handleMenuClose();
  };
  const handleCheckboxChange = (fileID) => {
    setSelectedIDS((prevSelectedIDS) =>
      prevSelectedIDS.includes(fileID) ? prevSelectedIDS.filter((id) => id !== fileID) : [...prevSelectedIDS, fileID]
    );
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setTrashModalOpen(false);
    setNewFolderName('');
    setSelectedItem(null);
  };

  const handleCreateFolder = async () => {
    try {
      setFolderLoading(true);
      await axiosInstance.post('/manager/folder/create', {
        title: newFolderName
      });
      setRefetch(!refetch);
      toast.success('Folder created successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleRenameFolder = async () => {
    try {
      setFolderLoading(true);
      await axiosInstance.post('/manager/folder/rename', {
        folder_id: selectedItem,
        title: newFolderName
      });
      setRefetch(!refetch);
      toast.success('Folder renamed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to rename folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleTrashedFolder = async () => {
    try {
      setFolderLoading(true);
      await axiosInstance.delete(`/manager/folder/delete/${selectedItem}`);
      setRefetch(!refetch);
      toast.success('Folder trashed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trash folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const toggleDisplayMode = (event, newDisplayMode) => {
    if (newDisplayMode !== null) {
      setIsGridDisplay(newDisplayMode === 'grid');
    }
  };

  return (
    <MainCard title="Documents">
      <Typography variant="h2">Manage Documents</Typography>
      <Typography variant="h6">View and manage your Documents and folders</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', my: 2, gap: 2 }}>
        <OutlinedInput
          sx={{ width: '25%', pr: 1, pl: 2 }}
          id="input-search-profile"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'weight'
          }}
        />
        <Button variant="contained" color="primary" onClick={handleMenuOpen}>
          + New
        </Button>
        {selectedIDS?.length > 0 && (
          <Button variant="outlined" color="primary" onClick={handleSelectionMenuOpen}>
            Manage Selection
          </Button>
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleAddFolder}>
            <CreateNewFolderOutlinedIcon sx={{ mr: 1 }} />
            Add Folder
          </MenuItem>
          <MenuItem onClick={handleUploadFile}>
            <UploadFileOutlinedIcon sx={{ mr: 1 }} />
            Upload File
          </MenuItem>
        </Menu>
        <Menu anchorEl={anchorElSelection} open={Boolean(anchorElSelection)} onClose={handleSelectionMenuClose}>
          <MenuItem>
            <ListItemIcon>
              <StarBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Favourite Selection" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Trash Selection" />
          </MenuItem>
        </Menu>
        <Box sx={{ marginLeft: 'auto' }}>
          {' '}
          {/* This pushes ToggleButtonGroup to the end */}
          <ToggleButtonGroup value={isGridDisplay ? 'grid' : 'list'} exclusive onChange={toggleDisplayMode} aria-label="display mode">
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isGridDisplay ? (
            <Grid container spacing={2} justifyContent="start" alignItems="center">
              {filteredData.map((file) => (
                <Grid item key={file.id} xs={12} sm={6} md={6} lg={3} xl={2}>
                  <MainFileCard
                    selectedIDS={selectedIDS}
                    setSelectedIDS={setSelectedIDS}
                    handleCheckboxChange={handleCheckboxChange}
                    file={file}
                    onClickFavourite={() => {
                      console.log(file?.id);
                    }}
                    onClickRename={() => {
                      handleRenameFolderModal(file);
                    }}
                    onClickTrash={() => {
                      handleTrashedFolderModal(file);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <MuiBox>
              {filteredData.map((file) => (
                <MainFileCard
                  key={file.id}
                  selectedIDS={selectedIDS}
                  setSelectedIDS={setSelectedIDS}
                  handleCheckboxChange={handleCheckboxChange}
                  file={file}
                  onClickFavourite={() => {
                    console.log(file?.id);
                  }}
                  onClickRename={() => {
                    handleRenameFolderModal(file);
                  }}
                  onClickTrash={() => {
                    handleTrashedFolderModal(file);
                  }}
                />
              ))}
            </MuiBox>
          )}
        </>
      )}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <AddRenameFolder
          closeModal={handleModalClose}
          createFolder={handleCreateFolder}
          renameFolder={handleRenameFolder}
          title={selectedItem ? 'Rename Folder' : 'Add Folder'}
          folderName={newFolderName}
          setFolderName={setNewFolderName}
          folderLoading={folderLoading}
        />
      </Modal>
      <Modal open={trashModalOpen} onClose={handleModalClose}>
        <DeleteModal
          title="Delete Folder"
          handleModalClose={handleModalClose}
          refetch={refetch}
          setRefetch={setRefetch}
          folderLoading={folderLoading}
          handleDelete={handleTrashedFolder}
        />
      </Modal>
    </MainCard>
  );
};

export default Documents;
