//1. Age in days
function ageindays() {
    var birthyear=prompt("Enter which year you were born");
    var c=new Date();
    var n=c.getFullYear();
    var ageindayss=(n - birthyear) * 365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are ' + ageindayss + ' days old.')
    
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageindays').remove();
}

//2. Cat generator

function generatecat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen')
    image.src='https://thecatapi.com/api/images/get?format=src&type=gif&size=small'
    div.appendChild(image);
}

//3. Rock, Paper ,Scissors

function rpsgame(choice){
    //console.log(choice);
    var humanchoice,botchoice;
    humanchoice=choice.id;
    botchoice=numbertochoice(randm());
    //console.log('Computer choice:',botchoice);
    results=decideWinner(humanchoice,botchoice);
    //console.log(results);
    message=finalmessage(results);
    //console.log(message);
    rpsfrontend(choice.id,botchoice,message);
}

function randm(){
    return Math.floor(Math.random()*3);
}

function numbertochoice(number){
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourchoice,computerchoice){
    var rpsdatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }

    var yourscore=rpsdatabase[yourchoice][computerchoice];
    var computerscore=rpsdatabase[computerchoice][yourchoice];

    return [yourscore,computerscore];
}

function finalmessage([yourscore,computerscore]){
    if (yourscore==0){
        return{'message':'You lost!','color':'red'};
    }else if(yourscore==0.5){
        return {'message':'Tied!','color':'yellow'};
    }else{
        return {'message':'You Won!','color':'green'};
    }
}

function rpsfrontend(humanimagechoice,botimagechoice,finalmessage){
    var imagedatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humandiv=document.createElement('div');
    var botdiv=document.createElement('div');
    var messagediv=document.createElement('div');

    
    humandiv.innerHTML="<img src='" + imagedatabase[humanimagechoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messagediv.innerHTML="<h1 style='color: " + finalmessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalmessage['message'] + "</h1>"
    botdiv.innerHTML="<img src='" + imagedatabase[botimagechoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"
    
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    
}

//4.Change the color of all buttons
var allbuttons=document.getElementsByTagName('button');
var copyofallbtn=[];
for(let i=0;i<allbuttons.length;i++){
    copyofallbtn.push(allbuttons[i].classList[1]);
}



function buttoncolorchange(btn){
    if(btn.value=='red'){
        buttonred();
    }else if(btn.value=='green'){
        buttongreen();
    }else if(btn.value=='reset'){
        buttonreset();
    }else if(btn.value=='random'){
        randomcolor();
    }
}

function buttonred(){
    for(let i=0;i<allbuttons.length;i++){
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add('btn-danger');
    }
}
function buttongreen(){
    for(let i=0;i<allbuttons.length;i++){
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add('btn-success');
    }
}
function buttonreset(){
    for(let i=0;i<allbuttons.length;i++){
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add(copyofallbtn[i]);
    }
}
function randomcolor(){
    let choices=['btn-primary','btn-danger','btn-success','btn-warning']
    for(let i=0;i,allbuttons.length;i++){
        var randomnumber=Math.floor(Math.random()*4);
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add(choices[randomnumber]);
    }
}


//5. BlackJack
let blackjackgame={
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsvalue':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};

const you=blackjackgame['you']
const dealer=blackjackgame['dealer']

const hitsound=new Audio('sounds/swish.m4a');
const winsound=new Audio('sounds/cash.mp3');
const lossosund=new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);

function blackjackHit(){
        if(blackjackgame['isstand']==false){
        let card=randomcard();
        showcard(card, you);
        updatescore(card,you);
        showscore(you);
    }
}

function randomcard(){
    let randomindex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomindex];
}

function showcard(card, activeplayer){
    if(activeplayer['score']<=21){
        let cardimage=document.createElement('img');
        cardimage.src=`images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

function blackjackdeal(){
    if(blackjackgame['turnsover']==true){

        //showresult(computewinner());
        blackjackgame['isstand']=false;
        let yourimage=document.querySelector('#your-box').querySelectorAll('img');
        let dealerimage=document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<yourimage.length;i++){
            yourimage[i].remove();
        }
        for(let i=0;i<dealerimage.length;i++){
            dealerimage[i].remove();
        }
        
        you['score']=0;
        dealer['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent="Let's Play";
        document.querySelector('#blackjack-result').style.color="black";

        blackjackgame['turnsover']=true;
    }
}

function updatescore(card,activeplayer){
    if(card=='A'){
        if (activeplayer['score']+ blackjackgame['cardsvalue'][card][1]<=21){
            activeplayer['score']+=blackjackgame['cardsvalue'][card][1];
        }else{
            activeplayer['score']+=blackjackgame['cardsvalue'][card][0];
        }
    }else{
    activeplayer['score']+=blackjackgame['cardsvalue'][card];
    }
}

function showscore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent='BUST!';
        document.querySelector(activeplayer['scorespan']).style.color='red';
    }else{
    document.querySelector(activeplayer['scorespan']).textContent=activeplayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerlogic(){
    blackjackgame['isstand']=true;

    while(dealer['score']<16 && blackjackgame['isstand']==true){
        let card=randomcard();
        showcard(card,dealer);
        updatescore(card,dealer);
        showscore(dealer);
        await sleep(1000);
    }
    blackjackgame['turnsover']=true;
    showresult(computewinner());
}

function computewinner(){
    let winner;

    if(you['score']<=21){
        if(you['score']>dealer['score'] || (dealer['score']>21)){
            blackjackgame['wins']++;
            winner=you;
        }else if(you['score']<dealer['score']){
            blackjackgame['losses']++;
            winner=dealer;
        }else if(you['score']==dealer['score']){
            blackjackgame['draws']++;
        }
    
    }else if(you['score']>21 && dealer['score']<=21){
        blackjackgame['losses']++;
        winner=dealer;
    }else if(you['score']>21 && dealer['score']>21){
        blackjackgame['draws']++;
    }
    return winner;
}

function showresult(winner){
    let message,messagecolor;

    if(blackjackgame['turnsover']==true){

    

        if(winner==you){
            document.querySelector('#wins').textContent=blackjackgame['wins'];
            message='You won!';
            messagecolor='green';
            winsound.play();
        }else if(winner==dealer){
            document.querySelector('#losses').textContent=blackjackgame['losses'];
            message='You lost!';
            messagecolor='red';
            lossosund.play();
        }else{
            document.querySelector('#draws').textContent=blackjackgame['draws'];
            message='You drew!';
            messagecolor='black';
        }

        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;
    }

}