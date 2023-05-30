import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { FORGOT_PASSWORD } from '../../api';
import Error from '../Helper/Error';

const LoginPasswordForgot = () => {
  const user = useForm();
  const { data, loading, error, request } = useFetch();
  console.log(error);

  async function handleSubmit(event) {
    event.preventDefault();

    if (user.validate()) {
      const { url, options } = FORGOT_PASSWORD({
        user: { email: user.value },
      });

      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section>
      <h1 className="title">Forgot your password?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="text" name="user" {...user} />
          {loading ? (
            <Button disabled>Sending...</Button>
          ) : (
            <Button>Sent to Email</Button>
          )}

          {<Error error={error} />}
        </form>
      )}
    </section>
  );
};

export default LoginPasswordForgot;
