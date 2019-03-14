var chat = $("#chat"), messageINP = $("#message"), sound = "https://freesound.org/data/previews/399/399191_5549581-lq.mp3";

// <brain>
// THIS IS A BRAIN OF BOT

console.log(topicJSON);
var topicJSON = [{ask:"Hi", ans:["Hello Jason;)", "Good night, Jason."]},
                  {ask:"What is my suggested major", ans:["It would be Psychology or Communication Arts."]},
                  {ask:"But I hate talking to people", ans:["Oh, Jason, so sorry about your struggle. So, Jason, what is your passion?"]},
                  {ask:"I am really into data and statistics", ans:["I am glad that you have found your own passion. However, according to my observation on your study habits, there are only 5.11% probability that you are interested into data-related subjects."]},
                 {ask:"No way!", ans:["I highly apologize again, but you have 98.11% probability into Psychology, 94.23% into Communication, and 80.23% into Communication Design."]},
                 {ask:"I reject!", ans:["Sorry, but I have to send the data to your mentor, Lauren. That is my obligation."]},
                 {ask:"Can I have statistics as my major?", ans:["Unfortunately, Jason, I am afraid that following my advice is the best option."]},
                  {ask:"What if I disobeyed.", ans:["Jason, don't be sad. How about talking with the customer service? They are very nice and can deel with your problem quickly!"]}
                 ];
 //</brain>

function renderAvaiable(){
   let html = "";
   for(let i=0; i<topicJSON.length; i++){
     if(i != 0){
       html += ", ";
     }
     html += topicJSON[i].ask;
   }

   $("#avaiable").text(html);
 }
 renderAvaiable();

function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 function answer(){
   console.clear();
   //Find topic in main JSON
   let lastMeMessage = chat.find(".me:last").text();

   console.log("Last Message from Me: " + lastMeMessage);

   let regTopic = new RegExp(lastMeMessage, "gmi");
   let topicSel = null;

   for(let i=0; i<topicJSON.length; i++){
     if( regTopic.test( topicJSON[i].ask ) ){
        console.log(`${topicJSON[i].ask} is the same like ${lastMeMessage}`);
        topicSel = i;
        break;
      }
      else{
        console.log(`${topicJSON[i].ask} is NOT the same like ${lastMeMessage}`);
      }
    }

    console.log("Founded matching topic ask: ");
    console.log(topicSel);

   //Find answer in selected JSON
    if(topicSel != null){
      let selectedAnswers = topicJSON[ topicSel ]['ans'];
      let finAnswer = selectedAnswers[ getRandomInt(0, selectedAnswers.length-1) ];

    sendMessage(finAnswer ,"bot");
    }
    else{
      sendMessage("I don't know what you want :/" ,"bot");
    }
  }

 function checkChat(){
   setTimeout(function(){
    answer();
   }, 1000);
 }

 function sendMessage(mes, who){
   if(who == "bot"){
     chat.append(`<div class="card bg-light border-0 shadow-sm p-0 mb-3"><div class="card-body"><p class="mb-0 ${who}">${mes}</p></div></div>`);
   }
   else{
     chat.append(`<div class="card text-white bg-primary border-0 shadow-sm p-0 mb-3"><div class="card-body"><p class="mb-0 ${who}">${mes}</p></div></div>`);
   }

   let audio = new Audio(sound).play();

   if(who == "me") checkChat();
 }

function getMessageInput(){
  messageINP.val( messageINP.val().replace(/^\s+|\s+$/g,'')  );

   if(messageINP.val() == "") return;
   sendMessage( messageINP.val(), "me" );
   messageINP.val("");
 }

 messageINP.on("keydown", function(e){
   if(e.keyCode == 13){
     getMessageInput()
   }
 });

$("#send").on("click", function(){
  getMessageInput();
 });
