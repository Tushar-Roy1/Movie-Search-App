const SearchForm = document.querySelector('form');
const MovieContainer = document.querySelector('.movie-container');
const InputBox= document.querySelector('.input-box');

//Function To fetch Movie Details using Omdb Api

const getMovieInfo= async  (movie)=>{
    try{
     const myApiKey= "a22eaee4";
     const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

     const response= await fetch(url);
     if(!response.ok){
        throw new error("Unable To Fetch Movie Data")
     }

     const data = await response.json();
     ShowMovieData(data);
}
catch(error){
    showErrorMessage('No Movie Found!')

}
}


//Function to show Movie DAta on Screen

const ShowMovieData=(data)=>{
    MovieContainer.innerHTML="";
    MovieContainer.classList.remove('noBackground');
    //Use Destructuring Assignment to Extract Properties From Data Object
    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;


    const movieGnereElement = document.createElement('div');
    movieGnereElement.classList.add('movie-genre');

    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText=element;
        movieGnereElement.appendChild(p);
        
    });
    movieElement.appendChild(movieGnereElement);


    movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
                              <p><strong>Duration:</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>`;

    //Creating Div For Movie Poster 
    const moviePoster = document.createElement('div');
    moviePoster.innerHTML = `<img src="${Poster}"/>`;

    MovieContainer.appendChild(moviePoster);

    MovieContainer.appendChild(movieElement);
                              
}
//Function To display error message
const showErrorMessage=(message)=>{
    MovieContainer.innerHTML=`<h2>${message}</h2>`;
    MovieContainer.classList.add('noBackground');
}
//Function To Handle Form submisson

const handleFormSubmission=(e)=>{
    e.preventDefault();
    const MovieName = InputBox.value.trim();

    if(MovieName!=''){
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(MovieName);
    }
    else{
      showErrorMessage('Enter A Proper Movie Name!')
    }
}
//Adding Event Listner To Search Form
SearchForm.addEventListener("submit",handleFormSubmission);

