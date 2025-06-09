import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './taskAdd';
import { getTaskById, updateTask as updateTaskApi } from '../../api/todo';
import { updateTask, setCurrentTask, clearCurrentTask } from '../../redux/taskSlice';

function TaskDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentTask = useSelector(state => state.tasks.currentTask);

    useEffect(() => {
        async function fetchTask() {
            try {
                const data = await getTaskById(id);
                dispatch(setCurrentTask(data));
            } catch (error) {
                console.error('Error al obtener tarea:', error);
            }
        }
        fetchTask();

        return () => dispatch(clearCurrentTask());
    }, [dispatch, id]);

    const handleUpdate = async (updatedTask) => {
        try {
            const updated = await updateTaskApi(updatedTask);
            dispatch(updateTask(updated));
            navigate('/tasks');
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
        }
    };

    if (!currentTask) return <p className="text-center text-white mt-5">Cargando...</p>;

    return (
        <div className="p-4">
            <h3 className="text-center text-white mt-5">Editar Tarea</h3>
            <AddTask
                initialData={currentTask}
                onSubmit={handleUpdate}
                isEditing={true}
            />
        </div>
    );
}

export default TaskDetail;
