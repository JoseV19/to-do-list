import { Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import Goal from "../item/goal";
import Task from "../item/task";

function Home({type}){
    return (
        <div className="page-content">
            <Container className="card-stack-container">
                {type === "tasks" && <Task />}
                {type === "goals" && <Goal />}
                {!type && (
                    <div className="text-center text-white mt-5">
                        <h3>Aplicación de manejo de tareas y metas</h3>
                        <p>Selecciona una opción en el menú para comenzar.</p>
                    </div>
                )}
            </Container>
        </div>
    )
}

Home.propTypes = {
    type: PropTypes.oneOf(['tasks', 'goals'])
};

export default Home;