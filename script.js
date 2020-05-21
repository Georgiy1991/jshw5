var start = document.querySelector('.start-button');
var reset = document.querySelector('.reset-button');
var lap = document.querySelector('.lap-button');
var pause = document.querySelector('.pause-button');
var list = document.getElementById('list');
var globalTime;
var init = 0;
var startDate;
var clocktimer;

function clearFields() {
clearTimeout(clocktimer);
document.querySelector('.big').innerHTML = '00.00.00';
document.querySelector('.small').innerHTML = '.00';
list.innerHTML = ''; 
globalTime=0;
};

function startTIME(plus = 0) {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime() + plus;
    globalTime = t;

    var ms = t%1000;
    t-=ms;
    ms=Math.floor(ms/10);
    t = Math.floor (t/1000);

    var s = t%60;
    t-=s;
    t = Math.floor (t/60);

    var m = t%60;
    t-=m;
    t = Math.floor (t/60);

    var h = t%60;

    if (h<10) h='0'+h;
    if (m<10) m='0'+m;
    if (s<10) s='0'+s;
    if (ms<10) ms='0'+ms;

    document.querySelector('.big').innerHTML = h + '.' + m + '.' + s;
    document.querySelector('.small').innerHTML = '.' + ms;
    clocktimer = setTimeout(() => startTIME(plus), 10);
};

function findTIME() {
start.parentNode.replaceChild(pause, start);
reset.parentNode.replaceChild(lap, reset);
lap.style.display = lap.style.display === 'flex' ? 'none' : 'flex';
pause.style.display = pause.style.display === 'flex' ? 'none' : 'flex';
start.style.display = start.style.display === 'none' ? 'flex' : 'none';
reset.style.display = reset.style.display === 'none' ? 'flex' : 'none';

    if(!init) {
        startDate = new Date();
        startTIME();
        init = 1;
        } else {
        startDate = new Date();
        var plusTime = globalTime;
        startTIME(plusTime);
        }
};

function pauseTIME(){
    clearTimeout(clocktimer);
    pause.parentNode.replaceChild(start, pause);
    lap.parentNode.replaceChild(reset, lap);
    start.style.display = start.style.display === 'flex' ? 'none' : 'flex';
    reset.style.display = reset.style.display === 'flex' ? 'none' : 'flex';
    lap.style.display = lap.style.display === 'none' ? 'flex' : 'none';
    pause.style.display = pause.style.display === 'none' ? 'flex' : 'none';
};




function addLap(){
    clearTimeout(clocktimer);
    var newLi = document.createElement('li');
    newLi.classList.add("new-li");
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    globalTime = t;
    var lapTime = 0;

    var ms = t%1000;
    t-=ms;
    ms=Math.floor(ms/10);
    t = Math.floor (t/1000);

    var s = t%60;
    t-=s;
    t = Math.floor (t/60);

    var m = t%60;
    t-=m;
    t = Math.floor (t/60);

    var h = t%60;

    if (h<10) h='0'+h;
    if (m<10) m='0'+m;
    if (s<10) s='0'+s;
    if (ms<10) ms='0'+ms;
    if(!init) {
        startDate = new Date();
        startTIME();
        init = 1;
        } else {
        startDate = new Date();
        startTIME();
            init = 0;
        };
        
   
    newLi.innerHTML = h + '.' + m + '.' + s + ':' + ms;
    list.appendChild(newLi);
    
};