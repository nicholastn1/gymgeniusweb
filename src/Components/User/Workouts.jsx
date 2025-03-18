import React from "react";
import UserNav from "./UserNav";
import styles from "./Workouts.module.css";
import { ReactComponent as AddIcon } from "../../Assets/add.svg";

const Workouts = () => {
  const [workouts, setWorkouts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingWorkout, setEditingWorkout] = React.useState(null);

  // Simulando o carregamento de treinos do backend
  React.useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulando uma chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dados de exemplo
        const sampleWorkouts = [
          {
            id: 1,
            name: "Treino A - Peito e Tríceps",
            description: "Foco em peito e tríceps com exercícios compostos.",
            exercises: [
              { name: "Supino Reto", sets: 4, reps: "8-12" },
              { name: "Supino Inclinado", sets: 3, reps: "10-12" },
              { name: "Crucifixo", sets: 3, reps: "12-15" },
              { name: "Tríceps Corda", sets: 4, reps: "10-12" },
              { name: "Tríceps Francês", sets: 3, reps: "10-12" },
            ],
            createdAt: "2023-05-15",
          },
          {
            id: 2,
            name: "Treino B - Costas e Bíceps",
            description: "Foco em costas e bíceps com exercícios compostos.",
            exercises: [
              { name: "Barra Fixa", sets: 4, reps: "8-10" },
              { name: "Remada Curvada", sets: 4, reps: "8-12" },
              { name: "Puxada Alta", sets: 3, reps: "10-12" },
              { name: "Rosca Direta", sets: 3, reps: "10-12" },
              { name: "Rosca Martelo", sets: 3, reps: "10-12" },
            ],
            createdAt: "2023-05-16",
          },
          {
            id: 3,
            name: "Treino C - Pernas e Ombros",
            description: "Foco em pernas e ombros com exercícios compostos.",
            exercises: [
              { name: "Agachamento", sets: 4, reps: "8-10" },
              { name: "Leg Press", sets: 4, reps: "10-12" },
              { name: "Cadeira Extensora", sets: 3, reps: "12-15" },
              { name: "Desenvolvimento", sets: 4, reps: "8-12" },
              { name: "Elevação Lateral", sets: 3, reps: "12-15" },
            ],
            createdAt: "2023-05-17",
          },
        ];

        setWorkouts(sampleWorkouts);
      } catch (err) {
        setError("Erro ao carregar treinos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddWorkout = () => {
    setEditingWorkout(null);
    setModalOpen(true);
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setModalOpen(true);
  };

  const handleDeleteWorkout = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este treino?")) {
      setLoading(true);

      try {
        // Simulando uma chamada à API
        await new Promise((resolve) => setTimeout(resolve, 500));

        setWorkouts(workouts.filter((workout) => workout.id !== id));
      } catch (err) {
        setError("Erro ao excluir treino. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveWorkout = async (workoutData) => {
    setLoading(true);

    try {
      // Simulando uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (editingWorkout) {
        // Atualizando treino existente
        setWorkouts(
          workouts.map((workout) =>
            workout.id === editingWorkout.id
              ? { ...workout, ...workoutData }
              : workout
          )
        );
      } else {
        // Adicionando novo treino
        const newWorkout = {
          id: Date.now(),
          ...workoutData,
          createdAt: new Date().toISOString().split("T")[0],
        };

        setWorkouts([...workouts, newWorkout]);
      }

      setModalOpen(false);
      setEditingWorkout(null);
    } catch (err) {
      setError("Erro ao salvar treino. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <div className={styles.header}>
        <h1 className="title">Treinos</h1>
        <UserNav />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.addButton}
          onClick={handleAddWorkout}
          disabled={loading}
        >
          <AddIcon />
          Adicionar Treino
        </button>
      </div>

      {loading && <p className={styles.loading}>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && workouts.length === 0 && (
        <div className={styles.emptyState}>
          <p>Você ainda não possui treinos cadastrados.</p>
          <button className={styles.addButton} onClick={handleAddWorkout}>
            Criar meu primeiro treino
          </button>
        </div>
      )}

      <div className={`${styles.workoutsList} animeLeft`}>
        {workouts.map((workout) => (
          <div key={workout.id} className={styles.workoutCard}>
            <div className={styles.workoutHeader}>
              <h2>{workout.name}</h2>
              <div className={styles.workoutActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditWorkout(workout)}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteWorkout(workout.id)}
                >
                  Excluir
                </button>
              </div>
            </div>

            <p className={styles.workoutDescription}>{workout.description}</p>

            <div className={styles.exercisesList}>
              <h3>Exercícios:</h3>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index} className={styles.exerciseItem}>
                    <span className={styles.exerciseName}>{exercise.name}</span>
                    <span className={styles.exerciseDetails}>
                      {exercise.sets} séries x {exercise.reps} repetições
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.workoutFooter}>
              <span className={styles.workoutDate}>
                Criado em: {workout.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <WorkoutModal
          workout={editingWorkout}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveWorkout}
          loading={loading}
        />
      )}
    </section>
  );
};

const WorkoutModal = ({ workout, onClose, onSave, loading }) => {
  const [name, setName] = React.useState(workout ? workout.name : "");
  const [description, setDescription] = React.useState(
    workout ? workout.description : ""
  );
  const [exercises, setExercises] = React.useState(
    workout ? workout.exercises : [{ name: "", sets: 3, reps: "10-12" }]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação básica
    if (!name.trim()) {
      alert("Por favor, informe o nome do treino.");
      return;
    }

    if (exercises.some((ex) => !ex.name.trim())) {
      alert("Por favor, preencha o nome de todos os exercícios.");
      return;
    }

    onSave({
      name,
      description,
      exercises,
    });
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 3, reps: "10-12" }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };
    setExercises(updatedExercises);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.modalTitle}>
          {workout ? "Editar Treino" : "Novo Treino"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Treino</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Treino A - Peito e Tríceps"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o objetivo deste treino"
              rows="3"
            />
          </div>

          <div className={styles.exercisesSection}>
            <div className={styles.exercisesHeader}>
              <h3>Exercícios</h3>
              <button
                type="button"
                className={styles.addExerciseButton}
                onClick={addExercise}
              >
                + Adicionar Exercício
              </button>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className={styles.exerciseForm}>
                <div className={styles.exerciseFormRow}>
                  <div className={styles.exerciseNameField}>
                    <label htmlFor={`exercise-${index}`}>
                      Nome do Exercício
                    </label>
                    <input
                      type="text"
                      id={`exercise-${index}`}
                      value={exercise.name}
                      onChange={(e) =>
                        updateExercise(index, "name", e.target.value)
                      }
                      placeholder="Ex: Supino Reto"
                      required
                    />
                  </div>

                  <div className={styles.exerciseSetsField}>
                    <label htmlFor={`sets-${index}`}>Séries</label>
                    <input
                      type="number"
                      id={`sets-${index}`}
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(
                          index,
                          "sets",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="1"
                      required
                    />
                  </div>

                  <div className={styles.exerciseRepsField}>
                    <label htmlFor={`reps-${index}`}>Repetições</label>
                    <input
                      type="text"
                      id={`reps-${index}`}
                      value={exercise.reps}
                      onChange={(e) =>
                        updateExercise(index, "reps", e.target.value)
                      }
                      placeholder="Ex: 8-12"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.removeExerciseButton}
                    onClick={() => removeExercise(index)}
                    disabled={exercises.length === 1}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Treino"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Workouts;
