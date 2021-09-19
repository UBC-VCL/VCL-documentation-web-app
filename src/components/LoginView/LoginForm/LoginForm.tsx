import React from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import Button from '@components/generics/Button';
import { TEXT, CONSTANTS } from '@statics';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  disabled?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const schema = React.useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .min(CONSTANTS.MIN_USERNAME_LENGTH, TEXT.LOGIN.USERNAME_LENGTH_ERROR)
          .required(TEXT.LOGIN.USERNAME_EMPTY_ERROR),

        password: yup
          .string()
          .required(TEXT.LOGIN.PASSWORD_EMPTY_ERROR),
      }),
    []
  );

  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      props.onSubmit(values.username, values.password);
    },
  });

  return (
    <form className="login-form-root" onSubmit={form.handleSubmit}>
      <TextField
        name="username"
        label={TEXT.LOGIN.USERNAME}
        variant="outlined"
        value={form.values.username}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={Boolean(form.touched.username) && Boolean(form.errors.username)}
        helperText={form.touched.username && form.errors.username}
        className="login-form-field"
      />
      <TextField
        name="password"
        label={TEXT.LOGIN.PASSWORD}
        variant="outlined"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={Boolean(form.touched.password) && Boolean(form.errors.password)}
        helperText={form.touched.password && form.errors.password}
        type="password"
        className="login-form-field"
      />
      <Button
        variant="contained"
        disableElevation
        type="submit"
        disabled={props.disabled}>
        {TEXT.COMMON.SUBMIT}
      </Button>
    </form>
  );
};

export default LoginForm;
