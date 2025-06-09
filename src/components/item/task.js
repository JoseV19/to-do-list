import { useEffect } from 'react';
import {Stack, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTaskById, getTasks } from '../../api/todo';
import { deleteTask, setTasks } from '../../redux/taskSlice';

function Task(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        async function fetchData(){
            try{
                const data = await getTasks();
                dispatch(setTasks(data));
            }catch(error){
                console.log('Error al cargar tareas: ', error);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleDelete = async(id) => {
        try{
            await deleteTaskById(id);
            dispatch(deleteTask(id));
        }catch(error){
            console.error('Error al eliminar tarea: ', error);
        }
    };

    const viewDetails = (id) => {
        navigate(`/task/${id}`);
    };

    return (
        <Stack gap={tasks.length}>
        {tasks.map(item => (
            <Card key={item._id} className="todo-card shadow w-100">
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.dueDate}</Card.Subtitle>
                    <Card.Text>
                        {item.text}
                    </Card.Text>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button 
                            variant="secondary"
                            onClick={() => viewDetails(item._id)}
                        >Editar</Button>
                        <Button 
                            variant="danger"
                            onClick={() => handleDelete(item._id)}
                        >Eliminar</Button>
                    </div>
                </Card.Body>
            </Card>
        ))}
        {tasks.length === 0 && <h1 className='text-center text-white mt-5'>No hay tareas registradas</h1>}
        </Stack>
    )
}

export default Task;