let px;
let arr;
function setup(){
    createCanvas(windowWidth,windowHeight);
    px = width;
    arr = new Array(px);
    frameRate(1);
    strokeWeight(1);
    stroke(randClr());
    init();
}
function draw(){
    background(255);
    update();
    for ( let i = 0; i < px;i++) {
        line(i, 0, i, arr[i]);
        //console.log(arr[i]);
    } 
}
function init(){
    arr[px-1] = random(0,windowHeight);
    
}
function update(){
    //console.log("hello");
    /*for ( let i = 0; i < px;i++) {
        if(i>1){
            arr[i] += floor(random(4))*random(-1,1)//*(2*(arr[i] - arr[i-1]) - (arr[i-1] - arr[i-2]));
        }
        else if(i==0){
            arr[0] += //(arr[0] - arr[px-1]) + floor(random(4))*random(-1,1);
        }
        else if(i==1){
            arr[1] += //(arr[1] - arr[0]) + floor(random(4))*random(-1,1);
        }
        if(arr[i]>windowHeight){
            arr[i] = windowHeight;
        }
        if(arr[i]<0){
            arr[i] = 0;
        }
    }*/
    arr[0] = arr[px-1] + floor(random(4))*random(-1,1);
    for ( let i = 1; i < px;i++) {
        arr[i] = arr[i-1] + floor(random(4))*random(-1,1);
        if(arr[i]>windowHeight){
            arr[i] = windowHeight - floor(random(4));
        }
        else if(arr[i]<0){
            arr[i] = 0 + floor(random(4));
        }
    }
    for ( let i = 11; i < px;i++) {
        arr[i] = (arr[i] + arr[i-1] + arr[i-2] + arr[i-3] + arr[i-4] + arr[i-5] + arr[i-6] + arr[i-7] + arr[i-9] + arr[i-8] + arr[i-10] + arr[i-11])/12;
    }

}
function randClr(){
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
    return color(r,g,b);
}