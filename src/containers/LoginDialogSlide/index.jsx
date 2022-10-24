/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { connect } from 'react-redux';
import { openSigninDialog, closeSigninDialog } from '../../redux/actions/dialog';
import Login from '../../pages/Login';

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => (<Slide direction="up" ref={ref} {...props} />));

function AlertDialogSlide(props) {
  const [isLogin, setIsLogin] = useState(true);
  const { open, setOpen, setClose } = props;

  const handleClickOpen = () => {
    setOpen();
  };

  const handleClose = () => {
    setClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Login isModal isLogin={isLogin} setIsLogin={setIsLogin} handleClose={handleClose} />
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default connect(
  (state) => ({ open: state.dialog }),
  { setOpen: openSigninDialog, setClose: closeSigninDialog },
)(AlertDialogSlide);
