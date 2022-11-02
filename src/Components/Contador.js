export const Contador = ({ taskItems }) => (
  <h4
    className="text-white text-center p-4 mb-5 fw-bold"
    style={{ background: "#303030" }}
  >
    ToDo{" "}
    <span className="text-info">
      ({taskItems.filter((t) => !t.done).length} tareas por hacer)
    </span>
  </h4>
);
