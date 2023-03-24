var FullScreenMode = false;
var TextFontSize = "20px";
var StimulusFontSize = '60px';

var keyboard_path = "../../assets/images/st_instructions.png"

var ColorInstrText = [
      '<p style="font-size:'+TextFontSize+'">Welcome to the Stroop Color experiment.</p>',
      '<p style="font-size:'+TextFontSize+'">You will be identifying the color of rectangles shown on the screen. When a rectangle is shown on the screen you are to press the key that corresponds to that color, as shown in the figure. This figure will be present during the entire experiment.</p><img src="' + keyboard_path + '"></img>',
      '<p style="font-size:'+TextFontSize+'">Before doing the actual experiment you will complete some practice trials. These will give you feedback about your accuracy. <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];

var ColorInstrPoorPerformanceText = ['<p style="font-size:'+TextFontSize+'">There will be another run of practice trials with feedback.</p> <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];

var ColorTestInstrText = ['<p style="font-size:'+TextFontSize+'">You will now respond without any feedback. Try to respond as quickly and accurately as possible. </p>'];

var WordInstrText = [
   '<p style="font-size:'+TextFontSize+'">Welcome to the Stroop Word experiment.</p>',
   '<p style="font-size:'+TextFontSize+'">In this task, words will appear in the center of the screen, like   this:</p><p style="font-size:'+TextFontSize+'">BLUE</p><p style="font-size:'+TextFontSize+'">You need to indicate what word is written. </br>Press the key that corresponds to that color, as shown in the figure. This figure will be present during the entire experiment.</p><img src="' + keyboard_path + 'width="100"'+ '"></img>',
   '<p style="font-size:'+TextFontSize+'">Before doing the actual experiment you will complete some practice trials. These will give you feedback about your accuracy. <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];
   
var WordInstrPoorPerformanceText = ['<p style="font-size:'+TextFontSize+'">There will be another run of practice trials with feedback.</p> <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];

var WordTestInstrText = ['<p style="font-size:'+TextFontSize+'">Now you will do the task.</br>It will be exactly like the practice except you will not get feedback. </p>'];
    
var ColorWordInstrText = [
      '<p style="font-size:'+TextFontSize+'">Please read the instructions carefully.</p>'+'<p>Use "next" and "previous" buttons to navigate through instructions.</p>',
            `
            <ul>
            <li style="text-align:left; padding:8px; font-size: 18px">    In this task, words will appear in the center of the screen.</li>
            <li style="text-align:left; padding:8px; font-size: 18px">You need to indicate the COLOR that the word is written in (and ignore what the word says).</li>
            <li style="text-align:left; padding:8px; font-size: 18px">Press the key that corresponds to that color, as shown in the figure. This figure will be present during the entire experiment.</li>
            <p><img src='../../assets/images/st_instructions.png' width= "500" ></img></p>
            </ul>`
	,
      '<p style="font-size:'+TextFontSize+'">Before doing the actual trial you will complete some practice trials.</p>'+'<p> These will give you feedback about your accuracy. <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];

var ColorWordInstrPoorPerformanceText = ['<p style="font-size:'+TextFontSize+'">There will be another run of practice trials with feedback.</p> <p style="font-size:'+TextFontSize+'">Remember to respond as accurately and quickly as possible.</p>'];

var ColorWordTestInstrText = ['<p style="font-size:'+TextFontSize+'">Moving to the actual test.</p>'+'<p>The stimulus need not be in the centre and you will now respond without any feedback.</p>'+'<p>Try to respond as quickly and accurately as possible. </p>'];

var ColorThankYouText = 'Thank you. Press any key to end the experiment.'

var WordThankYouText = 'Thank you. Press any key to end the experiment.'

var ColorWordThankYouText = 'Thank you. Press any key to end the experiment.'

/* If the response choice get modified here they also need to be modified below
*/
var ResponseChoices = ['ArrowLeft','ArrowRight','ArrowDown','Escape']

var FeedbackLength = 400; // This is in milliseconds

//var FixationLength = 500; // This is in milliseconds

var ColorPracticeRepeats = 4
var WordPracticeRepeats = 4
var ColorWordPracticeRepeats = 1 /////////////////////// 2

// Since there are 4 possible trials, the number of trials will be 4 times the number of repeats
var ColorTestRepeats = 8
// Since there are 4 possible trials, the number of trials will be 4 times the number of repeats
var WordTestRepeats = 8
// Since there are 16 possible trials, the number of trials will be 4 times the number of repeats
var ColorWordTestRepeats = 1  /////////////////////////// 4



/* ========================================================= 
	This is a function for positioning the instruction figure and stimuli on the screen
	If the instruction keyboard mapping figure is too low change the 'height' value below.
*/

var Small_img_path = "../../assets/images/on_trial.png"


function PutIntoTable(top='top', middle='mid', width=600, height=250, img_path=Small_img_path) {
   return '<table border="0" width="'+width+'"><tr height="'+height+'"><td>'+top+'</td></tr><tr height="'+height+'">'+
          '<td><div style="font-size:60px;">'+middle+'</div></td></tr><tr height="'+height+'">'+
          '<td valign="bottom"><img src="'+ Small_img_path +'" width = "500"></td></tr></table>';
         
 }
/* ========================================================= 
	This is the stimuli list for both stroop color and word
   The green is very bright. TO make it less bright change it to something like (0,200,0)
*/

var StroopWordList = [
   {
      "Word": "Red",
      "letter": 'ArrowLeft',
      "Color": "(255,0,0)"
    },
    // {
    //   "Word": "Yellow",
    //   "letter": 'b',
    //   "Color": "(255,255,0)"
    // },
    {
      "Word": "Green",
      "letter": 'ArrowDown',
      "Color": "(0,255,0)"
    },
    {
      "Word": "Blue",
      "letter": 'ArrowRight',
      "Color": "(0,0,255)"
    }
]

/* ========================================================= 
	This is the stimuli list for stroop color/word
*/
var StroopColorWordList = [
 {
   Word: "Red",
   Congruency: "Con",
   letter: 'ArrowLeft',
   Color: "(255,0,0)"
 },
 // {
 //   Word: "Red",
 //   Congruency: "Incon",
 //   letter: 'b',
 //   Color: "(255,255,0)"
 // },
 {
   Word: "Red",
   Congruency: "Incon",
   letter: 'ArrowRight',
   Color: "(0,0,255)"
 },
 {
   Word: "Red",
   Congruency: "Incon",
   letter: 'ArrowDown',
   Color: "(0,255,0)"
 },
 // {
 //   Word: "Yellow",
 //   Congruency: "Incon",
 //   letter: 'ArrowLeft',
 //   Color: "(255,0,0)"
 // },
 // {
 //   Word: "Yellow",
 //   Congruency: "Con",
 //   letter: 'b',
 //   Color: "(255,255,0)"
 // },
 // {
 //   Word: "Yellow",
 //   Congruency: "Incon",
 //   letter: 'm',
 //   Color: "(0,0,255)"
 // },
 // {
 //   Word: "Yellow",
 //   Congruency: "Incon",
 //   letter: 'n',
 //   Color: "(0,255,0)"
 // },
 {
   Word: "Blue",
   Congruency: "Incon",
   letter: 'ArrowLeft',
   Color: "(255,0,0)"
 },
 // {
 //   Word: "Blue",
 //   Congruency: "Incon",
 //   letter: 'b',
 //   Color: "(255,255,0)"
 // },
 {
   Word: "Blue",
   Congruency: "Con",
   letter: 'ArrowRight',
   Color: "(0,0,255)"
 },
 {
   Word: "Blue",
   Congruency: "Incon",
   letter: 'ArrowDown',
   Color: "(0,255,0)"
 },
 {
   Word: "Green",
   Congruency: "Incon",
   letter: 'ArrowLeft',
   Color: "(255,0,0)"
 },
 // {
 //   Word: "Green",
 //   Congruency: "Incon",
 //   letter: 'b',
 //   Color: "(255,255,0)"
 // },
 {
   Word: "Green",
   Congruency: "Incon",
   letter: 'ArrowRight',
   Color: "(0,0,255)"
 },
 {
   Word: "Green",
   Congruency: "Con",
   letter: 'ArrowDown',
   Color: "(0,255,0)"
 }
]
