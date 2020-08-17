const input = document.getElementById("id_input");
const btn_srch = document.getElementById("id_btn_srch");
const all_results = document.getElementById("fancy_results");
const structure_result = document.getElementById("structure_of_a_result");
let btn_getLyrics;
// --------------------------------------------------

function srchResults(json_data) {
  all_results.style.display = "block";

  all_results.innerHTML = "";

  let single_song = structure_result.cloneNode(true);
  structure_result.remove();

  const sz = json_data.data.length >= 10 ? 10 : json_data.data.length;
  //   console.log("sz:", sz);
  //   console.log();

  for (let index = 0; index < sz; index++) {
    const element = single_song.cloneNode(true);

    // console.log(json_data);

    const title = json_data.data[index].title;
    const album = json_data.data[index].album.title;
    const singer = json_data.data[index].artist.name;

    const html_song = element.querySelector("h3");
    const html_album_singer = element.querySelector("p");

    const html_lyricsBtn = element.querySelector(".btn_getLyrics");

    html_song.textContent = title;
    html_album_singer.textContent = `${album} by ${singer}`;

    html_lyricsBtn.setAttribute("data-title", title);
    html_lyricsBtn.setAttribute("data-singer", singer);
    // console.log(html_lyricsBtn);

    all_results.appendChild(element);

    // console.log(index);
  }

  //   btn_getLyrics = document.getElementsByClassName("btn_getLyrics");
}

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
      console.log("No Song Found");
    });
});

// get lyrics btn clicked
all_results.addEventListener("click", function (e) {
  //   console.log("clicked parent");
  if (e.target.classList.contains("btn_getLyrics")) {
    console.log(e.target);
    console.log("title:", e.target.getAttribute("data-title"));
    console.log("singer:", e.target.getAttribute("data-singer"));

    const title = e.target.getAttribute("data-title");
    const singer = e.target.getAttribute("data-singer");

    getLyrics(title, singer);
  }
});

function getLyrics(title, singer) {
  //   const url = "https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime";
  const url = `https://api.lyrics.ovh/v1/${singer}/${title}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => console.log(data.lyrics))
    .catch(function () {
      console.log("No Lyrics Found");
    });
}

// getLyrics("Adventure of a Lifetime", "Coldplay");
