import "./styles.css";
import { useState, useEffect } from "react";
import { Contador } from "./Components/Contador";
import { TaskCreator } from "./Components/AñadirTarea";
import { VisibilityControl } from "./Components/Control";
import { TaskTable } from "./Components/Tablero";
import { Container } from "./Components/Contenedor";

function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setshowCompleted] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("task");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName))
      setTaskItems([...taskItems, { name: taskName, done: false }]);
  };

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };

  return (
    <main className="bg-black vh-100 text-white">
      <Contador taskItems={taskItems} />
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <VisibilityControl
          description=" las tareas completadas"
          isChecked={showCompleted}
          callback={(checked) => setshowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
