const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}
const togglePlayers = displayStyle => {
    document.getElementById("players").style.display = displayStyle;
}
const loadPlayers = () => {
    const searchText = document.getElementById("input-field").value;
    toggleSpinner("block");
    togglePlayers("none");

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayer(data.player))
    
        document.getElementById("input-field").value = '';
}

const displayPlayer = players => {
    const playersContainer = document.getElementById("players");
    playersContainer.textContent = '';

    players.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("mb-5");
        div.innerHTML = `
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <h6 class="card-title">Country: ${player.strNationality}</h6>
                <p class="card-text">Position: ${player.strPosition}</p>
                <a onclick="loadPlayerDetails('${player.idPlayer}')" href="#" class="btn btn-primary">Details</a>
            </div>
        `;
        playersContainer.appendChild(div);
    })
    toggleSpinner("none");
    togglePlayers("block");
}

const loadPlayerDetails = playerId => {
    
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayerDetails(data.players[0]))
}

const displayPlayerDetails = details => {
    const playerDetails = document.getElementById("player-details");
    playerDetails.textContent = '';

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${details.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">Name: ${details.strPlayer}</h4>
            <h5 class="card-title">Birthday: ${details.dateBorn}</h5>
            <h5 class="card-title">Country: ${details.strNationality}</h5>
            <h6 class="card-text">Position: ${details.strPosition}</h6>
            <p class="card-text">Description: ${details.strDescriptionEN.slice(0, 300)}</p>
        </div>
    `;

    playerDetails.appendChild(div);
}