import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddGoal from './goalAdd';
import { getGoalById, updateGoal as updateGoalApi } from '../../api/todo';
import { updateGoal, setCurrentGoal, clearCurrentGoal } from '../../redux/goalSlice';

function GoalDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentGoal = useSelector(state => state.goals.currentGoal);

    useEffect(() => {
        async function fetchGoal() {
            try {
                const data = await getGoalById(id);
                dispatch(setCurrentGoal(data));
            } catch (error) {
                console.error('Error al obtener meta:', error);
            }
        }
        fetchGoal();

        return () => dispatch(clearCurrentGoal());
    }, [dispatch, id]);

    const handleUpdate = async (updatedGoal) => {
        try {
            const updated = await updateGoalApi(updatedGoal);
            dispatch(updateGoal(updated));
            navigate('/goals');
        } catch (error) {
            console.error('Error al actualizar meta:', error);
        }
    };

    if (!currentGoal) return <p className="text-center text-white mt-5">Cargando...</p>;

    return (
        <div className="p-4">
            <h3 className="text-center text-white mt-5">Editar Meta</h3>
            <AddGoal
                initialData={currentGoal}
                onSubmit={handleUpdate}
                isEditing={true}
            />
        </div>
    );
}

export default GoalDetail;
