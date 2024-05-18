document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.getElementById('dog-card-container');
    const numberOfDogs = 50; // Number of random dogs to display

    for (let i = 0; i < numberOfDogs; i++) {
        fetchRandomDog();
    }

    function fetchRandomDog() {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.message;
                const breed = extractBreedFromUrl(imageUrl);
                displayDogCard(breed, imageUrl);
            })
            .catch(error => console.error('Error fetching random dog image:', error));
    }

    function extractBreedFromUrl(url) {
        // The breed name is between the last two slashes in the URL
        const parts = url.split('/');
        return parts[parts.length - 2];
    }

    function displayDogCard(breed, imageUrl) {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = breed;
        img.src = imageUrl;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title text-capitalize';
        cardTitle.innerText = breed;

        cardBody.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        cardContainer.appendChild(col);
    }
});
