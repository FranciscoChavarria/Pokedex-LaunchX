const fetchPokemon = () =>{
    const nombrePokemon = document.getElementById("pokeName");
    let pokeInput = nombrePokemon.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    const srcImg = document.getElementById("pokeImg");
    const nombre = document.getElementById("name");
    const tipo = document.getElementById("tipo");

    fetch(url).then((res) => {
        if(res.status != "200"){
            srcImg.src = "./img/pokemon-sad.jpg";
            tipo.innerHTML   = 'Pokemon no encontrado';
            nombre.innerHTML = '';
            document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
        }else{
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let urlImg   = data.sprites.front_default;

        srcImg.src   = urlImg;
        tipo.innerHTML   = 'Tipo  : ' + data.types[0].type.name;
        nombre.innerHTML = 'Nombre: ' + data.name;

        const tablaEst = document.getElementById("tableStats");
        const tablaMov = document.getElementById("tableMoves");

        //Eliminamos las filas para cargarlas con los nuevos valores
        document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})

        for(let i=0; i<data.stats.length; i++){
            tablaEst.insertRow(i).innerHTML = `<td>${data.stats[i].stat.name} =></td><td>${data.stats[i].base_stat}</td>`
        }
        
        // Obtenemos Movimientos Pokemon data.moves.length
        for(let i=0; i<5; i++){
            tablaMov.insertRow(i).innerHTML = `<td>Move ${i+1} =></td><td>${data.moves[i].move.name}</td>`
        }
    })
}