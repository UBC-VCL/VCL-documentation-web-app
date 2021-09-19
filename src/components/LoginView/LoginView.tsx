import React from 'react';
import { selectIsLoggingIn } from '@redux/generics/AuthRedux';
import { useAppSelector } from '@redux/hooks';
import Modal, { ModalInjectedProps } from '@components/generics/Modal';
import { CONSTANTS, TEXT } from '@statics';
import { useHandleLogin } from './LoginService';
import LoginForm from './LoginForm';
import './LoginView.css';

type LoginViewProps = Partial<ModalInjectedProps>;

const LoginView: React.FC<LoginViewProps> = (props) => {
  const { handleClose } = props;
  const isLoggingIn = useAppSelector(selectIsLoggingIn);

  const { handleLogin, error, success } = useHandleLogin();

  const handleUserLogin = (user: string, pwd: string) => handleLogin(user, pwd);

  React.useEffect(() => {
    if (success) {
      handleClose && handleClose();
    }
  });

  return (
    <div className="login-view-root">
      <h3 className="login-view-title">{TEXT.LOGIN.TITLE}</h3>
      <LoginForm onSubmit={handleUserLogin} disabled={isLoggingIn} />
      {error && <p className="login-error">{`Error: ${error}`}</p>}
    </div>
  );
};

export const LoginModal = () => {
  return (
    <Modal name="login" modalKey={CONSTANTS.MODALS.LOGIN}>
      <LoginView />
    </Modal>
  );
};

export default LoginView;
