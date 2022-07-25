async function getpokemons(offset) {
  const data1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${offset}`
  );
  const result1 = await data1.json();

  result1.results.forEach(async function (result) {
    const data2 = await fetch(result.url);
    const result2 = await data2.json();
    const image = result2.sprites.other["official-artwork"].front_default;
    const name = result2.name;
    const id = result2.id;
    const type1 = result2.types[0].type.name;
    let type2 = "";

    try {
      type2 = result2.types[1].type.name;
    } catch (e) {
      type2 = "";
    }

    const data3 = await fetch(result2.species.url);
    const result3 = await data3.json();
    let description = "";

    for (let i = 0; i < 500; i++) {
      if (result3.flavor_text_entries[i].language.name == "en") {
        description = result3.flavor_text_entries[i].flavor_text;
        break;
      }
    }

    description = description
      .replace("", "")
      .replace("POKéMON", "pokémon")
      .replace("POKéMON", "pokémon")
      .replace("POKéMON", "pokémon");
    document.querySelector("#pokesummary").insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
         <p class="name-pokemon">
            ${name}
         </p>
         <figure>
            <img src="${image}" class="imagepokemon" alt="">
         </figure>
         <spam class="description">
            <p class="descriptiontext">${description}</p>
            <p class="types">Type: ${type1}${" " + type2}</p>
         </spam>
         <div class="titlecard">
            <img onclick="openpokeball()" src="./assets/image/Pokeball-Transparent.png" class="pokeball" alt="pokeball">
            <img onclick="closedpokeball()" src="./assets/image/Pokeball.png" class="openpokeball" alt="pokeball">
            <p class="id">
               ID:${id}
            </p>
         </div>
      </div>
            `
    );
  });
}

pokemonsequence(124, 0);

async function pokemonsequence(limit, offset) {
  const allcards = document.querySelectorAll(".card");

  for (let i of allcards) {
    i.style.display = "none";
  }

  for (let i = offset; i <= limit + offset; i++) {
    await new Promise((resolve) => {
      resolve(getpokemons(i));
    });
  }
}

function openpokeball() {
  const pokeballs = document.querySelectorAll(".pokeball");
  for (let i of pokeballs) {
    i.addEventListener("click", function () {
      i.style.display = "none";
      i.parentElement.querySelector(".openpokeball").style.display = "unset";
      i.parentElement.parentElement.style.width = "100%";
      i.parentElement.parentElement.style.height = "90%";
      i.parentElement.parentElement.querySelector(
        ".description"
      ).style.display = "unset";
    });
  }
}

function closedpokeball() {
  const pokeballs = document.querySelectorAll(".openpokeball");
  for (let i of pokeballs) {
    i.addEventListener("click", function () {
      i.style.display = "none";
      i.parentElement.querySelector(".pokeball").style.display = "unset";
      i.parentElement.parentElement.style.width = "16rem";
      i.parentElement.parentElement.style.height = "20rem";
      i.parentElement.parentElement.querySelector(
        ".description"
      ).style.display = "none";
    });
  }
}
