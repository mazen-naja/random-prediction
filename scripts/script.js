document.getElementsByClassName("dogo-img");
generate_query = document.querySelector(".generate_btn");
get_name = document.querySelector(".dog_name_text");
get_age = document.getElementsByClassName("age_number");
get_gender = document.getElementsByClassName("gender_type");
get_nationality = document.getElementsByClassName("nationality_id");
get_nationality2 = document.getElementsByClassName("nationality_id2");
get_dog_image_query = document.querySelector(".dogo-img");



// Disable generate button if a name has not been entered.
if (get_name.textContent.length == 0) {
  generate_query.disabled = true;
  generate_query.removeEventListener("click", generating_prediction);
//Listen again if an input has been entered
  get_name.addEventListener('input', updateValue);
}


// Fetch random image then save it in get_dog_image_query
fetch("https://dog.ceo/api/breeds/image/random")
  .then(response => response.json())
  .then((data) => {
    get_dog_image_query.src = data.message;
  })


//Listen to the input and check if data being written in name
function updateValue(e) {
  get_name.textContent = e.target.value;
  if (get_name.textContent.length == 0) {
    generate_query.disabled = true;
    generate_query.removeEventListener("click", generating_prediction);

    //Enable generate button if a name has been entered and generate a prediction if clicked.
  } else {
    generate_query.disabled = false;
    generate_query.addEventListener("click", generating_prediction);
  }
  return get_name.textContent.length
}





// Generate prediction function and update each field with its predicted value
function generating_prediction() {

  // Gender fetching
  fetch("https://api.genderize.io/?name=" + get_name.value)
    .then(response => response.json())
    .then((data) => {
      get_gender[0].value = data.gender

    })

  // Age fetching
  fetch("https://api.agify.io/?name=" + get_name.value)
    .then(response => response.json())
    .then((data) => {
      get_age[0].value = data.age
    })

  // Nationality fetching
  fetch("https://api.nationalize.io/?name=" + get_name.value)
    .then(response => response.json())
    .then((data) => {
      console.log("https://api.nationalize.io/?name=" + get_name.value)
      get_nationality[0].value = data.country[0].country_id
      get_nationality2[0].value = data.country[1].country_id
    })

}
