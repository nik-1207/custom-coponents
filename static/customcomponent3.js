const template3 = document.createElement("template");
template3.innerHTML = `
<style></style>
<div class='container3'> 
<h2>Rock, Paper, Scissors</h2>
<div class='flex-box-rps' id='flex-box-rps-div'>
    <img id='rock' src="../rock.png" height=150 width=150 alt="" onclick="rpsgame(this)">
    <img id='paper' src="../paper.png"  height=150 widht=150 alt="" onclick='rpsgame(this)'>
    <img id='scissors' src="../scissors.png" height=150 width=150 alt="" onclick='rpsgame(this)'>
</div>
</div>`;

class SPC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template3.content.cloneNode(true));
  }

  connectedCallback() {
    
}
  disconnectedCallback() {

}
}
window.customElements.define("s-p-c", SPC);
