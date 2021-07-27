let h;
let coln;
let rown;
let next;
let board;
let tram;
let clist;
let prlist;
let ant_x;
let ant_y;
let ant_o;
function setup(){
    createCanvas(displayWidth,displayHeight)
    h=10;
    coln=floor(width/h);
    rown=floor(height/h);
    board=new Array(rown);
    for(let i=0; i<rown; i++){
        board[i]= new Array(coln);
    }
    next = new Array(rown);
    for (i = 0; i < rown; i++) {
    next[i] = new Array(coln);
    }
    frameRate(15); 
    tram = ceil(random(5));
    ant_x = floor(col/2);
    ant_y = floor(row/2);
    ant_o = floor(random(4));
    init();
}

function init(){
    clist = new Array(tram);
    clist[0] = color(255,255,255)
    prlist[0] = floor(random(2));
    for(let i=1;i<tram;i++){
        clist[i] = randClr();
        prlist[i] = floor(random(2));
    }
    for(let i=0; i<rown; i++){
        for(let j=0; j<coln; j++){
            board[i][j] = 0;
        }
    }
}

function antmove(x,y){

}

function update(){
let k = board[i][j];
if(k==(tram-1)){
    k=0;
}
else{
    k=k+1;
}

let mv = prlist[k];
if(ant_o == 0){
    if(mv == 0){
        antmove(-1,0);
    }
    else{
        antmove(1,0);
    }
}
if(ant_o == 1){
    if(mv == 0){
        antmove(0,1);
    }
    else{
        antmove(0,-1);
    }
}
if(ant_o == 2){
    if(mv == 0){

    }
    else{
        
    }
}
if(ant_o == 3){
    if(mv == 0){

    }
    else{
        
    }
}
}

function randClr(){
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
    return color(r,g,b);
}