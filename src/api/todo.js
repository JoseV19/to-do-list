const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_API_KEY;
const headers = {
    'Content-Type': 'application/json',
    Authorization: `${TOKEN}`
};

//GOALS
export async function getGoals(){
    const response = await fetch(`${API_URL}/getGoals`, { headers });
    return await response.json();
};

export async function getGoalById(id) {
    const res = await fetch(`${API_URL}/getGoal/${id}`, { headers });
    return await res.json();
}

export async function addGoal(goal) {
    const res = await fetch(`${API_URL}/addGoal`, {
        method: 'POST',
        headers,
        body: JSON.stringify(goal)
    });
    return await res.json();
}

export async function deleteGoalById(id) {
    const res = await fetch(`${API_URL}/removeGoal/${id}`, {
        method: 'DELETE',
        headers
    });
    return await res.json();
}

export async function updateGoal(goal) {
    console.log('Sending goal:', goal);
    const res = await fetch(`${API_URL}/updateGoal`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(goal)
    });
    return await res.json();
}


//TASKS
export async function getTasks() {
    const res = await fetch(`${API_URL}/getTasks`, { headers });
    return await res.json();
}

export async function getTaskById(id) {
    const res = await fetch(`${API_URL}/getTask/${id}`, { headers });
    return await res.json();
}

export async function addTask(task) {
    const res = await fetch(`${API_URL}/addTask`, {
        method: 'POST',
        headers,
        body: JSON.stringify(task)
    });

    if(!res.ok){
        const errorText = await res.json();
        throw new Error(`Error en API: ${res.stats} - ${errorText}`);
    }

    return await res.json();
}

export async function deleteTaskById(id) {
    const res = await fetch(`${API_URL}/removeTask/${id}`, {
        method: 'DELETE',
        headers
    });
    return await res.json();
}

export async function updateTask(task) {
    const res = await fetch(`${API_URL}/updateTask`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(task)
    });
    return await res.json();
}
