const btnShowCharacters = document.getElementById("showCharacters");
let d = document;
const $template = d.getElementById("charactersTemplate").content;
$fragment = d.createDocumentFragment();
const $tbody = d.querySelector("tbody");

/* show characters switch */
let show = true;

/* CHARACTERS INPUTS FORM ADD */
const $inputName = d.getElementById("inputName");
const $inputRace = d.getElementById("inputRace");
const $inputGender = d.getElementById("inputGender");


btnShowCharacters.addEventListener("click", async (e) => {

   try {
      let res = await fetch(`http://localhost:5000/characters`),
         json = await res.json();

      if (show) {
         addDOMCharacters(show, json);
         show = false;

      } else {
         /* REMOVE CHARCATERS FROM DOM */
         while ($tbody.firstChild) {
            $tbody.removeChild($tbody.firstChild);
         }
         btnShowCharacters.classList.remove("btn-danger");
         btnShowCharacters.classList.add("btn-primary");
         btnShowCharacters.textContent = "Show Characters";
         btnShowCharacters.dataset.show = "open";

         show = true;
      }
   } catch (error) {
      console.log(error)
   }
})

/* ADD CHARACTER WHEN SHOW CHARACTERS IS PRESS */
const addDOMCharacters = (show, json) => {
   if (show) {
      btnShowCharacters.textContent = "Hide Characters";
      btnShowCharacters.classList.remove("btn-primary");
      btnShowCharacters.classList.add("btn-danger")
      json.forEach(element => {
         $template.querySelector(".name").textContent = element.name;
         $template.querySelector(".race").textContent = element.race;
         $template.querySelector(".gender").textContent = element.gender;
         $template.querySelector(".abilities").textContent = element.abilities;


         $template.querySelector(".name").dataset.name = element.name;
         $template.querySelector(".race").dataset.race = element.race;
         $template.querySelector(".gender").dataset.gender = element.gender;
         $template.querySelector("#delete").dataset.id = element.id;
         $template.querySelector(".modal_update").dataset.id = element.id;

         $template.querySelector(".update").dataset.name = element.name;
         $template.querySelector(".update").dataset.race = element.race;
         $template.querySelector(".update").dataset.gender = element.gender;
         $template.querySelector(".update").dataset.id = element.id;


         let $clone = d.importNode($template, true);
         $fragment.appendChild($clone);
      });

      $tbody.appendChild($fragment);

   }
}

/* ADD CHARACTER */
const addCharacter = async (e) => {
   try {
      let options = {
         method: "POST",
         headers: {
            "Content-type": "application/json;charset=utf-8"
         },
         body: JSON.stringify({
            name: $inputName.value,
            race: $inputRace.value,
            gender: $inputGender.value
         })
      }

      let res = await fetch("http://localhost:5000/characters", options),
         json = await res.json();
   } catch (error) {

   }
}

/* DELETE CHARACTER */
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


/* UPDATE CHARACTER */
const updateCharacter = async (e, $modal_update) => {
   try {
      let options = {
         method: "PUT",
         headers: {
            "Content-type": "application/json;charset=utf-8"
         },
         body: JSON.stringify({
            name: $modal_update.querySelector("#inputName").value,
            race: $modal_update.querySelector("#inputRace").value,
            gender: $modal_update.querySelector("#inputGender").value
         })
      }

      let res = await fetch(`http://localhost:5000/characters/${e.target.dataset.id}`, options),
         json = await res.json();
   } catch (error) {

   }
}


/* CLICK EVENT CONTROL FOR (ADD,DELETE,UPDATE) */
d.addEventListener("click", e => {
   /* DELETE CHARACTER EVENT */
   if (e.target.matches("#delete")) {
      let isDelete = confirm(`Delete ${e.target.dataset.id}`)
      if (isDelete) deleteCharacter(e);

      /* ADD CHARACTER EVENT */
   } else if (e.target.matches("#saveCharacter")) {
      addCharacter(e);

      /* UPDATE MODAL EVENT*/
   } else if (e.target.matches(".update")) {
      const $modal_update = d.querySelector(".modal-update");
      const $id_update = d.querySelector("#update");

      $modal_update.querySelector("#inputName").value = e.target.dataset.name;
      $modal_update.querySelector("#inputRace").value = e.target.dataset.race;
      $modal_update.querySelector("#inputGender").value = e.target.dataset.gender;
      $id_update.dataset.id = e.target.dataset.id;

      /* IF YOU PRESS UPDATE MODAL BUTTON  */
      $id_update.addEventListener("click", async (e) => {

         updateCharacter(e, $modal_update);
      })
   }
})