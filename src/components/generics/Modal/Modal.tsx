import React from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import Modal from '@material-ui/core/Modal';
import {
  ValidModalKey,
  selectModal,
  appActions,
} from '@redux/generics/AppRedux';
import './Modal.css';

interface ModalWrapperProps {
  modalKey: ValidModalKey;
  name: string;
  children: React.ReactElement<any>;
  disableDefaultClose?: boolean;
}

export interface ModalInjectedProps {
  modalData?: Object;
  handleClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal(props.modalKey));

  const handleClose = () => {
    dispatch(appActions.closeModal({ key: props.modalKey }));
  };

  const injectedProps: ModalInjectedProps = {
    modalData: modal?.data,
    handleClose,
  };

  return (
    <Modal
      open={modal?.visible}
      className={`web-app-modal ${props.name}-modal`}
      onClose={props.disableDefaultClose ? () => {} : handleClose}>
        <div className='web-app-modal-content'>
          {React.cloneElement(props.children, injectedProps)}
        </div>
    </Modal>
  );
};

export default ModalWrapper;
