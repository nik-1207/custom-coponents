const template = document.createElement("template");
template.innerHTML = `
<style>

.container1{
    border: 2px solid brown;
    width: 75%;
    margin: 0 auto;
    text-align: center;
}

.flex-box-container1{
    display: flex;
    border: 1px solid black;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
}

.flex-box-container1 div{
    border: 1px solid black;
    padding: 7px;
}
.btn{
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
}
.btn-primary{
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;

}

.btn-danger{
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

</style>
<div class='container1'>
        <h1>Age in Days</h1>
        <div class="flex-box-container1" >
            <div class="btn-border">
                <button class="btn btn-primary" id="input">Click</button>
            </div>
            
            <div class="btn-border">
                <button class="btn btn-danger" id="reset" >Reset</button>
            </div>
        
        </div>

        <div class="flex-box-container1">
            <div id="flex-box-result"></div>
        </div>
    </div>`;

class AgeInDays extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
ageindays() {
    var birthyear = prompt("Enter which year you were born");
    var c = new Date();
    var n = c.getFullYear();
    var ageindayss = (n - birthyear) * 365;
    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode(
      "You are " + ageindayss + " days old."
    );
    h1.appendChild(textAnswer);
    this.shadowRoot.querySelector("#flex-box-result").appendChild(h1);
  }

reset() {
    this.shadowRoot.querySelector("#flex-box-result").innerHTML="";
  }
  connectedCallback() {
    this.shadowRoot.querySelector('.btn-primary').addEventListener('click', () =>this.ageindays());
    this.shadowRoot.querySelector('.btn-danger').addEventListener('click', () => this.reset());

}
  disconnectedCallback() {
    this.shadowRoot.querySelector('.btn-danger').removeEventListener();
    this.shadowRoot.querySelector('.btn-primary').removeEventListener();

}
}
window.customElements.define("age-in-days", AgeInDays);
