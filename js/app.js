
const loadPlayers = () => {
    const searchText = document.getElementById("input-field").value;

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
        console.log(player);
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("mb-5");
        div.innerHTML = `
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <h6 class="card-title">Country: ${player.strNationality}</h6>
                <p class="card-text">Position: ${player.strPosition}</p>
                <a href="#" class="btn btn-primary">Details</a>
            </div>
        `;
        playersContainer.appendChild(div);
    })
}