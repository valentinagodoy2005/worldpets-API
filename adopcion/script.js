document.addEventListener('DOMContentLoaded', () => {
    // Código para index.html

    // Redirigir a add-dog.html cuando se presiona el botón "Agregar un perro"
    const addDogButton = document.getElementById('add-dog-button');
    
    if (addDogButton) {
        addDogButton.addEventListener('click', function() {
            window.location.href = 'add-dog.html'; // Asegúrate de que add-dog.html existe
        });
    }

    // Cargar imágenes en el carrusel
    const carouselImages = document.getElementById('carousel-images');
    const dogImageURLs = [
        'https://placedog.net/500/300',
        'https://placedog.net/501/300',
        'https://placedog.net/502/300',
        'https://placedog.net/503/300',
        'https://placedog.net/504/300'
    ];

    dogImageURLs.forEach((url, index) => {
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        if (index === 0) div.classList.add('active');
        div.innerHTML = `<img src="${url}" class="d-block w-100" alt="Dog image">`;
        carouselImages.appendChild(div);
    });

    // Perros (Simulando una API)
    const dogs = [
        { name: 'Max', age: 2, img: 'https://placedog.net/505/300', interested: false },
        { name: 'Luna', age: 3, img: 'https://placedog.net/506/300', interested: false },
        { name: 'Bella', age: 1, img: 'https://placedog.net/507/300', interested: false },
        { name: 'Charlie', age: 4, img: 'https://placedog.net/508/300', interested: false },
        { name: 'Lucy', age: 5, img: 'https://placedog.net/509/300', interested: false }
    ];

    const dogCards = document.getElementById('dog-cards');

    // Función para mostrar las tarjetas de perros
    const displayDogs = (filteredDogs) => {
        dogCards.innerHTML = '';
        filteredDogs.forEach(dog => {
            const card = document.createElement('div');
            card.classList.add('col-md-4');
            card.innerHTML = `
                <div class="card">
                    <img src="${dog.img}" class="card-img-top" alt="${dog.name}">
                    <div class="card-body">
                        <h5 class="card-title">${dog.name}</h5>
                        <p class="card-text">Edad: ${dog.age} años</p>
                        <button class="btn btn-success btn-interested">Estoy interesado</button>
                    </div>
                </div>`;
            dogCards.appendChild(card);

            card.querySelector('.btn-interested').addEventListener('click', () => {
                window.location.href = "entrevista.html";
            });
        });
    };

    // Inicialmente, ocultar las tarjetas (mostrar vacío)
    dogCards.innerHTML = '';

    

    // Cargar datos desde dogs.json
    fetch('dogs.json')
    .then(response => response.json())
    .then(data => {  
        displayDogs(data);
        //document.getElementById('output').textContent = JSON.stringify(data); 
    });
});





// Código para add-dog.html
document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const dogList = document.getElementById('dog-list');

    // Función para agregar una tarjeta de perro
    const addDogCard = (dog) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
            <div class="card mt-3">
                <img src="${dog.img}" class="card-img-top" alt="${dog.name}">
                <div class="card-body">
                    <h5 class="card-title">${dog.name}</h5>
                    <p class="card-text">Edad: ${dog.age} años</p>
                    <p class="card-text">Sexo: ${dog.sex === 'male' ? 'Macho' : 'Hembra'}</p>
                    <p class="card-text">Vacunas: ${dog.vaccines ? dog.vaccines : 'No especificado'}</p>
                </div>
            </div>`;
        dogList.appendChild(card);
    };



    // Botón para regresar a la página principal
    const backButton = document.getElementById('back-to-index');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirigir a index.html
    });
});
