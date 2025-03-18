import React from "react";
import UserNav from "./UserNav";
import styles from "./Statistics.module.css";

const Statistics = () => {
  return (
    <section className="container">
      <div className={styles.header}>
        <h1 className="title">Estatísticas</h1>
        <UserNav />
      </div>
      <div className={`${styles.content} animeLeft`}>
        {/* Conteúdo da página de estatísticas */}
        <p>Conteúdo da página de estatísticas</p>
      </div>
    </section>
  );
};

export default Statistics;
