console.log('hitung palingram');

var listText = [];
var palingram = [];

const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
    input: fs.createReadStream('2of12.txt')
});

let total_palingram = 0;

function checkForPalingram(text1, text2) {

    // pastikan buka satu karakter
    if(text1.length < 2 || text2.length < 2) return;

    // hapus jika terdapat space
    str = (text1+text2).replace(/\s/g, '');

    // check yang bukan palingram
    maxProccess = (str.length-1)/2;
    for(let i=0; i<maxProccess; i++) {
        if(str[i] !== str[str.length-(i+1)]) {
            // console.log('bukan palingram');
            return;
        }
    }

    // simpan palingram
    total_palingram++;
    palingram.push(text1+' '+text2);
    console.log(total_palingram+'. '+text1+' '+text2);

}

function writeForPalingram() {
    console.log('selesai baca file');
    var maxText = listText.length;
    var start = new Date(); 

    // lakukan hitung palingram
    for(let i=0; i<maxText; i++) {
        for(let s=0; s<maxText; s++) {
            checkForPalingram(listText[i],listText[s]);
        }
    }

    // tampilkan informasi
    var end =  new Date();
    var diff = end - start;
    console.log('total time: '+ diff +' ms');
    console.log('palingram', + total_palingram);

    // simpan hasil palingram ke text
    var file = fs.createWriteStream('palingram.txt');
    file.on('error', function(err) { /* error handling */ });
    palingram.forEach(function(v) { file.write(v + '\n'); });
    file.end();
    console.log('selesai menyimpan text');
}

rl.on('line', function(line){
    listText.push(line);
   });

rl.on('close', writeForPalingram);

