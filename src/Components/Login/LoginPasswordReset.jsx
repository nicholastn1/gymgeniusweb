import React from 'react';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { RESET_PASSWORD } from '../../api';
import { useNavigate } from 'react-router-dom';

const LoginPasswordReset = () => {
  const [email, setEmail] = React.useState();
  const [token, setToken] = React.useState();
  const password = useForm('password');
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = RESET_PASSWORD({
        user: {
          email: email,
          token: token,
          password: password.value,
        },
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('reset_password_token');
    const email = params.get('email');
    if (token) setToken(token);
    if (email) setEmail(email);
  }, []);

  return (
    <div>
      <h1 className="title">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetting...</Button>
        ) : (
          <Button>Reset Password</Button>
        )}
        <Error error={error} />
      </form>
    </div>
  );
};

export default LoginPasswordReset;
