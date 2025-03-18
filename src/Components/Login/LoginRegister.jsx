import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import styles from "./LoginRegister.module.css";
import { ReactComponent as User } from "../../Assets/user.svg";

const LoginRegister = () => {
  const name = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const [image, setImage] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (name.validate() && email.validate() && password.validate()) {
      const userData = {
        user: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      };

      if (image) {
        userData.user.image = image;
      }

      const { url, options } = USER_POST(userData);
      const { response } = await request(url, options);
      if (response.ok) userLogin(email.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.imageUploadContainer}>
          <div className={styles.imagePreview}>
            {previewImage ? (
              <img src={previewImage} alt="Foto do perfil" />
            ) : (
              <User />
            )}
          </div>
          <div className={styles.imageUploadActions}>
            <label htmlFor="image" className={styles.imageUploadButton}>
              {previewImage ? "Alterar foto" : "Adicionar foto"}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.imageInput}
            />
            {previewImage && (
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={() => {
                  setImage("");
                  setPreviewImage("");
                }}
              >
                Remover foto
              </button>
            )}
          </div>
        </div>

        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginRegister;
