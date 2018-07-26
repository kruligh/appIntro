let displayElement = document.getElementById("display_element");

const lastSeen = getCookie('lastSeen');

if (lastSeen === 'never') {
    displayElement.innerText = "Witaj pierwszy raz na stronie!!";
} else {
    displayElement.innerText = "Witaj! Ostatni raz odwiedziłeś nas " + parseInt(lastSeen)/1000 + " sekund temu!";
}


function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (const pair of cookies) {
        const [cookieName, cookieValue] = pair.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
}