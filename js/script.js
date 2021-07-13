const btnShowCharacters = document.getElementById("showCharacters");
let d = document;
const $template = d.getElementById("charactersTemplate").content;
$fragment = d.createDocumentFragment();
const $tbody = d.querySelector("tbody");


/* CHARACTERS INPUTS FORM ADD */
const $inputName=d.getElementById("inputName");
const $inputRace=d.getElementById("inputRace");
const $inputGender=d.getElementById("inputGender");

let show = Boolean;

btnShowCharacters.addEventListener("click", async (show) => {

   try {
      let res = await fetch(`http://localhost:5000/characters`),
         json = await res.json();

      addDOMCharacters(show, json);

   } catch (error) {
      console.log(error)
   }
})

/* d.addEventListener("DOMContentLoaded",getAll) */

const addDOMCharacters = (show, json) => {
   if (show) {
      btnShowCharacters.textContent = "Hide Characters";
      btnShowCharacters.classList.remove("btn-primary");
      btnShowCharacters.classList.add("btn-danger")
      json.forEach(element => {
         $template.querySelector(".name").textContent = element.name;
         $template.querySelector(".race").textContent = element.race;
         $template.querySelector(".gender").textContent = element.gender;

         $template.querySelector(".name").dataset.name = element.name;
         $template.querySelector(".race").dataset.race = element.race;
         $template.querySelector(".gender").dataset.gender = element.gender;
         $template.querySelector("#delete").dataset.id = element.id;

         let $clone = d.importNode($template, true);
         $fragment.appendChild($clone);
      });

      $tbody.appendChild($fragment);

   } else {
      while ($tbody.firstChild) {
         $tbody.removeChild($tbody.firstChild);
      }
      btnShowCharacters.classList.remove("btn-danger");
      btnShowCharacters.classList.add("btn-primary");
      btnShowCharacters.textContent = "Show Characters";
   }
}

const addCharacter = async (e) => {
   try {
      let options = {
         method: "POST",
         headers: {
            "Content-type": "application/json;charset=utf-8"
         },
         body: JSON.stringify({
            name:$inputName.value,
            race:$inputRace.value,
            gender:$inputGender.value
         })
      }

      let res = await fetch("http://localhost:5000/characters", options),
         json = res.json();
   } catch (error) {

   }
}

const deleteCharacter = async (e) => {
   try {
      let options = {
         method: "DELETE",
         headers: {
            "Content-type": "application/json;charset=utf-8"
         }
      }

      res = await fetch(`http://localhost:5000/characters/${e.target.dataset.id}`, options),
         json = await res.json();

      location.reload();
   } catch (error) {

   }
}

d.addEventListener("click", e => {
   if (e.target.matches("#delete")) {
      let isDelete = confirm(`Eliminar ${e.target.dataset.id}`)
      if (isDelete) deleteCharacter(e);

   } else if (e.target.matches("#saveCharacter")){
      console.log($inputName.value)
      addCharacter(e);
   } 
})

