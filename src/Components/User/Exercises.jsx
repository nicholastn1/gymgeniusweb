import React from "react";
import UserNav from "./UserNav";
import styles from "./Exercises.module.css";

const Exercises = () => {
  return (
    <section className="container">
      <div className={styles.header}>
        <h1 className="title">Exercícios</h1>
        <UserNav />
      </div>
      <div className={`${styles.content} animeLeft`}>
        {/* Conteúdo da página de exercícios */}
        <p>Conteúdo da página de exercícios</p>
      </div>
    </section>
  );
};

export default Exercises;
