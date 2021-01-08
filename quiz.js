//Cache previous QuizzData
var quizzData = [];
// Pointer wich QuizzData is currently loaded
var currentQuizzData = 0;

var answer1Template = '<img class="rounded" src="" alt="" style="width:100%; height:100%" id="answer01Image">';
var answer2Template = '<div class="col p-1"><img class="rounded" src="" alt="" style="width:100%; height:100%" id="answerImage" ></div>';
var answer36Template = '<img class="rounded" src="" alt="" style="width:100%; height:100%" id="answer3_6Image">';
var baseQuizzTemplate = `<div class="card quizzcard quizzContentBody">
<div class="card-header border-0" id="Question">
  <div class="row">
    <div class="col-9 col-lg-11">
     Lebensmittel Checker
    </div>
    <div class="col text-right">
      <img src="/wp-content/themes/deli/images/x.svg" alt=""onclick="cancelQuizz()" id="cancleQuizzButton">
    </div>
  </div>
</div>
<div class="card-body ">
  <div class="row mb-2">
    <div class="col" id="questionText">
    </div>
  </div>
  <div class="row">
    <div class="col-1 text-center p-0 "><img src="/wp-content/themes/deli/images/chevron-compact-left.svg" alt="" style="height:100%; width: 100%;" id="quizzLeftArrow" onclick="handleLeftArrowClick()"></div>
    <div class="col col-lg-10 text-center">
      <div class="row">
        <div class="col-8">
          <div class="row" id="contentAnswer3_6">          
          </div>
          <div class="row" id="contentAnswer2">   
          </div>
        </div>
        <div class="col p-1" id="contentAnswer1">       
        </div>
      </div>
    </div>
    <div class="col-1 ml-auto text-center p-0"><img src="/wp-content/themes/deli/images/chevron-compact-right.svg" alt=""style="height:100%; width: 100%;"id="quizzRightArrow" onclick="handleRightArrowClick()"></div>
  </div>   
</div>
</div>`;

function cancelQuizz() {
  console.log("Cancle Quizz");
  document.getElementById('quizzContainer').style.display = 'none';
  document.getElementById('quizzContainer').innerHTML = "";
  quizzData = [];
  currentQuizzData = 0;
}

function handleSearchButtonClick() {

  //make quizz visible
  if (document.getElementById('quizzContainer').style.display === "none") {

    //load Data
    var firstObjId = Object.keys(gfgbQuizz.questions)[0];
    quizzData[0] = gfgbQuizz.questions[firstObjId];
    loadTemplateIntoContainer();

    document.getElementById('quizzContainer').style.display = 'block';
  } else {
    console.log("Quizz is already displaying");
  }
}

function loadQuizz(quizzJsonObject) {

  //-----------CreateContent----------------------------------//
  //Load Question Content
  var questSpan = document.createElement('span');
  questSpan.innerHTML = `<b>Frage${currentQuizzData + 1}: </b>` + quizzJsonObject.text;
  document.getElementById('questionText').appendChild(questSpan);


  for (let index = 0; index < quizzJsonObject.answers.length; index++) {


    if (index + 1 <= 2 && quizzJsonObject.answers.length > 2) { //the first 2 Answer
      switch (index + 1) {
        case 1:
          $("#contentAnswer1").html(answer1Template);
          document.getElementById('answer01Image').src = quizzJsonObject.answers[index].image;
          document.getElementById('answer01Image').alt = quizzJsonObject.answers[index].altText;
          document.getElementById('answer01Image').onclick = function () { handleQuizzImageClick(quizzJsonObject.answers[index].nextQuestion); };
          break;

        case 2:
          $("#contentAnswer2").html(answer2Template);
          document.getElementById('answerImage').src = quizzJsonObject.answers[index].image;
          document.getElementById('answerImage').alt = quizzJsonObject.answers[index].altText;
          document.getElementById('answerImage').onclick = function () { handleQuizzImageClick(quizzJsonObject.answers[index].nextQuestion); };
          break;
      }
    } else {
      var wrapper = document.createElement('div');
      wrapper.id = `contentAnswer3_6${index - 1}`;
      wrapper.classList.add("col-6", "mb-1", "p-1");
      $("#contentAnswer3_6").append(wrapper);

      $(`#contentAnswer3_6${index - 1}`).html(answer36Template);
      console.log("try to set src image 3-6")

      var cont = document.getElementById("answer3_6Image");
      cont.src = quizzJsonObject.answers[index].image;
      cont.alt = quizzJsonObject.answers[index].altText;
      cont.onclick = function () { handleQuizzImageClick(quizzJsonObject.answers[index].nextQuestion); };
      cont.id = `${cont.id}${index - 1}`;
      cont.classList.add("answerImage3_6");
    }

  }
  setArrowVisibility();
}

function loadTemplateIntoContainer() {
  $("#quizzContainer").html(baseQuizzTemplate);
  loadQuizz(quizzData[currentQuizzData]);
}

function setArrowVisibility() {
  if (quizzData.length > 1) {

    if (currentQuizzData == quizzData.length - 1) {
      //last current question
      if (!document.getElementById("quizzRightArrow").classList.contains("invisible")) {
        document.getElementById("quizzRightArrow").classList.add("invisible");
      }
    }

    if (currentQuizzData == 0) {

      //first current Quizzquestion
      if (!document.getElementById("quizzLeftArrow").classList.contains("invisible")) {
        document.getElementById("quizzLeftArrow").classList.add("invisible");
      }
      if (document.getElementById("quizzRightArrow").classList.contains("invisible")) {
        document.getElementById("quizzRightArrow").classList.remove("invisible");
      }
    }

    if (currentQuizzData > 0 && currentQuizzData < quizzData.length - 1) {
      if (document.getElementById("quizzLeftArrow").classList.contains("invisible")) {
        document.getElementById("quizzLeftArrow").classList.remove("invisible");
      }
      if (document.getElementById("quizzRightArrow").classList.contains("invisible")) {
        document.getElementById("quizzRightArrow").classList.remove("invisible");
      }
    }

  } else if (quizzData.length == 1) {
    console.log("first and solo")
    document.getElementById("quizzRightArrow").classList.add("invisible");
    document.getElementById("quizzLeftArrow").classList.add("invisible");
  }

}

function handleQuizzImageClick(nextQuestionId) {

  if (nextQuestionId === null) {
    //load Site
    console.log("Seite wird geladen");
  } else {
    //create new Temp Array and copy old Data until the current question
    var tempArray = [];
    for (var index = 0; index <= currentQuizzData; index++) {
      tempArray[index] = quizzData[index];
    }
    quizzData = tempArray;
    //add new Data
    quizzData[quizzData.length] = gfgbQuizz.questions[nextQuestionId];
    currentQuizzData = quizzData.length - 1;
    // create Content
    document.getElementById('quizzContainer').innerHTML = "";
    loadTemplateIntoContainer();
  }
}

function handleLeftArrowClick() {
  currentQuizzData = currentQuizzData - 1;
  if (currentQuizzData < 0) {
    currentQuizzData = 0;
  }
  loadTemplateIntoContainer();
}

function handleRightArrowClick() {
  currentQuizzData = currentQuizzData += 1;
  if (currentQuizzData >= quizzData.length) {
    currentQuizzData = quizzData.length - 1;
  }
  loadTemplateIntoContainer();
}






