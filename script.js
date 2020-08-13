const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// console.log(typeof ticketPrice);  //String without using "+" symbol, with "+"" you get a number in the console
// console.log(ticketPrice); //Price of movie


//save the selected movie and their price 
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);

}
//update the total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    // console.log(selectedSeats);  //we get a node list 

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // console.log(seatsIndex); //to check the array 
    
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length; //to count the number of seats
    // console.log(selectedSeatsCount); //log it to check the number of seats
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
    
}

//getting the data from the local storage and populate the user interface
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    // console.log(selectedSeats);
    if(selectedSeats !==null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//movie change
movieSelect.addEventListener("change", e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//seats click
container.addEventListener("click", e => {
    // console.log(e.target); to check elements 
    // below is to check seats that are not occupied
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        // console.log(e.target);  //to check seats that are not occupied
        e.target.classList.toggle("selected"); //to toggle the seats 
        updateSelectedCount();
    }
});

//initial count and total sleceted set

updateSelectedCount();
