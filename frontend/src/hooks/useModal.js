import { useState } from 'react';

const useModal = (component) => {
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
  };
};

export default useModal;
