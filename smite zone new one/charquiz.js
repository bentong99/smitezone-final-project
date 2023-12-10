	var questionState = 0;	
	var quizActive = true;	
		
	var userStats =	[
						0,	
						0, 	
						0, 	
						0, 
						0, 	
						0 	
					];
	
	var tempStats = userStats; 
	
	var questionText =	[															
							"What role would you prefer to play?", 
							"How much damage do you want to do?", 			
							"What is your preferred playstyle?", 
							"How do you prefer to get your kills?", 				
							"What types of abilities do you prefer to use?", 			
							"When would you like to get your power spike?" 			
						];

	var answerText =	[															
							[	"Solo", 				
								"Jungle",
								"Mid",
								"Carry",
								"Support",
								"Any"],							
								
								
							[	"None", 							
								"Very Little",
								"Little",
								"Moderate", 							
								"High",
								"A ton"],
								
								
							[	"Passive", 
								"Passive-Aggressive",
								"Aggressive",
								"Poking",
								"Kiter",
								"Sustain"],
								
								
							[	"Alone", 
								"Alone with help",
								"KS",
								"Only with help",
								"Feeding",
								"No kills"],
								
								
							[	"Damage", 
								"AOE",
								"CC",
								"Debuff",
								"Projectile",
								"Dash/Movement"],		

																
							[	"Early Game", 
								"Early-Mid Game",
								"Mid Game",
								"Mid-Late Game",
								"Late Game",
								"Very Late Game"]
						]

	var answerValues =	[		
							[	[3,0,1,0,2,0], 		
								[0,0,0,1,2,3],		
								[0,3,0,2,1,0],
								[0,2,0,3,0,1],
								[2,1,3,0,0,0],
								[1,0,2,0,3,0] 
							],	
						
								
							[	[0,3,0,2,0,1], 
								[2,0,0,0,3,1],
								[0,2,0,0,1,3],
							 	[2,0,3,1,0,0],
								[1,0,0,3,2,0],
								[3,0,1,0,2,0] 
							],

								
							[	[0,1,0,0,3,2], 
								[3,0,2,0,1,0],
								[1,0,3,0,2,0],
							 	[0,3,0,1,2,0],
								[0,0,0,2,1,3],
								[0,0,0,3,1,2] 
							],
								
								
							[	[2,0,3,0,1,0], 
								[0,1,0,3,0,2],
								[0,3,2,0,0,1],
							 	[0,0,0,2,1,3],
								[2,0,0,0,3,1],
								[3,0,0,2,1,0] 
							],
								
								
							[	[3,0,0,0,2,1], 
								[0,2,3,1,0,0],
								[0,0,0,2,1,3],
							 	[1,3,0,0,0,2],
								[0,0,0,3,2,1],
								[1,0,2,0,3,0] 
							],
								
								
							[	[1,0,0,3,2,0], 
								[0,3,0,2,0,1],
								[3,1,0,0,0,2],
							 	[1,0,0,2,3,0],
								[0,0,3,2,1,0],
								[0,0,1,2,0,3] 
							]
						]
	
	var results = document.getElementById("results");
	var quiz = document.getElementById("quiz");
	var body = document.body.style;
	var printResult = document.getElementById("topScore");
	var buttonElement = document.getElementById("startbutton");
	
	buttonElement.addEventListener("click", changeState);
	
	function changeState() {								
		
		updatePersonality();									
		
		if (quizActive) {
			
			initText(questionState);
			questionState++;
			
			buttonElement.disabled = true;
			buttonElement.innerHTML = "Please select an answer";			
			buttonElement.style.opacity = 0.7;
			
		} else {
			
			setCustomPage();
		}
	}

	function initText(question) {							
		
		var answerSelection = "";
		
		for (i = 0; i < answerText[question].length; i++) {		
			
			answerSelection += "<li><input type='radio' name='question" +
			(question+1) + "' onClick='setAnswer("+i+")' id='" + answerText[question][i] + "'><label for='" + answerText[question][i] + "'>" + answerText[question][i] + "</label></li>";
		}
		
		document.getElementById("questions").innerHTML = questionText[question];
		document.getElementById("answers").innerHTML = answerSelection;				
	}
	
	function setAnswer(input) {
				
		clearTempStats();
		
		tempStats = answerValues[questionState-1][input];
				
		if (questionState < questionText.length) {
			
			buttonElement.innerHTML = "Continue";
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
					
		} else {
			
			quizActive = false;
			buttonElement.innerHTML = "Show me my character"
			buttonElement.disabled = false;
			buttonElement.style.opacity = 1;
		}
	}
	
	function clearTempStats() {
		
		tempStats = [0,0,0,0,0,0];	
	}

	function updatePersonality() {
		
		for (i = 0; i < userStats.length ; i++) {
			userStats[i] += tempStats[i];
		}
	}

	function setCustomPage() {
		
		var highestStatPosition = 0;
		for (i = 1 ; i < userStats.length; i++) {
			
			if (userStats[i] > userStats[highestStatPosition]) {
				highestStatPosition = i;
			}
		}
		
		displayCustomPage(highestStatPosition); 
		quiz.style.display = "none";		
	}
		
	function displayCustomPage(personality) {
        const myDiv = document.createElement('div');

        switch (personality) {
          case 0:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://external-preview.redd.it/QiJifFFmmRu1ulI0ltYtASCJy78owv3PHLkCRQqJyMg.jpg?auto=webp&s=949bb3685b8fc80f8f3eab5f2d6a329958c56982')";
			results.classList.add("Aphrodite");
			printResult.innerText = "Aphrodite";
            break;
          case 1:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://images6.alphacoders.com/952/thumb-1920-952008.jpg')";
			results.classList.add("Achilles");
			printResult.innerText = "Achilles";
            break;
          case 2:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://images.alphacoders.com/101/1014431.jpg')";
			results.classList.add("Bacchus");
			printResult.innerText = "Bacchus";
            break;
          case 3:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://images5.alphacoders.com/103/1031820.jpg')";
			results.classList.add("Thor");
			printResult.innerText = "Thor";
            break;
          case 4:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://i.redd.it/nvdv29trpgy21.png')";
			results.classList.add("Horus");
			printResult.innerText = "Horus";
            break;
          case 5:
            results.style.display = "inline-block";
            body.background = "none";
			body.backgroundImage = "url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/10028503/bcea8603b73fee36bfe9b6da76e9830a2ddf78e8.jpg')";
			results.classList.add("Neith");
			printResult.innerText = "Neith";
            break;
          default:
            document.getElementById("error").style.display = "inline-block";
            return;
        }

        myDiv.style.position = 'absolute';
        myDiv.style.top = '50%';
        myDiv.style.left = '50%';
        myDiv.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(myDiv);
      }
