var pokem
function proceso(){
    var btn = document.getElementById("valor");
    pokem = btn.value
    fetchData(pokem)
    document.getElementById("formulario").reset();
}

document.addEventListener('DOMContentLoaded', function(event) {
    
        const pokemon = {
            id:'',
            img: 
            'https://i.pinimg.com/originals/7d/5c/18/7d5c18be5689eebd1896363ff7117fe0.jpg',
            nombre: 'Escolha seu pokémon',
            hp: '',
            experiencia: '',
            ataque: '00',
            especial: '00',
            defensa:'00',
            numero: '',
            peso: '',
            fuerza: '',
            experto: 'Experimente'
        }
        dibujaCard(pokemon)
})

const fetchData = async (id) => {
    try 
        {   
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await res.json()
            const pokemon = {
                id: data.id,
                img: data.sprites.other.dream_world.front_default,
                nombre: data.name,
                hp: data.stats[0].base_stat,
                experiencia: data.base_experience,
                ataque: data.stats[1].base_stat,
                especial: data.stats[3].base_stat,
                defensa: data.stats[2].base_stat,
                numero: 'Nº',
                peso: 'K',
                fuerza: 'Hp',
                experto: ' Exp'
            }
            dibujaCard(pokemon)
        
        } catch (error) {
            alert(" Não tenho, tente outro")
        }
}

const dibujaCard = (pokemon) => {
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.numero} ${pokemon.id} ${pokemon.nombre} <span>${pokemon.hp} ${pokemon.fuerza}</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + pokemon.experto;
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + pokemon.peso;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + pokemon.peso;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + pokemon.peso;
    
    // Remueve las tarjetas existentes en el contenedor
    flex.innerHTML = '';
  
    // Agrega la tarjeta clonada al fragmento
    fragment.appendChild(clone);
  
    // Agrega el fragmento al contenedor
    flex.appendChild(fragment);
  }
 