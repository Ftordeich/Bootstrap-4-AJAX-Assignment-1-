window.addEventListener("load", function () {


    // Sporadic website base URL
    const BASE_URL = "https://sporadic.nz/a01-parttime";
    const TYPE_URL = "https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/types";
    const RANDOM_URL = "https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/summary/random"
    const IMAGE_URL = "https://trex-sandwich.com/auckland-online-cs719-assignment-01/images/"
    const ID_URL = "https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/detail/"

    // TODO Your code here.
    let pokemonID;
    
    
    
    fetchTypes(); 
    fetchRandom();


    var randomiseButton = document.getElementById("randomPokemon");
    randomiseButton.addEventListener("click", function(){ fetchRandom()});

    var modalButton = document.getElementById("modalID");
    modalButton.addEventListener("click", function(){ fetchDetails()});

    function fetchDetails(){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            displayDetails(JSON.parse(this.responseText));
            

        }
        xhttp.open("GET", ID_URL + pokemonID, true);
        xhttp.send();

    }
    function displayDetails(data){
        document.getElementById("modalHeading").innerHTML = data.name;
        document.getElementById("modalImage").src = IMAGE_URL + data.imageUrl;
        var modalTypes = document.getElementById("modalTypes");
        var size = data.types.length;
        data.types.forEach((type, index) =>{
            modalTypes.innerHTML += type;
            if (index +1 != size){
                modalTypes.innerHTML += ", ";
            }
        });
        document.getElementById("modalDescription").innerHTML = data.description;

    }


    function fetchRandom(){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            var pokemon = JSON.parse(this.responseText)
            cardData(pokemon);
            pokemonID = pokemon.id

            
        }
        xhttp.open("GET", RANDOM_URL, true);
        xhttp.send();
    }
    function cardData(pokemonData){
        document.getElementById("cardTitle").innerHTML = pokemonData.name;
        document.getElementById("cardImage").src = IMAGE_URL + pokemonData.imageUrl;
        var size = pokemonData.types.length;
        var text = "";
        pokemonData.types.forEach((type, index) =>{
            text += type;
            if (index +1 != size){
                text += ", ";
            }
        });

        
        document.getElementById("cardText").innerHTML = text;
        


}

    function fetchTypes(){
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            tableData(JSON.parse(this.responseText));
            

        }
        xhttp.open("GET", TYPE_URL, true);
        xhttp.send();
    }
    function tableData(data){
        var table = document.getElementById("typeTable");
        var headerRow = document.createElement("tr");
        var tHead = document.createElement("thead");
        headerRow.appendChild(document.createElement("th"));
        data.forEach(element => {
            var tableHeader = document.createElement("th");
            var textNode = document.createTextNode(element.name);
            tableHeader.appendChild(textNode);
            headerRow.appendChild(tableHeader); 

        });
        tHead.appendChild(headerRow);
        table.appendChild(tHead);

        data.forEach((element, index) => {
            var row = document.createElement("tr");
            var nameCell = document.createElement("td");
            nameCell.appendChild(document.createTextNode(element.name));
            nameCell.style.fontWeight = "bold"
            row.appendChild(nameCell);
            element.data.forEach(type => {
                var typeCell = document.createElement("td");
                typeCell.appendChild(document.createTextNode(type));
                row.appendChild(typeCell);
            })
            if(index%2){
                row.style.backgroundColor = "#f2f2f2";
            }
            table.appendChild(row);


            

            
        });
    }

    
    
});