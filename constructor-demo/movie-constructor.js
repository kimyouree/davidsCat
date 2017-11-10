//app that catalogues movies, blueprint for how to store our movie data each rep'd by a js OBJECT. create a constructor function that provides a blueprint for our these movie object is going to be structured. 
//constructors are just functions, with an uppercase and singluar
function Movie(title, year){
    this.title=title; 
    this.year=year; 
    //adding a rewind 'method'
    this.rewind= function(){
            console.log('be kind, rewind! \\m/')
    }
}
console.log(Movie.prototype);

//the keyword THIS occurs in FUNCTIONS 



console.log(starTrek.rating); //this is how to access a property inside an option object name.property (dot notation)
Movie.prototype.fastForward=function(){
        console.log('man, that was boring!');
}

let starTrek = new Movie('star trek', 1979); 
//anytime you call a constructor, you have to add 'new'(keyword: means we're buidling something new) before the name of the constructor (Movie)
starTrek.rewind(); 
starTrek.fastForward();


let godFather = new Movie('The Godfather', 1972);
console.log(godFather.rating); 
