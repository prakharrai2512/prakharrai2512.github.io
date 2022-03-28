//Code by Monke ~Prakhar Rai
var inst = new Instrument({wave: 'piano', detune: 0});

var char2en={
    '\n' : 0,
    ' ' : 1 ,
    '!' : 2 ,
    '"' : 3 ,
    '#' : 4 ,
    '\'' : 5 ,
    '(' : 6 ,
    ')' : 7 ,
    ',' : 8 ,
    '-' : 9 ,
    '.' : 10 ,
    '/' : 11 ,
    '0' : 12 ,
    '1' : 13 ,
    '2' : 14 ,
    '3' : 15 ,
    '4' : 16 ,
    '5' : 17 ,
    '6' : 18 ,
    '7' : 19 ,
    '8' : 20 ,
    '9' : 21 ,
    ':' : 22 ,
    '<' : 23 ,
    '=' : 24 ,
    '>' : 25 ,
    'A' : 26 ,
    'B' : 27 ,
    'C' : 28 ,
    'D' : 29 ,
    'E' : 30 ,
    'F' : 31 ,
    'G' : 32 ,
    'H' : 33 ,
    'I' : 34 ,
    'J' : 35 ,
    'K' : 36 ,
    'L' : 37 ,
    'M' : 38 ,
    'N' : 39 ,
    'O' : 40 ,
    'P' : 41 ,
    'Q' : 42 ,
    'R' : 43 ,
    'S' : 44 ,
    'T' : 45 ,
    'U' : 46 ,
    'V' : 47 ,
    'W' : 48 ,
    'X' : 49 ,
    'Y' : 50 ,
    'Z' : 51 ,
    '[' : 52 ,
    ']' : 53 ,
    '^' : 54 ,
    '_' : 55 ,
    'a' : 56 ,
    'b' : 57 ,
    'c' : 58 ,
    'd' : 59 ,
    'e' : 60 ,
    'f' : 61 ,
    'g' : 62 ,
    'h' : 63 ,
    'i' : 64 ,
    'j' : 65 ,
    'k' : 66 ,
    'l' : 67 ,
    'm' : 68 ,
    'n' : 69 ,
    'o' : 70 ,
    'p' : 71 ,
    'q' : 72 ,
    'r' : 73 ,
    's' : 74 ,
    't' : 75 ,
    'u' : 76 ,
    'v' : 77 ,
    'w' : 78 ,
    'x' : 79 ,
    'y' : 80 ,
    'z': 81 ,
    '|': 82 
};


var decoder = ['\n' ,
    ' ' ,
    '!' ,
    '"' ,
    '#' ,
    '\'' ,
    '(' ,
    ')' ,
    ',' ,
    '-' ,
    '.' ,
    '/' ,
    '0' ,
    '1' ,
    '2' ,
    '3' ,
    '4' ,
    '5' ,
    '6' ,
    '7' ,
    '8' ,
    '9' ,
    ':' ,
    '<' ,
    '=' ,
    '>' ,
    'A' ,
    'B' ,
    'C' ,
    'D' ,
    'E' ,
    'F' ,
    'G' ,
    'H' ,
    'I' ,
    'J' ,
    'K' ,
    'L' ,
    'M' ,
    'N' ,
    'O' ,
    'P' ,
    'Q' ,
    'R' ,
    'S' ,
    'T' ,
    'U' ,
    'V' ,
    'W' ,
    'X' ,
    'Y' ,
    'Z' ,
    '[' ,
    ']' ,
    '^' ,
    '_' ,
    'a' ,
    'b' ,
    'c' ,
    'd' ,
    'e' ,
    'f' ,
    'g' ,
    'h' ,
    'i' ,
    'j' ,
    'k' ,
    'l' ,
    'm' ,
    'n' ,
    'o' ,
    'p' ,
    'q' ,
    'r' ,
    's' ,
    't' ,
    'u' ,
    'v' ,
    'w' ,
    'x' ,
    'y' ,
    'z' ,
    '|' 
];

async function predicter(output){
    var model_path='https://raw.githubusercontent.com/prakharrai2512/Music-man/master/jsrmodel/model.json';
    const model = await tf.loadLayersModel(model_path,Strict=false);
    var x = await model.predict(output);
    return x;
}

async function load(){
    var model_path='https://raw.githubusercontent.com/prakharrai2512/Music-man/master/12.1seq/model.json';
    let model = await tf.loadLayersModel(model_path);
    return model;
}

var model=load();

async function tatake(){
    model = load();
    var input = document.getElementById("reader").value;
    var output=[];
    for(let i=0;i<input.length;i++){
        output.push(char2en[input[i]]);
    }
    if(input.length!=12){
        alert(`String length must be 12, it is ${input.length}`);
        return;
    }
    //
    /*const predicted = (data)=>{
        model.predict(tf.tensor(output,[1,1]));
        return prediction.data
    }*/
    //predicted.then(res=>console.log(res));
    //prediction = model.tehn(tf.tensor(output,[1,1]));
    //var prediction = model.predict(tf.tensor(output,[1,1]));;
    var ans1="X:1\nQ:120";
    for(let i=0;i<1000;i++){
        await model.then(function (res) {
            const prediction = res.predict(tf.tensor(output,[12,]));
            //console.log(prediction);
            var predicted_id = prediction.dataSync();
            predicted_id = predicted_id.slice(913,996);
            //console.log(predicted_id);
            const sampled = tf.multinomial(predicted_id,2);
            var choose;
            choose = sampled.dataSync()[0];
            /*if(choose=='\n'){
                choose = sampled.dataSync()[1];
            }*/
            //console.log(choose);
            var temp=[];
            for(let i=1;i<12;i++){
                temp.push(output[i]);
            }
            temp.push(choose);
            output=temp;
            //console.log(output);
            ans1 +=(decoder[choose]);
            //console.log(sampled.dataSync()[0]);
        }, function (err) {
            console.log(err);
        });
        //console.log(ans1);
    }
    //return ans1;
    //sleep(1000);
    console.log(ans1);
    var player=[];
    var i=0;
    for(let j=1;j<ans1.length;j++){
        if(ans1[j]=='X'){
            player.push(ans1.slice(i,j));
            i=j;
        }
    }
    player.push(ans1.slice(i,ans1.length));
    //console.log(player);
    for(let i=0;i<player.length;i++){
        await inst.play(player[i],
            // The optional last argument is a callback when the song is done.
            function() {
            //console.log(player[i]);
            document.getElementsByTagName('span')[0].innerHTML = '(Done playing.)';
            }
        );
        inst.on('noteon', function(e) {
            //console.log(e.frequency);
        });
        
    }
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


