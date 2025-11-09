var trainerData = {
  name: undefined,
  email: undefined,
  date: undefined,
  pokeTeam: []
};

const instructionsLabel = document.getElementById('instructionsDisplay');
const inputPokedex = document.getElementById('inputPokedex');
const pokemonInfo = document.getElementById('pokemonInfo');
const imgElement = document.getElementById('pokemonSprite');
const bigCircleBtn = document.getElementById('bigCircle');
const sliderTeam = document.getElementById('teamSlider');
const favorite = document.getElementById('favorite');
const favoritePath = document.querySelector('#favorite path');
const favoriteCheck = document.getElementById('favoriteCheck');


var pokemonData = null;
var sliderControl = 0;



loadSesion();

async function fetchData() {
    const pokemonName = inputPokedex.value.toLowerCase();
  try {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

    instructionsLabel.textContent = data.name;

    pokemonInfoTextArea(data);
    pokemonData = data;
  } catch (error) {
    alert(`No se encontró "${pokemonName}", intente de nuevo`);
  }
}

bigCircleBtn.addEventListener('click',function(){
  sliderControl = 0; 
  resetPokedex();
});

const btn1 = document.getElementById('btn1');
btn1.addEventListener('click', function(){
  //eliminar pokemon
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));

  let arrayTeam = trainerData.pokeTeam;
  arrayTeam.splice(sliderControl, 1);
  trainerData.pokeTeam = arrayTeam;
  
  localStorage.setItem('trainerData', JSON.stringify(trainerData));
  sliderControl = 0;
  loadTeam();
});

const btn2 = document.getElementById('btn2');
btn2.addEventListener('click', function(){
  interaction();
});

const btn3 = document.getElementById('btn3');
btn3.addEventListener('click', function(){
  if(favorite.style.display === 'flex'){
    resetPokedexSearch();
  }else{
    capturePokemon(pokemonData);
  }
});

const leftBtnSlider = document.getElementById('left');
leftBtnSlider.addEventListener('click', function(){
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));
 
  sliderControl--;

  if(sliderControl <= 0){
    sliderControl = 0;
  }
  imgElement.src = trainerData.pokeTeam[sliderControl].sprite;
  instructionsLabel.textContent = trainerData.pokeTeam[sliderControl].name;
  fetchDataInfo(trainerData.pokeTeam[sliderControl].name)
  showAsFavorite();
  
  console.log(sliderControl);
});

const rigthBtnSlider = document.getElementById('rigth');
rigthBtnSlider.addEventListener('click', function(){
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));
 
  sliderControl++;

  if(sliderControl >= (trainerData.pokeTeam.length - 1)){
    sliderControl = trainerData.pokeTeam.length - 1;
  }
  imgElement.src = trainerData.pokeTeam[sliderControl].sprite;
  instructionsLabel.textContent = trainerData.pokeTeam[sliderControl].name;
  fetchDataInfo(trainerData.pokeTeam[sliderControl].name)
  showAsFavorite();
  
  console.log(sliderControl);
});



favoriteCheck.addEventListener('change', (event) =>{
  let status;
  if(event.target.checked){
    favoritePath.setAttribute('fill', 'gold');
    status = true;
    console.log("checked")
  }else{
    favoritePath.setAttribute('fill', '#9ca3af');
    status = false;
    console.log("unchecked");
  }
  markAsFavorite(status);
});

async function fetchDataInfo(name) {
  try {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    pokemonInfoTextArea(data);
  } catch (error) {
    alert(`No se encontró "${name}", intente de nuevo`);
  }
}

function pokemonInfoTextArea(data){
  let listaHabilidades = "";
  data.abilities.forEach((abilityObject) => {

      const name = abilityObject.ability.name;

      console.log(name);
      listaHabilidades += ("[" + name + "]") ;
  });
  
  let listaTipos = "";
  data.types.forEach((typesObject) => {

      const type = typesObject.type.name;

      console.log(type);
      listaTipos += (type) ;
  });
  pokemonInfo.value = `Habilidades: ${listaHabilidades}
                        \nPeso: ${data.weight}lb
                        \nTipo: ${listaTipos}`;
}

function interaction(){

  let inputText = inputPokedex.value;

  switch(instructionsLabel.textContent){

    case "¡Inserta tu nombre entrenador(a)!":
      if(/^.{4,}$/.test(inputPokedex.value)){
        trainerData.name = inputText;
        instructionsLabel.textContent = `Bienvenido(a) ${trainerData.name}`;
        inputPokedex.style.borderColor = 'green';

        setTimeout(() => {
          instructionsLabel.textContent = "¡Ahora ingresa tu correo!"
          inputPokedex.value = "";
          inputPokedex.style.borderColor = '';
        }, 2000);
      }else{
        alert('El nombre debe tener al menos 4 caracteres');
        inputPokedex.style.borderColor = 'red';
        setTimeout(() => {
          inputPokedex.style.borderColor = '';
        }, 2000);
      }
      
      break;

    case "¡Ahora ingresa tu correo!":
      if(inputPokedex.value.includes('@')){
        trainerData.email = inputText;
        instructionsLabel.textContent = `Tu correo es ${trainerData.email}`;
        inputPokedex.style.borderColor = 'green';
        
        setTimeout(() => {

          const date = new Date();
          const trainerDate = date.toLocaleDateString();

          trainerData.date = trainerDate;
          instructionsLabel.textContent = `Tu aventura inicia: ${trainerData.date}`
          inputPokedex.value = "";
          inputPokedex.style.borderColor = '';
          saveTrainerData(trainerData)

          setTimeout(() => {
              instructionsLabel.textContent = "¡Intenta buscar un pokemon!"
          }, 2000);
        }, 2000);
      }else{
        alert('El correo debe contener un @');
        inputPokedex.style.borderColor = 'red';
        setTimeout(() => {
          inputPokedex.style.borderColor = '';
        }, 2000);
      }
      break;

    default:
      fetchData();
      break;
  }
}

function saveTrainerData(trainerInfo){
    localStorage.setItem('trainerData', JSON.stringify(trainerInfo));
}

function capturePokemon(pokemon) {
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));
  
  const lastTeam = trainerData.pokeTeam;

  const pokemonExists = lastTeam.some(p => p.id === pokemon.id);
  
  if(pokemonExists){
    alert(`¡Ya tienes a ${pokemon.name} en tu equipo!`);
    inputPokedex.style.borderColor = 'red';
    setTimeout(() => {
      inputPokedex.style.borderColor = '';
    }, 2000);
    return;
  }

  let pokemonSaved = {
    name: pokemon.name,
    id: pokemon.id,
    favorite: false,
    sprite: pokemon.sprites.front_default
  }
  lastTeam.push(pokemonSaved);

  localStorage.setItem('trainerData', JSON.stringify(trainerData));
  
  alert(`¡${pokemon.name} capturado exitosamente!`);
  inputPokedex.style.borderColor = 'green';
  setTimeout(() => {
    inputPokedex.style.borderColor = '';
  }, 2000);
}

function resetPokedex(){
  inputPokedex.value = "";
  imgElement.src = "./resources/pokeload.webp";
  pokemonInfo.value = "";
  instructionsLabel.textContent = "";
  sliderTeam.style.display = 'none';
  favorite.style.display = 'none'
  loadSesion();
}

function resetPokedexSearch(){
  inputPokedex.value = "";
  imgElement.src = "./resources/pokeload.webp";
  pokemonInfo.value = "";
  instructionsLabel.textContent = "¡Intenta buscar un pokemon!";
  sliderTeam.style.display = 'none';
  favorite.style.display = 'none'
}

function loadSesion(){
  if(typeof Storage !== 'undefined' && localStorage.length > 0){

    let trainerData = JSON.parse(localStorage.getItem('trainerData'));
    
    // Verificar si trainerData existe
    if(!trainerData){
      instructionsLabel.textContent = "¡Inserta tu nombre entrenador(a)!";
      return;
    }
    
    // Verificar si el equipo está vacío
    if(trainerData.pokeTeam.length === 0){
      instructionsLabel.textContent = `Bienvenido(a) de nuevo ${trainerData.name}`;
      setTimeout(() => {
        instructionsLabel.textContent = "¡No tienes pokémon! Intenta buscar uno"
      }, 2000);
      return; // Salir de la función, no cargar el equipo
    }
    
    instructionsLabel.textContent = `Bienvenido(a) de nuevo ${trainerData.name}`;
    
    setTimeout(() => {
      instructionsLabel.textContent = "Organiza tu equipo"
      setTimeout(() => {
        loadTeam();
        showAsFavorite();
      }, 2000);
    }, 2000);
  }
}

function loadTeam(){
  favorite.style.display = 'flex';
  sliderTeam.style.display = 'flex';
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));

  imgElement.src = trainerData.pokeTeam[sliderControl].sprite;
  instructionsLabel.textContent = trainerData.pokeTeam[sliderControl].name;
  fetchDataInfo(trainerData.pokeTeam[sliderControl].name);
  showAsFavorite();
}

function showAsFavorite(){
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));
  
  if(trainerData.pokeTeam[sliderControl].favorite){
    favoritePath.setAttribute('fill', 'gold');
    favoriteCheck.checked = true;
  }else{
    favoritePath.setAttribute('fill', '#9ca3af');
    favoriteCheck.checked = false;
  }
}

function markAsFavorite(status){
  let trainerData = JSON.parse(localStorage.getItem('trainerData'));
  
  if(status){
    trainerData.pokeTeam[sliderControl].favorite = true;
  }else{
    trainerData.pokeTeam[sliderControl].favorite = false;
  }
  
  localStorage.setItem('trainerData', JSON.stringify(trainerData));
}