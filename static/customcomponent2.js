const template2 = document.createElement("template");
template2.innerHTML = `
<style>

.container2{
    border: 2px solid brown;
    width: 75%;
    margin: 0 auto;
    text-align: center;
}

.flex-box-container2{
    display: flex;
    border: 1px solid black;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
}


</style>
<div class='container2'>
<h2>Cat Generator</h2>
<button class="btn btn-success" id='cat-gen-button'>Generate Cat</button>

<div class='flex-box-container2' id='flex-cat-gen'>
</div>

</div>`;

class CatGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template2.content.cloneNode(true));
  }
  generatecat() {
    var image = document.createElement("img");
    var div = this.shadowRoot.getElementById("flex-cat-gen");
    image.src =
      "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".btn-success")
      .addEventListener("click", () => this.generatecat());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector(".btn-success").removeEventListener();
  }
}
window.customElements.define("cat-generator", CatGenerator);
