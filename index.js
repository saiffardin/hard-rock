const input = document.getElementById("id_input");
const btn_srch = document.getElementById("id_btn_srch");

// --------------------------------------------------

// --------------------------------------------------

btn_srch.addEventListener("click", function () {
  const srch_song = input.value.trim();

  if (srch_song === "") {
    console.log("empty");
    return;
  }

  console.log(srch_song);
  input.value = "";

  //   const url = "https://api.lyrics.ovh/suggest/summer";
  const url = `https://api.lyrics.ovh/suggest/${srch_song}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => srchResults(data))
    .catch(function() {
        console.log("No Song Found.");
    });
});

function srchResults(json_data) {
  console.log("title:", json_data.data[0].title);
  console.log("singer:", json_data.data[0].artist.name);
  console.log("album:", json_data.data[0].album.title);
  console.log();
}
