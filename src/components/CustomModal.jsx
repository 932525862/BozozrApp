import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({
  open,
  title = 'Modal Title',
  children,
  onCancel
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={false}
      centered={true}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
