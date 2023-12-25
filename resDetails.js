
document.addEventListener('DOMContentLoaded', () => {


const container = document.getElementById('container');
const apiUrl = 'https://zomato-express.prerananawar.repl.co/restaurants/';

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;

  const queryParams = new URLSearchParams(new URL(url).search);
  return queryParams.get(name) || null;
};


async function getRestaurantDetails(){
    const resName = getParameterByName('id');
    const response = await fetch(apiUrl + resName);
    const restaurantData = await response.json();
    restaurantData && displayRestaurantDetails(restaurantData);
};

function displayRestaurantDetails (restaurant) {
    container.innerHTML = `
    <h1>${restaurant?.name}</h1>
    <p>Cuisine: ${restaurant?.cuisine}</p>
    <p>Address: ${restaurant?.address}, ${restaurant.city}</p>
    <p>Rating: ${restaurant?.rating}</p>
  `
};



getRestaurantDetails(); 

});

