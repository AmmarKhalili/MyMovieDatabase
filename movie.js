window.addEventListener('load', () => {
    
    
    popularFilms()
});






function y(array) {
    return array.sort(() =>
        Math.random() - 0.5)
}


let section2 = document.getElementById("section2")
document.body.appendChild(section2)





async function popularFilms() {
    try {
        const response = await fetch('https://santosnr6.github.io/Data/movies.json');
        const data = await response.json();
        console.log(y(data));

        for (const cc of data) {
            let filmbox = document.createElement("div");
            filmbox.classList = "span1";
            section2.appendChild(filmbox);

            let poster = document.createElement("img");
            poster.classList = "imgposter";
            poster.src = cc.poster;
            filmbox.appendChild(poster);

            let text = document.createElement("p");
            text.style.textAlign = "center";
            text.innerHTML = `${cc.title} , ${cc.Plot}   `;
            filmbox.appendChild(text);

            const movieDetails = await getMovieDetails(cc.imdbid);
            text.innerText = `${cc.title}, ${movieDetails.Plot}`;
            text.style.display = "none";

            poster.onclick = function () {
                text.style.display = "block";
                text.style.color = "aliceblue";
                poster.style.height = "120px";
                poster.style.width = "180px";
                poster.style.margin = "10px";
                poster.style.borderRadius = "10px";

                let tarbort = document.createElement("button");
                tarbort.innerHTML = "X";
                tarbort.classList = "buttondez";
                filmbox.style.display = "flex";
                filmbox.style.flexDirection = "column";
                filmbox.style.justifyContent = "space-around";
                filmbox.style.alignItems = "center";
                filmbox.style.backgroundColor = "rgb(41, 41, 41)";
                filmbox.appendChild(tarbort);

                tarbort.addEventListener("click", function () {
                    text.style.display = "none";
                    poster.style.height = "400px";
                    poster.style.width = "200px";
                    poster.style.marginLeft = "0px";
                    poster.style.marginTop = "0px";
                    poster.style.borderRadius = "0px";
                    poster.style.margin = "0px";
                    tarbort.remove();
                });
            };
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}