let canSpin = true;
let caitlinAudio = document.querySelector('#caitlin');
let winlineAudio = document.querySelector('#winline')
let teemoAudio = document.querySelector('#teemo')
let winlineAudio2 = document.querySelector('#winline2')
let firstLinePresenter = document.querySelector('.show-line-1');
let secondLinePresenter1 = document.querySelector('.show-line-2');
let secondLinePresenter12 = document.querySelector('.show-line-2-1');
let thredLinePresenter = document.querySelector('.show-line-3');
let fourLinePresenter = document.querySelector('.show-line-4');
let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let four = document.querySelector('#four');
let startBtn = $('#start');
let container = $('.container');
let counter = 0;
let winingLines = [];
startBtn.on('click',spin)

window.addEventListener('keyup',function(e){
  
  if(canSpin && e.keyCode == 32){
    canSpin = false;
    spin()
  }
  
})

one.addEventListener('mouseover',function(){
  firstLinePresenter.style.display = "block";
})
one.addEventListener('mouseout',function(){
  firstLinePresenter.style.display = "none";
})


two.addEventListener('mouseover',function(){
  secondLinePresenter1.style.display = "block";
  secondLinePresenter12.style.display = "block";
})
two.addEventListener('mouseout',function(){
  secondLinePresenter1.style.display = "none";
  secondLinePresenter12.style.display = "none";
})

three.addEventListener('mouseover',function(){
  thredLinePresenter.style.display = "block";
})
three.addEventListener('mouseout',function(){
  thredLinePresenter.style.display = "none";
})

four.addEventListener('mouseover',function(){
  fourLinePresenter.style.display = "block";
})
four.addEventListener('mouseout',function(){
  fourLinePresenter.style.display = "none";
})


function spin(){
  startBtn.attr('disabled','disabled')
  counter++;
  winingLines.length = 0;
  let time = 700;
  let one = 0;

 if(counter == 2){
  $('.intro').remove();
 }
  createNewLines()


    $.each($('.line'),function(i,e){
      time += 100;
      winlineAudio.play()
      $(e).animate({
        top : "+=4200"
    },time,'swing',function(){
            $(this).addClass('animated');
            if(this.classList.contains('newline-5')){
              one++;
              if(counter == 1){
                checkLines()
              }
              if(one == 2){
                removeAnimated();
              }
            }
    })
    })
}

function removeAnimated(){
  //console.log(' last animation finished'); // last animation finished
  let allNewLines = $('.animated');
  $.each(allNewLines,function(index,element){
    if($(element).data('id') < (counter)){
      $(element).remove()
    }
  })
  checkLines();
}

function checkLines(){
  console.log('checking...');

  let lines = [
    [1,1,1,1,1],
    [2,2,2,2,2],
    [3,3,3,3,3],
    [1,2,3,2,1],
    [3,2,1,2,3]
  ];

lines.forEach(function(line){
  if(!checkFive(line)){
    if(!checkFour(line)){
      if(!checkThree(line)){
        checkTwo(line);
      }
    }
  }
})
animateWinningLines()

}

function checkTwo(line){
  if($('.newline-1 > .box-'+line[0]).find('img').attr('src') == "images/key.png"){
    if($('.newline-1 > .box-'+line[0]).html() == $('.newline-2 > .box-'+line[1]).html()){
      winingLines.push([$('.newline-1 > .box-'+line[0]),$('.newline-2 > .box-'+line[1])]);
      return true;
    }
  }
  
}
function checkThree(line){
  if($('.newline-1 > .box-'+line[0]).html() == $('.newline-2 > .box-'+line[1]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-3 > .box-'+line[2]).html()){
    winingLines.push([$('.newline-1 > .box-'+line[0]),$('.newline-2 > .box-'+line[1]),$('.newline-3 > .box-'+line[2])])
    return true;

  }
}
function checkFour(line){
  if($('.newline-1 > .box-'+line[0]).html() == $('.newline-2 > .box-'+line[1]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-3 > .box-'+line[2]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-4 > .box-'+line[3]).html()){
    winingLines.push([$('.newline-1 > .box-'+line[0]),$('.newline-2 > .box-'+line[1]),$('.newline-3 > .box-'+line[2]),$('.newline-4 > .box-'+line[3])])
    return true;

  }
}
function checkFive(line){
  if($('.newline-1 > .box-'+line[0]).html() == $('.newline-2 > .box-'+line[1]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-3 > .box-'+line[2]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-4 > .box-'+line[3]).html() && $('.newline-1 > .box-'+line[0]).html() == $('.newline-5 > .box-'+line[4]).html()){
    winingLines.push([$('.newline-1 > .box-'+line[0]),$('.newline-2 > .box-'+line[1]),$('.newline-3 > .box-'+line[2]),$('.newline-4 > .box-'+line[3]),$('.newline-5 > .box-'+line[4])])
    return true;

  }
}

function checkFreeGames(){
  let allVisibles = $('.box-1,.box-2,.box-3');
  let chests = [];
  $.each(allVisibles,function(index,box){
    if($(box).find('img').attr('src') == "images/chest.png"){
      chests.push($(box))
    }
  })
  console.log(chests.length)
  if(chests.length > 2){
    console.log("free games");
    
  }
}

function animateWinningLines(){
  let timer = 0;
  let tester = 0;
  let winLinesLength = winingLines.length;
  if(winLinesLength == 0){
    canSpin = true;
    checkFreeGames()

    startBtn.removeAttr('disabled')
  }
  winingLines.forEach(function(line){
   
    tester++;
    setTimeout(function(){
      // winlineAudio2.play();
      console.log()
      if(line[0].find('img').attr('src') == 'images/cait.ico'){
        caitlinAudio.play()
      }else if(line[0].find('img').attr('src') == 'images/teemo.png'){
teemoAudio.play()
      }
      line.forEach(function(box){
        box.find('img').animate({
          width : "160px",
          height: "160px"
        },200,function(){
          $(this).animate({
            width : "140px",
            height: "140px"
          },200,function(){
            if(tester == winLinesLength){
              canSpin = true
              checkFreeGames()
              startBtn.removeAttr('disabled')
            }
          })
        })
      })
      
    },timer)
    timer += 1200;
  })
}

function createNewLines(){
   let text = '';
   for (let i = 1; i < 6; i++) {
     text += '<div class="newline newline-'+i+' line" data-id="'+counter+'"></div>';
   }
   container.append(text);

   $.each($('.newline:not(.animated)'),function (index,element) {
      for (let i = 1; i < 22; i++) {
        let rand = Math.floor(Math.random()*icons.length);
        $(element).append(' <div class="box box-'+i+'"><img class="icon" src="images/'+icons[rand]+'"</div>');
      }
   })
}


