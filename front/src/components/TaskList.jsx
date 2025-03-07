import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../services/taskService";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleAddTask = async () => {
        if (!title || !description) return;
        await createTask({ title, description });
        setTitle("");
        setDescription("");
        loadTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.description}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
