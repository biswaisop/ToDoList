import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [Finished, setFinished] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    settodo(t.todo);
    const newtodos = todos.filter((items) => items.id !== id);
    settodos(newtodos);
  };

  const handleDelete = (e, id) => {
    const newtodos = todos.filter((items) => items.id !== id);
    settodos(newtodos);
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const toggleFinished = (e) => {
    setFinished(!Finished);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((items) => items.id === id);
    const newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 max-w-screen-lg rounded-xl p-5 bg-C3 text-C5 min-h-screen sm:min-h-[85vh]">
        <h1 className="font-bold text-center text-xl ">
          Mtask - Manage your all tasks
        </h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="border-[2px] border-solid rounded-md border-C6 focus:border-C5 focus:outline-none w-full px-[5px] my-3 cursor-pointer"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="border border-solid border-C5 rounded-md p-3 py-0 bg-C5 text-white transition-all ml-[0.05rem] mr-3 mb-3 w-full cursor-pointer"
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          name=""
          id=""
          checked={Finished}
          className="cursor-pointer"
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold text-C5 mt-3">Your Todos</h2>
        {todos.length === 0 && <div className="m-5">No todos to display</div>}
        <div className="todos">
          {todos.map((items) => {
            return (
              (Finished || !items.isCompleted) && (
                <div
                  key={items.id}
                  className="todo flex justify-between w-full my-3"
                >
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      name={items.id}
                      checked={items.isCompleted}
                      onChange={handleCheckbox}
                      className="cursor-pointer"
                    />
                    <div className={items.isCompleted ? "line-through " : ""}>
                      {items.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, items.id)}
                      className="border border-solid border-C5 rounded-md p-3 py-0 bg-C5 text-C3 transition-all mx-2 h-6"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, items.id)}
                      className="border border-solid border-C5 rounded-md p-3 py-0 bg-C5 text-C3 transition-all mx-2 h-6"
                    >
                      <MdDelete/>
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
