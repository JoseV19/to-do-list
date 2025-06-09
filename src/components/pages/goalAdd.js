import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addGoal, deleteGoal } from "../../redux/goalSlice";
import { addGoal as addGoalAPI, deleteGoalById } from "../../api/todo";


function AddGoal({
        initialData = {},
        onSubmit,
        isEditing = false
    }){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ dueDate, setDueDate ] = useState('');

    useEffect(() => {
        if(isEditing && initialData){
            setTitle(initialData.title || '');
            setDueDate(initialData.dueDate || '');
        }
    }, [isEditing, initialData?.id]);

    const handleDelete = async () => {
        if(!id) return;
        try {
            await deleteGoalById(id);
            dispatch(deleteGoal(id));
            navigate('/goals');
        } catch (error) {
            console.error('Error al eliminar meta:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goal = { title, dueDate };

        if(isEditing && onSubmit){
            const toUpdate = goal;
            toUpdate._id = id;
            toUpdate.progress = 0;
            onSubmit(toUpdate);
        }else{
            try{
                const created = await addGoalAPI(goal);
                dispatch(addGoal(created));
                setTitle('');
                setDueDate('');
            }catch (error){
                console.error('Error al agregar meta: ', error);
            }
        }
    };

    return (
        <div className="page-content">
            <Container className="card-stack-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Escribe el título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dueDate">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control 
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-between mt-3'>
                        <Button variant="primary" type="submit">
                            { isEditing ? 'Actualizar' : 'Agregar' }
                        </Button>
                        {isEditing && (
                        <Button variant='danger' onClick={handleDelete}>
                            Eliminar
                        </Button>
                        )}
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default AddGoal;