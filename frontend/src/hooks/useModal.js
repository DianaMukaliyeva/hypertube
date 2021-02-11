import { useState } from 'react';

const useModal = (component, fullScreen) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return {
    component,
    open,
    setOpen,
    handleClickOpen,
    handleClose,
    fullScreen,
  };
};

export default useModal;
