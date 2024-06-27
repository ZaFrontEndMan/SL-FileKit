import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Checkbox, Grid, Typography, Box } from '@mui/material';
import folderImg from '../../assets/images/filesImgs/folder.png';
import fileImg from '../../assets/images/filesImgs/file.png';
import pdfImg from '../../assets/images/filesImgs/pdf.png';
import docxImg from '../../assets/images/filesImgs/docx.png';
import musicImg from '../../assets/images/filesImgs/music.png';
import imageImg from '../../assets/images/filesImgs/image.png';
import jsonImg from '../../assets/images/filesImgs/json.png';
import txtImg from '../../assets/images/filesImgs/txt.png';
import FolderActions from './FolderActions';

const fileTypeToImg = {
  folder: folderImg,
  file: fileImg,
  pdf: pdfImg,
  docx: docxImg,
  music: musicImg,
  image: imageImg,
  json: jsonImg,
  txt: txtImg
};

const MainFileCard = ({ file }) => {
  const fileImgSrc = fileTypeToImg[file?.type] || fileImg;

  return (
    <Card sx={{ cursor: 'pointer', border: '1px solid lightGray' }}>
      <CardContent>
        <Grid container alignItems="start" justifyContent="space-between">
          <Grid item>
            <Checkbox />
          </Grid>
          <Grid item>
            <img width={80} src={fileImgSrc} alt={file?.type} />
          </Grid>
          <Grid item>
            <FolderActions />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h6">{file?.title || 'Untitled'}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

MainFileCard.propTypes = {
  file: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string
  })
};

export default MainFileCard;
