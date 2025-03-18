import React from "react";
import { UserContext } from "../../UserContext";
import styles from "./Profile.module.css";
import UserNav from "./UserNav";
import { ReactComponent as User } from "../../Assets/user.svg";
import { ReactComponent as Lock } from "../../Assets/security.svg"; // Reutilizando o ícone de logout como cadeado
import { ReactComponent as Settings } from "../../Assets/preferences.svg"; // Reutilizando o ícone de estatísticas como configurações
import { USER_UPDATE, USER_PREFERENCES_UPDATE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";

const Profile = () => {
  const { data, setData } = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const password = useForm("password");
  const confirmPassword = useForm("password");
  const [image, setImage] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("personal");
  const [notifications, setNotifications] = React.useState(false);
  const [reminders, setReminders] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const { request } = useFetch();

  React.useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setPreviewImage(data.image || "");
      setNotifications(data.notifications || false);
      setReminders(data.reminders || false);
      setDarkMode(data.dark_mode || false);
    }
  }, [data]);

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
    setError(null);
    setSuccess(false);
    setLoading(true);

    const token = window.localStorage.getItem("token");
    if (!token) {
      setError("Você precisa fazer login para continuar.");
      setLoading(false);
      return;
    }

    const updates = {
      user: {
        name,
      },
    };

    if (password.value) {
      if (!password.validate()) {
        setError("Por favor, corrija os erros no formulário.");
        setLoading(false);
        return;
      }
      if (password.value !== confirmPassword.value) {
        setError("As senhas não coincidem.");
        setLoading(false);
        return;
      }
      updates.user.password = password.value;
      updates.user.password_confirmation = confirmPassword.value;
    }

    if (image) {
      updates.user.image = image;
    }

    try {
      const { url, options } = USER_UPDATE(updates, token);
      const { response, json } = await request(url, options);

      if (response.ok) {
        setSuccess(true);
        if (json.user) {
          setData(json.user);
        }
        if (password.value) {
          password.reset();
          confirmPassword.reset();
        }
      } else {
        setError(json.message || "Erro ao atualizar perfil.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePreferences(event) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const token = window.localStorage.getItem("token");
    if (!token) {
      setError("Você precisa fazer login para continuar.");
      setLoading(false);
      return;
    }

    try {
      const { url, options } = USER_PREFERENCES_UPDATE(
        {
          notifications,
          reminders,
          darkMode,
        },
        token
      );
      const { response, json } = await request(url, options);

      if (response.ok) {
        setSuccess(true);
        if (json.user) {
          setData(json.user);
        }
      } else {
        setError(json.message || "Erro ao salvar preferências.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao salvar preferências.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container">
      <div className={styles.header}>
        <h1 className="title">Perfil</h1>
        <UserNav />
      </div>

      <div className={styles.profileContainer}>
        {/* Navegação lateral específica do perfil */}
        <nav className={styles.profileNav}>
          <button
            className={`${styles.profileNavItem} ${
              activeSection === "personal" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("personal")}
          >
            <User className={styles.profileNavIcon} />
            <span>Informações Pessoais</span>
          </button>
          <button
            className={`${styles.profileNavItem} ${
              activeSection === "security" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("security")}
          >
            <Lock className={styles.profileNavIcon} />
            <span>Segurança</span>
          </button>
          <button
            className={`${styles.profileNavItem} ${
              activeSection === "preferences" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("preferences")}
          >
            <Settings className={styles.profileNavIcon} />
            <span>Preferências</span>
          </button>
        </nav>

        {/* Conteúdo principal do perfil */}
        <div className={styles.profileContent}>
          {/* Seção de Informações Pessoais */}
          {activeSection === "personal" && (
            <div className={`${styles.profileSection} animeLeft`}>
              <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
              <p className={styles.sectionDescription}>
                Atualize suas informações pessoais abaixo.
              </p>

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

                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    disabled
                  />
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {success && (
                  <p className={styles.success}>
                    Perfil atualizado com sucesso!
                  </p>
                )}

                <button className={styles.button} disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar Informações"}
                </button>
              </form>
            </div>
          )}

          {/* Seção de Segurança */}
          {activeSection === "security" && (
            <div className={`${styles.profileSection} animeLeft`}>
              <h2 className={styles.sectionTitle}>Segurança</h2>
              <p className={styles.sectionDescription}>
                Altere sua senha e configure opções de segurança.
              </p>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Nova Senha</label>
                  <input
                    type="password"
                    id="password"
                    value={password.value}
                    onChange={password.onChange}
                    onBlur={password.onBlur}
                    placeholder="Digite sua nova senha"
                  />
                  {password.error && (
                    <p className={styles.error}>{password.error}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword.value}
                    onChange={confirmPassword.onChange}
                    onBlur={confirmPassword.onBlur}
                    placeholder="Confirme sua nova senha"
                  />
                  {confirmPassword.error && (
                    <p className={styles.error}>{confirmPassword.error}</p>
                  )}
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {success && (
                  <p className={styles.success}>
                    Senha atualizada com sucesso!
                  </p>
                )}

                <button className={styles.button} disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar Senha"}
                </button>
              </form>
            </div>
          )}

          {/* Seção de Preferências */}
          {activeSection === "preferences" && (
            <div className={`${styles.profileSection} animeLeft`}>
              <h2 className={styles.sectionTitle}>Preferências</h2>
              <p className={styles.sectionDescription}>
                Configure suas preferências de treino e notificações.
              </p>

              <form onSubmit={handleSavePreferences}>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span>Receber notificações de novos treinos</span>
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={reminders}
                      onChange={(e) => setReminders(e.target.checked)}
                    />
                    <span>Receber lembretes de treino</span>
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span>Modo escuro</span>
                  </label>
                </div>

                <button className={styles.button} disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Preferências"}
                </button>

                {error && <p className={styles.error}>{error}</p>}
                {success && (
                  <p className={styles.success}>
                    Preferências salvas com sucesso!
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
