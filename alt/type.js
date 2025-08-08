var i = 0;
var txt = 'Fourth year physics student with too many ongoing projects...';
var txt2 = 'Fourth year physics student with not enough ongoing projects.';

var speed = 30;
let deleting = false;
let phase = 1;

function typeWriter() {
  if (i < txt.length && (phase == 1)) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else if (i == txt.length && (phase == 1)){
    setTimeout( () => {
        phase = 2;
        speed = 50;
        typeWriter();
    }, 1000);
  } if (i > 'Fourth year physics student with '.length && (phase == 2)) {
    str = document.getElementById("demo").innerHTML
    document.getElementById("demo").innerHTML = str.substring(0, str.length-1);
    i--;
    setTimeout(typeWriter, speed);
  } else if (i == 'Fourth year physics student with '.length && (phase == 2)){
    setTimeout( () => {
        phase = 3;
        speed = 25;
        typeWriter();
    }, 200);

  }
  if (i < txt2.length && (phase == 3)){
    document.getElementById("demo").innerHTML += txt2.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter()