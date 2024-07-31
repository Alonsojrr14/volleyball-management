let playerCount = 0;

document.getElementById('add-player').addEventListener('click', () => {
    const name = document.getElementById('name1').value.trim();
    const skill = parseInt(document.getElementById('skill1').value);
    const position = document.getElementById('position1').value;

    if (!name || isNaN(skill) || !position) {
        showCustomAlert('Por favor, preencha todos os campos.');
        return;
    }

    const playerRows = document.querySelectorAll('#player-list tbody tr').length;
    if (playerRows >= 16) {
        showCustomAlert('Você não pode adicionar mais de 16 jogadores.');
        return;
    }

    addPlayerToTable(name, skill, position);

    document.getElementById('name1').value = '';
    document.getElementById('skill1').value = '';
    document.getElementById('position1').value = '';
});

function addPlayerToTable(name, skill, position) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${skill}</td>
        <td>${position}</td>
        <td>
            <button type="button" class="edit-player" onclick="editPlayer(this)">Editar</button>
            <button type="button" class="remove-player" onclick="removePlayer(this)">Remover</button>
        </td>
    `;
    document.getElementById('player-list').appendChild(row);
    playerCount++;
    document.getElementById('player-count').innerText = playerCount;
}

function editPlayer(button) {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    row.innerHTML = `
        <td><input type="text" value="${cells[0].innerText}"></td>
        <td><input type="number" min="1" max="5" value="${cells[1].innerText}"></td>
        <td>
            <select>
                <option value="levantador" ${cells[2].innerText === 'Levantador' ? 'selected' : ''}>Levantador</option>
                <option value="atacante" ${cells[2].innerText === 'Atacante' ? 'selected' : ''}>Atacante</option>
                <option value="libero" ${cells[2].innerText === 'Líbero' ? 'selected' : ''}>Líbero</option>
                <option value="central" ${cells[2].innerText === 'Central' ? 'selected' : ''}>Central</option>
                <option value="ponteiro" ${cells[2].innerText === 'Ponteiro' ? 'selected' : ''}>Ponteiro</option>
                <option value="joga-em-tudo-bom" ${cells[2].innerText === 'Joga em Tudo Bom' ? 'selected' : ''}>Joga em Tudo Bom</option>
                <option value="joga-em-tudo-ruim" ${cells[2].innerText === 'Joga em Tudo Ruim' ? 'selected' : ''}>Joga em Tudo Ruim</option>
            </select>
        </td>
        <td>
            <button type="button" class="save-player" onclick="savePlayer(this)">Salvar</button>
            <button type="button" class="cancel-edit" onclick="cancelEdit(this)">Cancelar</button>
        </td>
    `;
}

function savePlayer(button) {
    const row = button.parentElement.parentElement;
    const inputs = row.querySelectorAll('input, select');

    row.innerHTML = `
        <td>${inputs[0].value}</td>
        <td>${inputs[1].value}</td>
        <td>${inputs[2].value}</td>
        <td>
            <button type="button" class="edit-player" onclick="editPlayer(this)">Editar</button>
            <button type="button" class="remove-player" onclick="removePlayer(this)">Remover</button>
        </td>
    `;
}

function cancelEdit(button) {
    const row = button.parentElement.parentElement;
    const inputs = row.querySelectorAll('input, select');

    row.innerHTML = `
        <td>${inputs[0].value}</td>
        <td>${inputs[1].value}</td>
        <td>${inputs[2].value}</td>
        <td>
            <button type="button" class="edit-player" onclick="editPlayer(this)">Editar</button>
            <button type="button" class="remove-player" onclick="removePlayer(this)">Remover</button>
        </td>
    `;
}

function removePlayer(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    playerCount--;
    document.getElementById('player-count').innerText = playerCount;
}

document.getElementById('draw-teams').addEventListener('click', () => {
    const players = Array.from(document.querySelectorAll('#player-list tbody tr'));
    if (players.length === 0) {
        showCustomAlert('Selecione 16 jogadores.');
        return;
    }

    const shuffled = shuffleArray(players);
    const teams = createTeams(shuffled);
    showTeams(teams);
});

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createTeams(players) {
    const numTeams = 4;
    const teams = Array.from({ length: numTeams }, () => []);
    players.forEach((player, index) => {
        teams[index % numTeams].push(player);
    });
    return teams;
}

function showTeams(teams) {
    const modal = document.getElementById('modal');
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';

    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.innerHTML = `<h2>Time ${index + 1}</h2>`;
        team.forEach(player => {
            teamDiv.innerHTML += `<p>${player.children[0].innerText}</p>`;
        });
        teamsContainer.appendChild(teamDiv);
    });

    modal.style.display = 'block';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function showCustomAlert(message) {
    document.getElementById('alert-message').innerText = message;
    const modal = document.getElementById('custom-alert');
    modal.style.display = 'block';

    document.querySelector('.close-alert').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
