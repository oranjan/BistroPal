const restaurantList= document.getElementById("restaurantList")
const cuisineSelect=document.getElementById("cuisineSelect")
const sortBy= document.getElementById("sortBy")
const resAddForm=document.getElementById("resAddForm")

function displayRestaurants(restaurants) {
    restaurantList.innerHTML = ""
    restaurants?.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item pb-3';
        listItem.innerHTML = `
            <h4>${restaurant.name}</h4>
            <p>Cuisine: ${restaurant.cuisine}</p>
            <p>Address: ${restaurant.address}</p>
            <p>Rating: ${restaurant.rating}</p>
            <button class="btn btn-primary view-details-btn">View Details</button>
            <button class="btn btn-danger delete-btn">Delete</button>
            <button type="button" class="btn btn-warning update-btn">Update</button>
        `;

        listItem.querySelector('.view-details-btn').addEventListener('click', () => {
            viewDetails(restaurant._id);
        });

        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteRestaurant(restaurant._id);
        });

        listItem.querySelector('.update-btn').addEventListener('click', () => {
            updateRestaurant(restaurant._id);
        });

        restaurantList.appendChild(listItem);
    });
}
let data=[]

const dataUrl="https://zomato-express.prerananawar.repl.co/restaurants"

async function getData() {
    const response = await fetch(dataUrl);
    data = await response.json();
    data.length>0 && displayRestaurants(data)
}
getData()


cuisineSelect?.addEventListener("change",(e)=>{
    filterRestaurants(e.target.value)
})

function filterRestaurants(selectedVal){
    if(data.length>0){
        const updatedResList=data?.filter((res)=>{
            return selectedVal===""||res.cuisine.toLowerCase()===selectedVal.toLowerCase() 
        })

        displayRestaurants(updatedResList)
        console.log(updatedResList)
    }
}

sortBy?.addEventListener("change",(e)=>{
    sortResList(e.target.value)
})

function sortResList(sortByVal) {
    if (data.length > 0) {
       const sortedResList = data.sort(function (a, b) {
            if (sortByVal=="name") {
                return a.name.localeCompare(b.name);
              }
            return b.rating - a.rating; 

        });
        displayRestaurants(sortedResList)
    }
   
}

function viewDetails(restaurantId){
        window.location.href = `restaurant-details.html?id=${restaurantId}`;
}

function displayDelete(){
    const loadingElement= document.getElementById("loading")
    loadingElement.classList.add("alert", "alert-danger");
    loadingElement.innerText = "Deleted ...";
}



async function deleteRestaurant  (restaurantId)  {
      const deleteUrl = `${dataUrl}/${restaurantId}`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });
      getData()
      displayDelete()
    //   setTimeout(()=>{location.reload()},1000)
  };



//adding res using a from (working)
resAddForm.addEventListener("submit",(e)=>{
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

      
      fetch(dataUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res=>{
        document.getElementById("alerts").className="alert alert-success  mx-5 mt-3"
        document.getElementById("alerts").textContent=" Sending data..."
        return res.json()
      }).then(data=>document.getElementById("alerts").textContent=" Restaurant added successfully! ")
})

async function updateRestaurant (restaurantId){
    window.location.href = `updateRes.html?id=${restaurantId}`;
}
// fetchData();