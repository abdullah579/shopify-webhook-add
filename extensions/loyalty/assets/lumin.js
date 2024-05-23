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
  