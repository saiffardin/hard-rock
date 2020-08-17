const input = document.getElementById("id_input");
const btn_srch = document.getElementById("id_btn_srch");
const all_results = document.getElementById("fancy_results");
const structure_result = document.getElementById("structure_of_a_result");

// --------------------------------------------------

// --------------------------------------------------

btn_srch.addEventListener("click", function () {
  const srch_song = input.value.trim();

  if (srch_song === "") {
    console.log("empty");
    return;
  }

//   console.log(srch_song);
  input.value = "";

  //   const url = "https://api.lyrics.ovh/suggest/summer";
  const url = `https://api.lyrics.ovh/suggest/${srch_song}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => srchResults(data))
    .catch(function () {
      console.log("No Song Found.");
    });
});

function srchResults(json_data) {
  all_results.style.display = "block";

  all_results.innerHTML='';

  let single_song = structure_result.cloneNode(true);
  structure_result.remove();

  //   console.log("title:", json_data.data[0].title);
  //   console.log("singer:", json_data.data[0].artist.name);
  //   console.log("album:", json_data.data[0].album.title);
  //   console.log();

//   console.log("data:", json_data.data.length);

  //   const sz = json_data.data.length;
  const sz = json_data.data.length >= 10 ? 10 : json_data.data.length;
//   console.log("sz:", sz);
//   console.log();

  for (let index = 0; index < sz; index++) {
    const element = single_song.cloneNode(true);

    const title = json_data.data[index].title;
    const album = json_data.data[index].album.title;
    const singer = json_data.data[index].artist.name;

    const html_song = element.querySelector("h3");
    const html_album_singer = element.querySelector("p");

    html_song.textContent = title;
    html_album_singer.textContent = `${album} by ${singer}`;

    all_results.appendChild(element);
    // console.log(index);
  }
}
