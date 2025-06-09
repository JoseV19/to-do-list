import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();
    
    return (
        <Navbar expand="md" bg="dark" variant='dark' className='shadow-sm'>
            <Container>
                <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    TodoList
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/tasks')}>Tareas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/goals')}>Metas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/add-task')}>Crear Tarea</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/add-goal')}>Crear Meta</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => alert('Saliendo...')}>Salir</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );
}

export default Navigation;