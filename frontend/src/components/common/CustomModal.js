import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CustomModal = (props) => {
  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={props.fullScreen ? true : false}
        maxWidth="md"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}></DialogTitle>
        <DialogContent> {props.component}</DialogContent>
      </Dialog>
    </div>
  );
};

CustomModal.propTypes = {
  component: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
};

export default CustomModal;
