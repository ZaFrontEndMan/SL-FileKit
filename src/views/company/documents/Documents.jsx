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
  TextField,
  Box as MuiBox
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';
import MainFileCard from 'Components/mainFileCard/MainFileCard';
import axiosInstance from './../../../axiosInstance';
import { toast } from 'react-toastify';

const Documents = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [folderLoading, setFolderLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const getFiles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/manager/folders');
      setData(response.data?.result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddFolder = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleUploadFile = () => {
    // Handle file upload logic
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewFolderName('');
  };

  const handleCreateFolder = async () => {
    try {
      setFolderLoading(true);
      const response = await axiosInstance.post('/manager/folder/create', {
        title: newFolderName
      });
      setRefetch(!refetch);
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setFolderLoading(false);
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
        <Button color="primary" onClick={handleMenuOpen}>
          + New
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
          <MenuItem onClick={handleUploadFile}>Upload File</MenuItem>
        </Menu>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="start" alignItems="center">
          {filteredData.map((file) => (
            <Grid item key={file.id} xs={12} sm={6} md={3} lg={2}>
              <MainFileCard file={file} />
            </Grid>
          ))}
        </Grid>
      )}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <MuiBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Folder
          </Typography>
          <TextField
            fullWidth
            label="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleModalClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button disabled={folderLoading} variant="contained" color="primary" onClick={handleCreateFolder}>
              {!folderLoading ? (
                'Create'
              ) : (
                <>
                  <CircularProgress />
                </>
              )}
            </Button>
          </Box>
        </MuiBox>
      </Modal>
    </MainCard>
  );
};

export default Documents;
