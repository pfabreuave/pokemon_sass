var pokem
function proceso(){
/*

    document.getElementById("pok") busca en el documento HTML un elemento que tenga el 
    atributo id con el valor "pok".
    La función getElementById() es un método del objeto document que se utiliza para obtener 
    una referencia a un elemento del DOM (Document Object Model) en base a su ID único.
    Cuando se encuentra el elemento con el ID "pok", la función getElementById() devuelve una 
    referencia a ese elemento.
    Finalmente, la referencia al elemento con el ID "pok" se asigna a la variable btn.
    A partir de este punto, puedes utilizar la variable btn para realizar acciones en el elemento 
    HTML que representa, como agregar event listeners, modificar su contenido, cambiar su estilo, 
    entre otras operaciones.
*/
    var btn = document.getElementById("pok");
    
    pokem = btn.value
    fetchData(pokem)
    document.getElementById("formulario").reset();
}

/*

    document.addEventListener('DOMContentLoaded', function(event) { ... }) 
    establece un event listener para el evento DOMContentLoaded en el objeto document. 
    Esto significa que la función se ejecutará cuando todo el contenido HTML del documento 
    haya sido cargado y esté disponible para ser manipulado.
*/

document.addEventListener('DOMContentLoaded', function(event) {
    
        const pokemon = {
            id:'',
            img: "../images/pokeIco.png",
            // 'https://i.pinimg.com/originals/7d/5c/18/7d5c18be5689eebd1896363ff7117fe0.jpg',
            // "../images/pokeIco.png",
            nombre: 'Escolha seu pokémon',
            hp: '',
            tipo: 'conheça seus poderes',
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
            const elementTypes = data.types.map(typeInfo => typeInfo.type.name)
            const pokemon = {
                id: data.id,
                img: data.sprites.other.dream_world.front_default,
                nombre: data.name,
                hp: data.stats[0].base_stat,
                tipo: elementTypes.join(" | "),
                experiencia: data.base_experience,
                ataque: data.stats[1].base_stat,
                especial: data.stats[3].base_stat,
                defensa: data.stats[2].base_stat,
                numero: 'Nº',
                peso: 'K',
                fuerza: ' Hp    ',
                experto: ' Exp'
            }
            dibujaCard(pokemon)
        
        } catch (error) {
           // alert(" Não tenho, tente outro")
        }
}
/*

    La función dibujaCard(pokemon), se encarga de dibujar una 
    tarjeta (card) para un objeto Pokémon en el documento HTML
*/
const dibujaCard = (pokemon) =>
    {
        /*

            Obtiene una referencia al elemento con la clase "flex" en el documento HTML, utilizando 
            document.querySelector('.flex'). Este elemento actúa como un contenedor para las tarjetas 
            de Pokémon.
        */
        const flex = document.querySelector('.flex');


        /*

            Obtiene una referencia al contenido del elemento con el ID "template-card" en el documento HTML, 
            utilizando document.querySelector('#template-card').content. Este elemento es un template (plantilla) 
            que contiene la estructura de la tarjeta de Pokémon.
        */
        const template = document.querySelector('#template-card').content;


        /*

            Crea un clon del template utilizando cloneNode(true). El parámetro true asegura que 
            también se clonen los elementos hijos del template.
        */
        const clone = template.cloneNode(true);


        /*

            Crea un fragmento de documento utilizando document.createDocumentFragment(). El fragmento 
            de documento es un nodo especial utilizado para almacenar y manipular varios nodos antes 
            de agregarlos al árbol de documentos, lo cual mejora el rendimiento.
        */
        const fragment = document.createDocumentFragment();


        /*

            Actualiza el contenido del clon con los datos del objeto Pokémon. Utiliza métodos como 
            setAttribute(), innerHTML y textContent para asignar los valores correspondientes a los 
            elementos de la tarjeta de Pokémon.
        */
        clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
        clone.querySelector('.card-body-title').innerHTML = `${pokemon.numero} ${pokemon.id} ${pokemon.nombre}`;
        clone.querySelector('.card-body-text').textContent = pokemon.hp + pokemon.fuerza + pokemon.experiencia + pokemon.experto;
        clone.querySelector('.card-body-type').textContent = pokemon.tipo;
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
 