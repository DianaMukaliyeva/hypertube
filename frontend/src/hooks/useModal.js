import { useState } from 'react';

const useModal = (component, maxWidth) => {
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
    maxWidth,
  };
};

export default useModal;
