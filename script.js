const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const pokemonName  = document.getElementById("pokemon-name")
const pokemonId = document.getElementById("pokemon-id")
const weight = document.getElementById("weight")
const height = document.getElementById("height")
const types = document.getElementById("types")
const hp = document.getElementById("hp")
const attack = document.getElementById("attack")
const defense = document.getElementById("defense")
const specialAttack = document.getElementById("special-attack")
const specialDefense = document.getElementById("special-defense")
const speed=document.getElementById("speed")
const image=document.getElementById("image")



const pokemonApiData ="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";


//console.log(searchInput,typeof(searchInput))
const fetchData = async () => {
  try {
    const res = await fetch(pokemonApiData);
    const data = await res.json();
    return data
   // console.log(data)
  } catch (err) {
    console.log(err); 
  }
};

const searchBar= async() =>{
  
 // console.log(searchInput,typeof(searchInput))
  const data = await fetchData()
  const userInput=searchInput.value.toLowerCase()
  //console.log(data.results)
  const findPokemon=data.results.find(pokemon=>
  Number(pokemon.id)=== Number(userInput) || pokemon.name.toLowerCase()===userInput);
  if(findPokemon){ 
    const {id,name,url}=findPokemon
    //console.log(findPokemon)
    pokemonName.innerText=name.toUpperCase()
    pokemonId.innerText = `#${id}`
   // console.log(findPokemon.url)
    const res=await fetch(findPokemon.url)
    const restOfData=await res.json()
   // console.log(restOfData)
    weight.innerText = "Weight: " +restOfData.weight 
    height.innerText = "Height: "+restOfData.height
    let img =`<img id="sprite" src="${restOfData.sprites.front_default}">`
    image.innerHTML=img

    let statsArr=[]
    restOfData.stats.forEach((stat) => {
    statsArr.push([stat.stat.name, stat.base_stat]);
});
  //console.log(statsArr)       
  hp.innerText = `${statsArr[0][1]}`
  //console.log(typeof(hp.innerText))
  attack.innerText = `${statsArr[1][1]}`
  defense.innerText =  `${statsArr[2][1]}`
  specialAttack.innerText = `${statsArr[3][1]}`
  specialDefense.innerText = `${statsArr[4][1]}` 
  speed.innerText = `${statsArr[5][1]}`
  /////
  let typeArr=[]
  restOfData.types.forEach((types)=>{
    typeArr.push([types.slot,types.type.name])
  })
 


  types.innerHTML = "";
  typeArr.forEach(typeInfo => {
    let typeElement = document.createElement("p"); 
    typeElement.innerText = typeInfo[1].toUpperCase();
    types.appendChild(typeElement); 
  });



  
  
       

  }else{
    alert("Pokémon not found");
  }
    
  }

const resetStats = () => {
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  types.innerText = "";
  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";
  image.innerHTML="";
  types.innerHTML="";
};

 
    
  
//searchBar()
//}
const addInfo=()=>{
 
}
searchButton.addEventListener("click",()=>{
  resetStats()
  searchBar();

})