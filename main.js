const first = document.getElementById('firstBar');
const second = document.getElementById('secondBar');
const third = document.getElementById('thirdBar');
const navBar = document.getElementById('navb')

function scroll(){
    if(document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20){
        navBar.document.style.color = 'red';
    }else{
        
    }
}

function showFirst() {
    if (first.style.display === 'none') {
        first.style.display = 'block';
        second.style.display = 'none';
        third.style.display = 'none';
    } else {
        first.style.display = 'none';
    }
}

function showSecond() {
    if (second.style.display === 'none') {
        second.style.display = 'block';
        first.style.display = 'none';
        third.style.display = 'none';
    } else {
        second.style.display = 'none';
    }
}

function showThird() {
    if (third.style.display === 'none') {
        third.style.display = 'block';
        first.style.display = 'none';
        second.style.display = 'none';
    } else {
        third.style.display = 'none';
    }
}

function display() {
    first.style.display = 'block';
    second.style.display = 'none';
    third.style.display = 'none';
}