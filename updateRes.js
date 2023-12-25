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
    preFillForm(restaurantData)
  }
  getRestaurantDetails()

  function preFillForm (restaurant){
    document.getElementById('name').value=restaurant.name
    document.getElementById('cuisine').value=restaurant.cuisine
    document.getElementById('address').value=restaurant.address
    document.getElementById('city').value=restaurant.city
    document.getElementById('rating').value=restaurant.rating
  }

  resUpdateForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const name = document.getElementById('name').value;
    const cuisine = document.getElementById('cuisine').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const rating = document.getElementById('rating').value;
    const  data = {
        name: name,
        cuisine: cuisine,
        address: address,
        city: city,
        rating: parseFloat( rating)
      };

      
      fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res=>{
        document.getElementById("alerts").className="alert alert-success  mx-5 mt-3"
        document.getElementById("alerts").textContent=" Sending data..."
        return res.json()
      }).then(data=>document.getElementById("alerts").textContent=" Restaurant Updated successfully! ")
})