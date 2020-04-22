import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: "https://github.com",
      techs: ['Tech1', 'Tech2']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const endpoint = '/repositories/' + id;

    await api.delete(endpoint);

    const filteredRepositories = repositories.filter(item => item.id !== id);
    
    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        { 
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ) 
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
