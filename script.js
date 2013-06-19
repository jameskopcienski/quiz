jQuery(function($) {
  
  //Questions from http://www.w3schools.com/ tutorial quizzes.
  var questions = [
                   {question: 'What does HTML stand for?',
                      choices: ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language'],
                        correct:1},
                   {question: 'Choose the correct HTML tag for the largest heading',
                      choices: ['&lt;heading&gt;', '&lt;h6&gt;', '&lt;head&gt;', '&lt;h1&gt;'],
                        correct:3},
                   {question: 'What is the correct HTML tag for inserting a line break?',
                      choices: ['&lt;br&gt;', '&lt;lb&gt;', '&lt;break&gt;'],
                        correct:0},
                   {question: 'What is the correct HTML for creating a hyperlink?',
                      choices: ['&lt;a url="http://www.w3schools.com"&gt;W3Schools.com&lt;/a&gt;', '&lt;a name="http://www.w3schools.com"&gt;W3Schools.com&lt;/a&gt;', '&lt;a href="http://www.w3schools.com"&gt;W3Schools&lt;/a&gt;', '&lt;a&gt;http://www.w3schools.com&lt;/a&gt;'],
                        correct:2},
                   {question: 'Which of these tags are all <table> tags?',
                      choices: ['&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;', '&lt;table&gt;&lt;tr&gt;&lt;td&gt;', '&lt;thead&gt;&lt;body&gt;&lt;tr&gt;', '&lt;table&gt;&lt;tr&gt;&lt;tt&gt;'],
                        correct:1},
                   {question: 'What is the correct HTML for inserting an image?',
                      choices: ['&lt;img alt="MyImage"&gt;image.gif&lt;/img&gt;', '&lt;img src="image.gif" alt="MyImage"&gt;', '&lt;image src="image.gif" alt="MyImage"&gt;', '&lt;img href="image.gif" alt="MyImage"&gt;'],
                        correct:1},
                   {question: 'How can you make a numbered list?',
                      choices: ['&lt;ol&gt;', '&lt;ul&gt;', '&lt;dl&gt;', '&lt;list&gt;'],
                        correct:0},
                   {question: 'What is the correct HTML for making a checkbox?',
                      choices: ['&lt;checkbox&gt;', '&lt;input type="checkbox"&gt;', '&lt;check&gt;', '&lt;input type="check"&gt;'],
                        correct:1},
                   {question: 'What does CSS stand for?',
                      choices: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
                        correct:1},
                   {question: 'What is the correct HTML for referring to an external style sheet?',
                      choices: ['&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;', '&lt;style src="mystyle.css"&gt;', '&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;'],
                        correct:2},
                   {question: 'Which is the correct CSS syntax?',
                      choices: ['body {color: black;}', '{body:color=black;}', 'body:color=black;', '{body;color:black;}'],
                        correct:0},
                   {question: 'Which property is used to change the background color?',
                      choices: ['color', 'background-color', 'bgcolor'],
                        correct:1},
                   {question: 'How do you add a background color for all <h1> elements?',
                      choices: ['h1 {background-color:#FFFFFF;}', 'h1.all {background-color:#FFFFFF;}', 'all.h1 {background-color:#FFFFFF;}'],
                        correct:0},
                   {question: 'Which property is used to change the left margin of an element?',
                      choices: ['padding-left', 'margin-left', 'indent'],
                        correct:1},
                   {question: 'jQuery uses CSS selectors to select elements',
                      choices: ['True', 'False'],
                        correct:0},
                   {question: 'Which sign does jQuery use as a shortcut for jQuery?',
                      choices: ['the ? sign', 'the # sign', 'the $ sign'],
                        correct:2},
                   {question: 'With jQuery, look at the following selector: $("div"). What does it select?',
                      choices: ['All div elements', 'The first div element'],
                        correct:0},
                   {question: 'What is the correct jQuery code to set the background color of all p elements to red?',
                      choices: ['$("p").css("background-color","red");', '$("p").manipulate("background-color","red");', '$("p").layout("background-color","red");', '$("p").style("background-color","red");'],
                        correct:0},
                   {question: 'With jQuery, look at the following selector: $("div.intro"). What does it select?',
                      choices: ['All div elements with id="intro"', 'The first div element with id="intro"', 'The first div element with class="intro"', 'All div elements with class="intro"'],
                        correct:3},
                   {question: 'Which jQuery method is used to hide selected elements?',
                      choices: ['hidden()', 'visible(false)', 'hide()', 'display(none)'],
                        correct:2}
                  ];
  
  var questionNum = 0;
  var questionTotal = questions.length;
  var correctTotal = 0;

  
  $('#testQuestion').hide();
  
  $('#startQuizButton').click(function(){  //start the quiz and show the first question
    $('#message').hide();
    $('#startQuiz').hide();
    $('#testQuestion').show();
    questionDisplay();
  })
  
  $('#testQuestion').on('click', '#submit', function(){
    var answer = $('input:radio[name=guess]:checked').val();
    var correctAnswer = questions[questionNum].correct;
    if (answer == null) {                                //if no answer was selected
      $('#message').html("<p>Please select an answer.</p>");
    } else if (answer == correctAnswer) {                //if correct answer was selected
      $('#message').html("<p>Correct!</p><input id='continue' class='button' type='submit' value='Continue'>");
      correctTotal++;
    } else {                                             //wrong answer selected
      $('#message').html("<p>Wrong! The correct answer is:<br>" + questions[questionNum].choices[correctAnswer] + "</p><input id='continue' class='button' type='submit' value='Continue'>");
    }
    $('#message').show();
  })
  
  $('#message').on('click', '#continue', function(){
    if ((questionNum+1) == questionTotal) {              //quiz is finished, show stats
      $('#message').html("You have answered " + correctTotal + " questions correctly out of " + questionTotal + " total questions.<br>Click on Start Quiz above to take the quiz again.");
      $('#testQuestion').hide();
      $('#startQuiz').show();
      questionNum = 0;                                   //reset variables to start quiz again
      correctTotal = 0;
    } else {                                             //continue to next question
      $('#message').hide();
      questionNum++;
      questionDisplay();
    }
  })


  function questionDisplay() {                           //displays the current question
    $('#questionNum').text("Question " + (questionNum+1) + " of " + questionTotal);
    $('#question').text(questions[questionNum].question);
    $('#choices').empty();
    var choiceTotal = questions[questionNum].choices.length;
    for (var i=0; i<choiceTotal; i++) {                  //displays the answer choices
      $('#choices').append("<input type='radio' class='guess' name='guess' value=" + i + ">" + questions[questionNum].choices[i] + "<br>");
    }
  }

}); 
