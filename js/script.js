const btnShowCharacters = document.getElementById("showCharacters");
let d = document;
const $template = d.getElementById("charactersTemplate").content;
$fragment = d.createDocumentFragment();
const $tbody = d.querySelector("tbody");

btnShowCharacters.addEventListener("click", async e => {
   let show = true;
   try {
      let res = await fetch(`http://localhost:5000/characters`),
         json = await res.json();

      addDOMCharacters(show, json);

   } catch (error) {
      console.log(error)
   }
})

/* d.addEventListener("DOMContentLoaded",getAll) */

const addDOMCharacters = (show,json) => {
   if (show) {
      btnShowCharacters.textContent="Hide Characters";
      json.forEach(element => {
         $template.querySelector(".name").textContent = element.name;
         $template.querySelector(".race").textContent = element.race;
         $template.querySelector(".gender").textContent = element.gender;

         let $clone = d.importNode($template, true);
         $fragment.appendChild($clone);
      });

      $tbody.appendChild($fragment);
   }

}