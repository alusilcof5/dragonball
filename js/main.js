import { fetchCharacterJson } from './api.js';

function createCharacterCard({image, name, race, gender, ki, max_ki, affiliation}) {
    return `
        <div class="character-card">
            <img src="${image}" alt="${name}">
            <div class="character-details">
                <h5>${name}</h5>
                <p>${race} - ${gender}</p>
                <ul>
                    <li>Ki: ${ki}</li>
                    <li>Maximum Ki: ${max_ki}</li>
                    <li>Affiliation: ${affiliation}</li>
                </ul>
            </div>
        </div>`;
}

async function displayCharacters() {
    const characterSection = document.getElementById('charactersection');
    try {
        const data = await fetchCharacterJson();
        const characters = data?.items || data;
        
        characterSection.innerHTML = characters && Array.isArray(characters) && characters.length > 0
            ? characters.map(createCharacterCard).join('')
            : '<p>No se encontraron personajes</p>';
    } catch (error) {
        characterSection.innerHTML = '<p>Error al cargar los datos</p>';
    }
}

document.addEventListener('DOMContentLoaded', displayCharacters);