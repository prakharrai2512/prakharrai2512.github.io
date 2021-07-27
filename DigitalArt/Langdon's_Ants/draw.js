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
    h=25;
    coln=floor(displayWidth/h);
    rown=floor(displayHeight/h);
    board=new Array(rown);
    for(let i=0; i<rown; i++){
        board[i]= new Array(coln);
    }
    next = new Array(rown);
    for (let i = 0; i < rown; i++) {
    next[i] = new Array(coln);
    }
    tram = ceil(random(5)) + 1;
    console.log(tram);
    ant_x = floor(random(coln));
    ant_y = floor(random(rown));
    ant_o = floor(random(4));
    frameRate(90);
    strokeWeight(0.2);
    init();
}
function draw(){
    background(255);
    for ( let i = 0; i < rown;i++) {
    for ( let j = 0; j < coln;j++) {
      let colr = clist[board[i][j]];
      fill(colr);
      stroke(0);
      rect(j * h, i * h, h-1, h-1);
    }
    }
    update();
}
function init(){
    clist = new Array(tram);
    prlist = new Array(tram);
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
    let tx;
    let ty;
    tx = ant_x + x;
    ty = ant_y + y;
    if(tx<0){
        tx = coln+tx;
    }
    if(ty<0){
        ty = ty+rown;
    }
    if(tx>=coln){
        tx = 0;
    }
    if(ty>=rown){
        ty = 0;
    }
    ant_x = tx;
    ant_y = ty;
}

function update(){
let k = board[ant_y][ant_x];
if(k==(tram-1)){
    k=0;
}
else{
    k=k+1;
}
board[ant_y][ant_x] = k;
let mv = prlist[k];
if(ant_o == 0){
    if(mv == 0){
        antmove(-1,0);
        ant_o=3;
    }
    else{
        antmove(1,0);
        ant_o=1;
    }
}
else if(ant_o == 1){
    if(mv == 0){
        antmove(0,1);
        ant_o=0;
    }
    else{
        antmove(0,-1);
        ant_o=2;
    }
}
else if(ant_o == 2){
    if(mv == 0){
        antmove(1,0);
        ant_o=1;
    }
    else{
        antmove(-1,0);
        ant_o=3;
    }
}
else if(ant_o == 3){
    if(mv == 0){
        antmove(0,-1);
        ant_o=2;
    }
    else{
        antmove(0,1);
        ant_o=0;
    }
}
}

function randClr(){
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
    return color(r,g,b);
}