import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({
  open,
  title = 'Modal Title',
  children,
  onCancel,
  width = 520,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={false}
      centered={true}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
