let count = 999;

let counterElement = document.getElementById("display_counter");

counterElement.innerText = count;

function buttonClicked() {
    count = count + 1;
    counterElement.innerText = count;
}