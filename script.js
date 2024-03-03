window.addEventListener('load', () => {
    
    button1.addEventListener("click" , function(){
        location.reload();
    })
    
    
    section.style.border="none"
    button.onclick = async function () {
       /* let section = document.createElement("section");
        section.classList = "sss";
        document.body.appendChild(section);
        */
       section.style.border="3px solid gold"
        let x = input.value;
        await uppgift2(x);
    };
        
       
    });
    
    let input = document.getElementById("input");
    let button = document.getElementById("button");
    let section = document.getElementById("section");
    let button1 = document.getElementById("button1");
    
    
    
    
    async function uppgift2(movieID) {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=5da79303&s=${movieID}`);
            const data = await response.json();
            console.log(data);
    
            section.innerHTML = "";
    
            for (const yy of data.Search) {
                let posterlink = yy.Poster;
    
                if (posterlink !== "N/A") {
                    let span = document.createElement("div");
                    span.classList = "span1";
                    section.appendChild(span);
    
                    
    
                    let img = document.createElement("img");
                    img.classList = "imgposter";
                    img.src = yy.Poster;
                    span.appendChild(img);
    
                    let butonf = document.createElement("button");
                    /*butonf.textContent = "Favorit";
                    butonf.style.backgroundColor = "green";
                    span.appendChild(butonf);
                    butonf.onclick = function () {
                        window.location.href = "Favorit.html";
                    };
                    */
    
                    let text = document.createElement("p");
                    text.style.textAlign = "center";
                    span.appendChild(text);
                    
    
                    // Anropa funktionen för att hämta detaljerad information om filmen
                    const movieDetails = await getMovieDetails(yy.imdbID);
                    text.innerText = `${yy.Title}, ${yy.Year}, ${movieDetails.Plot}`;
                    text.style.display = "none";
    
                    img.onclick = function () {
                        text.style.display = "block";
                        text.style.color = "aliceblue";
                        img.style.height = "120px";
                        img.style.width = "180px";
                        img.style.margin = "10px";
                        img.style.borderRadius = "10px";
    
                        let button = document.createElement("button");
                        button.innerHTML = "X";
                        button.classList = "buttondez";
                        span.style.display = "flex";
                        span.style.flexDirection = "column";
                        span.style.justifyContent = "space-around";
                        span.style.alignItems = "center";
                        span.style.backgroundColor = "rgb(41, 41, 41)";
                        span.appendChild(button);
    
                        button.addEventListener("click", function () {
                            text.style.display = "none";
                            img.style.height = "400px";
                            img.style.width = "200px";
                            img.style.marginLeft = "0px";
                            img.style.marginTop = "0px";
                            img.style.borderRadius = "0px";
                            img.style.margin = "0px";
                            button.remove();
                        });
                    };
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    async function getMovieDetails(movieID) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=5da79303&i=${movieID}`);
        const data = await response.json();
        console.log(data.Plot);
        return data;
    }