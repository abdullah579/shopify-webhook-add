class PartyButton extends HTMLButtonElement {
    constructor() {
      super();
      this.isAnimating = false;
      this.bindedAnimate = this.animate.bind(this);
    }
  
    connectedCallback() {
      this.addEventListener('click', this.partyTime.bind(this));
    }
    
    partyTime() {
      let luminPage = document.querySelector('.lumin-page');
      console.log('start animate');
  
      if (luminPage) {
        luminPage.classList.toggle('show');
      } else {
        console.error("Element with class 'lumin-page' not found.");
      }
    }
  }
  
  customElements.define('loyal-button', PartyButton, { extends: "button" });

  document.addEventListener("DOMContentLoaded", function() {
    if(window.customerEmail){
      console.log("EEEMMIILL ", window.customerEmail);
      fetch('/apps/conn-user?email=' + window.customerEmail , {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("DDD", data);
          const customerData = data[0];
          console.log(customerData);
          const result = "Points: " + customerData.points;
          console.log("dddddooocccc",document.getElementById('cus_point'));
          document.getElementById('cus_point').innerText = result;
        })
        .catch(error => {
          console.log('Error fetching data:', error);
      });
    }
  });
  