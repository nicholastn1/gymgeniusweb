import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';

const LoginPasswordForgot = () => {
  const email = useForm();
  const { data, loading, error, request } = useFetch();

  function handleSubmit(event) {
    event.preventDefault();

    if (email.validate()) {
      const { url, options } = {
        url: '/api/password/forgot',
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email.value),
        },
      };

      request(url, options);
    }
  }

  return (
    <section>
      <h1 className="title">Forgot your password?</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="text" name="email" {...email} />
        <Button>Sent to Email</Button>
      </form>
    </section>
  );
};

export default LoginPasswordForgot;
