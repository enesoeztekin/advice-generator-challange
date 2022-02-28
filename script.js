//Initializing the HTML tags that we're going to use.
const adviceId = document.querySelector(".advice-id > span");
const adviceText = document.querySelector(".advice");
const btnRand = document.querySelector(".btn-rand");
var data;

const xhr = new XMLHttpRequest();

//When clicked the dice button.
btnRand.addEventListener("click", () => {
  makeRequest();
});

function makeRequest() {
  //Makes HTTP Request to the API.
  xhr.open("GET", "https://api.adviceslip.com/advice");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status == 200 && this.status < 300) {
        data = JSON.parse(this.responseText);
        updateUI(data);
      }
    }
  };
}

function updateUI(data) {
  if (adviceId.textContent == data["slip"]["id"]) {
    makeRequest(); //When the advice comes from API is the same, it'll be requested again.
  }
  adviceId.textContent = data["slip"]["id"]; //Assign the ID of the advice comes from API to the advice ID tag.
  adviceText.textContent = data["slip"]["advice"]; //Assign the advice comes from API to the advice tag.
}
