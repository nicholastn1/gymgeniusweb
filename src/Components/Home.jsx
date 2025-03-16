import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { ReactComponent as WorkoutsIcon } from "../Assets/workouts.svg";
import { ReactComponent as ExercisesIcon } from "../Assets/exercises.svg";
import { ReactComponent as StatisticsIcon } from "../Assets/statistics.svg";
import { UserContext } from "../UserContext";

const Home = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className={`${styles.home} container`}>
      <div className={styles.intro}>
        <h1 className="title">GymGenius</h1>
        <p>
          Sua plataforma completa para gerenciar treinos e acompanhar seu
          progresso fitness.
        </p>
        {!data ? (
          <Link to="/login" className={styles.loginButton}>
            Comece Agora
          </Link>
        ) : (
          <Link to="/workouts" className={styles.loginButton}>
            Minha Conta
          </Link>
        )}
      </div>

      <div className={styles.features}>
        <h2 className={styles.featuresTitle}>Recursos</h2>
        <ul className={`${styles.featuresList} animeLeft`}>
          <li className={styles.featuresItem}>
            <div className={styles.featuresIcon}>
              <WorkoutsIcon />
            </div>
            <h3>Treinos Personalizados</h3>
            <p>
              Crie e gerencie treinos personalizados de acordo com seus
              objetivos e nível de condicionamento físico.
            </p>
          </li>

          <li className={styles.featuresItem}>
            <div className={styles.featuresIcon}>
              <ExercisesIcon />
            </div>
            <h3>Biblioteca de Exercícios</h3>
            <p>
              Acesse nossa extensa biblioteca de exercícios com instruções
              detalhadas e vídeos demonstrativos.
            </p>
          </li>

          <li className={styles.featuresItem}>
            <div className={styles.featuresIcon}>
              <StatisticsIcon />
            </div>
            <h3>Acompanhamento de Progresso</h3>
            <p>
              Monitore seu progresso com gráficos e estatísticas detalhadas para
              visualizar sua evolução ao longo do tempo.
            </p>
          </li>
        </ul>
      </div>

      <div className={styles.cta}>
        <h2>Pronto para transformar seus treinos?</h2>
        <p>
          Junte-se a milhares de usuários que já estão otimizando seus
          resultados com o GymGenius.
        </p>
        {!data ? (
          <Link to="/login" className={styles.ctaButton}>
            Criar Conta Gratuita
          </Link>
        ) : (
          <Link to="/workouts" className={styles.ctaButton}>
            Acessar Minha Conta
          </Link>
        )}
      </div>
    </section>
  );
};

export default Home;
