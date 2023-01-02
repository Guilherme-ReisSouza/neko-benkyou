const cards = document.querySelectorAll(".card");

let matched = 0;
let erros = 0;
let level = 1;
let typeStudy = "hiragana";
let cardOne, cardTwo;
let disableDeck = false;

function typeOfStudy(){
    let type = prompt("Digite o numero do que deseja estudar: \n1: hiragana \n2: katakana \n3: kanji");
    if (type == 1){
        typeStudy = "hiragana";
    }

    else if (type == 2){
        typeStudy = "katakana";
    }

    else if (type == 3){
        typeStudy = "kanji";
    }

    else{
        typeStudy = "hiragana";
    }
}

typeOfStudy();

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 10) {
            level++;
            erros=0;
            document.getElementById("avatarerro").src="../images/memorygame/avatarerro/muitobom.png";
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    erros++;
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);

    if(erros < 5){
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/muitobom.png";
    }
    else if( erros >=5 && erros < 10){
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/otimo.png";
    }

    else if( erros >=10 && erros < 15){
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/bom.png";
    }

    else if( erros >=15 && erros < 20){
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/neutro.png"; 
    }
    else if( erros >=20 && erros < 25){
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/ruim.png";
    }
    else {
        document.getElementById("avatarerro").src="../images/memorygame/avatarerro/pessimo.png";
    }
}

function shuffleCard() {

    if(level==1){
        document.body.style.background = "#5271FF";
    }
    else if(level==2){
        document.body.style.background = "#FCC85E";
    }
    else if(level==3){
        document.body.style.background = "#8C52FF";
    }
    else if(level==4){
        document.body.style.background = "#00C2CB";
    }
    else if(level==5){
        document.body.style.background = "#D4145A";
    }
    else{
        level = 1;
        erros=0;
        document.body.style.background = "#5271FF";
    }

    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `../images/memorygame/${typeStudy}/nivel${level}/${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });

}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});