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
    const param = 'event=findCustomer&email=' + window.customerEmail;
    fetch('/apps/conn-user?' + param, {
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
        const customerData = data[0];
        const result = "Points: " + customerData.points;
        
        document.getElementById('cus_point').innerText = result;
      })
      .catch(error => {
        console.log('Error fetching data:', error);
    });
  }

  const cardOne = document.querySelector('.cardOne');
  const redeemContent = document.getElementById('redeem-content').innerHTML;

  function attachMainContentEventListeners() {
    document.getElementById('redeem-point').addEventListener('click', showRedeemContent);
  }

  function attachRedeemContentEventListeners() {
    document.getElementById('back-button-in-redeem').addEventListener('click', showMainContent);
  }

  function showRedeemContent() {
    cardOne.classList.add('slide-out');
    setTimeout(() => {
      cardOne.innerHTML = redeemContent;
      cardOne.classList.remove('slide-out');
      cardOne.classList.add('slide-in');
      attachRedeemContentEventListeners();
      
      redeemPointEventListeners(); // Redeem Button Onclick
    }, 300);
  }

  function showMainContent() {
    cardOne.classList.add('slide-out');
    setTimeout(() => {
      cardOne.innerHTML = `
                  <button id="rewards-button"  class="Redeem"><svg class="loyalty-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path style="fill:#ff4f42" d="m281.854 294.5-5.854-32-30-20v72z"/><path style="fill:#ff7040" d="m256 242.5-20 20-5.854 32 25.854 20z"/><path style="fill:#ff7040" d="m256 294.5-20 70 55-20-9.146-50z"/><path style="fill:#ff903d" d="m230.146 294.5-9.146 50 35 20v-70zM276 222.5h-30v40h30c11.046 0 20-8.954 20-20s-8.954-20-20-20z"/><path style="fill:#ffb03b" d="M266 242.5c0-11.046-8.954-20-20-20h-10c-11.046 0-20 8.954-20 20s8.954 20 20 20h10c11.046 0 20-8.954 20-20z"/><path style="fill:#ffb03b" d="m343.5 7.5-85.411 219.094h30c28.686-10.955 50.335-36.152 56.274-66.955L373.5 7.5h-30z"/><path style="fill:#ffc46c" d="M314.363 159.638 343.5 7.5h-205l29.137 152.138c5.94 30.803 27.588 56 56.274 66.955h34.177c28.687-10.954 50.335-36.152 56.275-66.955z"/><path style="fill:#ff903d" d="M306 344.5h-30l40 40h30c0-22.091-17.909-40-40-40z"/><path style="fill:#ffb03b" d="M276 344.5h-70c-22.091 0-40 17.909-40 40h150c0-22.091-17.909-40-40-40z"/><path style="fill:#429dea" d="m356 384.5-20 60 20 60h30v-120z"/><path style="fill:#2dceea" d="M126 384.5h230v120H126z"/><path style="fill:#ffb03b" d="m326 414.5-30 30 30 30h30v-60z"/><path style="fill:#ffc46c" d="M156 414.5h170v60H156z"/><path d="M386 377h-33.098c-3.607-22.64-23.263-40-46.902-40h-8.748l-6.402-35h1.005a7.5 7.5 0 0 0 0-15h-3.748l-3.371-18.43c10.893-3.66 18.765-13.959 18.765-26.07 0-4.668-1.156-9.142-3.307-13.097 23.769-12.15 41.795-33.837 49.35-59.414C407.572 136.52 443.5 74.569 443.5 7.5A7.5 7.5 0 0 0 436 0H76a7.5 7.5 0 0 0-7.5 7.5c0 67.069 35.928 129.019 93.956 162.488 7.553 25.574 25.58 47.263 49.351 59.415-2.151 3.955-3.307 8.429-3.307 13.097 0 12.11 7.872 22.41 18.765 26.07L223.894 287h-3.747a7.5 7.5 0 0 0 0 15h1.004l-6.402 35H206c-23.639 0-43.295 17.36-46.902 40H126a7.5 7.5 0 0 0-7.5 7.5v120a7.5 7.5 0 0 0 7.5 7.5h260a7.5 7.5 0 0 0 7.5-7.5v-120a7.5 7.5 0 0 0-7.5-7.5zm-32.06-227.493L379.7 15h48.637c-2.355 54.112-30.067 103.889-74.397 134.507zM83.663 15H132.3l25.76 134.507C113.73 118.89 86.018 69.113 83.663 15zM223.5 242.5c0-3.92 1.806-7.542 4.954-9.939a7.498 7.498 0 0 0-1.867-12.974c-26.469-10.108-46.236-33.623-51.584-61.359L147.573 15h216.855L337 158.218c-5.267 27.312-24.508 50.515-50.355 60.875h-32.733a7.5 7.5 0 0 0 0 15h31.289c2.107 2.288 3.299 5.244 3.299 8.407 0 6.893-5.607 12.5-12.5 12.5h-40c-6.893 0-12.5-5.607-12.5-12.5zm18.752 27.5h27.495l3.11 17h-33.715l3.11-17zm-5.853 32h39.203l6.402 35h-52.007l6.402-35zM206 352h100.001c15.339 0 28.221 10.685 31.617 25H174.383c3.396-14.315 16.278-25 31.617-25zm172.5 145h-245V392h245v105z"/><path d="M156 407a7.5 7.5 0 0 0-7.5 7.5v60a7.5 7.5 0 0 0 7.5 7.5h200a7.5 7.5 0 0 0 7.5-7.5v-60a7.5 7.5 0 0 0-7.5-7.5H156zm192.5 60h-185v-45h185v45z"/></svg>  Rewards <svg class="arrow-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg> 
        </button>
        <button id="earn-button" class="Redeem"><svg class="loyalty-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><g data-name="Coin Euro"><path d="M38 64a26 26 0 1 0-26-26 26.03 26.03 0 0 0 26 26zm0-50a24 24 0 1 1-24 24 24.027 24.027 0 0 1 24-24z" style="fill:#202021"/><path d="M64.343 23.66A29.996 29.996 0 1 0 23.66 64.342 29.995 29.995 0 1 0 64.343 23.66zM38 68a30.034 30.034 0 0 0 30-30 33.711 33.711 0 0 0-.291-4.203 24.003 24.003 0 0 1-33.912 33.912A33.851 33.851 0 0 0 38 68zM10 38a28 28 0 1 1 28 28 28.031 28.031 0 0 1-28-28zm40 40a27.938 27.938 0 0 1-23.05-12.099 35.73 35.73 0 0 0 3.39 1.104A25.995 25.995 0 1 0 67.005 30.34a33.285 33.285 0 0 0-1.104-3.39A28.003 28.003 0 0 1 50 78z" style="fill:#202021"/><path d="M27 40a1 1 0 0 0 1 1h2.461A10.017 10.017 0 0 0 40 48a9.786 9.786 0 0 0 4.45-1.058 1 1 0 1 0-.9-1.785A7.81 7.81 0 0 1 40 46a8.009 8.009 0 0 1-7.411-5H39a1 1 0 0 0 0-2h-6.93a7.229 7.229 0 0 1 0-2H39a1 1 0 0 0 0-2h-6.411A8.009 8.009 0 0 1 40 30a7.81 7.81 0 0 1 3.55.843 1 1 0 1 0 .9-1.785A9.786 9.786 0 0 0 40 28a10.017 10.017 0 0 0-9.539 7H28a1 1 0 0 0 0 2h2.05a10.045 10.045 0 0 0 0 2H28a1 1 0 0 0-1 1z" style="fill:#202021"/></g></svg>  Earn <svg class="arrow-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg> 
        </button>
        <button class="Redeem" id="redeem-point"><svg class="loyalty-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="655.359" height="655.359" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd" viewBox="0 0 6.827 6.827"><defs><style>.fil0{fill:#212121;fill-rule:nonzero}</style></defs><g id="Layer_x0020_1"><path class="fil0" d="M.96 2h5.013v1.05H.853V2H.96zm4.8.213H1.067v.624H5.76v-.624z"/><path class="fil0" d="M1.306 2.837H5.627V5.79H1.2V2.837h.106zm4.108.213h-4v2.525h4V3.05z"/><path class="fil0" d="M3.52 2.944v2.738h-.213V2.944z"/><path class="fil0" d="M1.306 4.206H5.52v.213H1.306zM3.307 2.944v-.838h.213v.838z"/><path class="fil0" d="M3.307 2.105c.006-.561.213-.864.443-.992a.537.537 0 0 1 .524-.012c.154.089.233.258.147.46-.087.203-.369.444-.974.646l-.141.047.001-.149zm.546-.806c-.153.085-.292.285-.326.654.435-.164.638-.335.698-.476.037-.085.005-.156-.058-.192-.079-.046-.2-.05-.314.014z"/><path class="fil0" d="M3.3 1.953c-.034-.369-.173-.569-.326-.654-.115-.063-.236-.06-.315-.014-.062.036-.094.107-.057.192.06.14.263.312.698.476zm-.223-.84c.23.128.437.431.443.992l.001.149-.141-.047c-.606-.202-.887-.443-.974-.647-.086-.201-.007-.37.147-.46.137-.08.339-.089.524.013z"/></g><path style="fill:none" d="M0 0h6.827v6.827H0z"/></svg>  Redeem <svg class="arrow-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg> 
        </button>
        
        <button id="activities-button" class="Redeem"><svg class="loyalty-icon" width="20" height="20" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
            <path d="M97.092 36.078H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 61.889H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222zM97.092 87.7H30.908a2.111 2.111 0 0 0 0 4.222h66.184a2.111 2.111 0 0 0 0-4.222z" />
        </svg>  Recent activites <svg class="arrow-icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg> 
        </button>
              `;
      cardOne.classList.remove('slide-out');
      cardOne.classList.add('slide-in');
      attachMainContentEventListeners();
    }, 300);
  }

  attachMainContentEventListeners();

});

function createDiscount(points){
  const param = 'event=createDiscount&points=' + points + "&email=" + window.customerEmail;
  fetch('/apps/conn-user?' + param, {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  })
  .then(response => {
    if(!response.ok) throw new Error('Response Error!')
    return response.json();
  })
  .then(data => {
    console.log("My Data ",data);
  })
  .catch(error => {
    console.log("redeem error: ", error);
  });
}

function redeemPointEventListeners() {
  document.getElementById('redeem-point-button').addEventListener('click', function() {
    console.log("Redeem Clicked");
    createDiscount(100);
  });
}
  