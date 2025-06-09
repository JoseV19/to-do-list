import { useEffect } from 'react';
import {Stack, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteGoalById, getGoals } from '../../api/todo';
import { deleteGoal, setGoals } from '../../redux/goalSlice';



function Goal(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goals = useSelector(state => state.goals.goals);

    useEffect(() => {
        async function fetchData(){
            try{
                const data = await getGoals();
                dispatch(setGoals(data));
            }catch(error){
                console.error('Error al cargar tareas: ', error);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleDelete = async(id) => {
        try{
            await deleteGoalById(id);
            dispatch(deleteGoal(id));
        }catch(error){
            console.error('Error al eliminar meta: ', error);
        }
    };

    const viewDetails = (id) => {
        navigate(`/goal/${id}`);
    }

    return (
        <Stack gap={goals.length}>
        {goals.map(item => (
            <Card key={item.id} className="todo-card shadow w-100">
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
        {goals.length === 0 && <h1 className='text-center text-white mt-5'>No hay metas registradas</h1>}
        </Stack>
    )
}

export default Goal;