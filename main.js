leftWristX= 0;
leftWristY= 0;

rightWristX = 0;    
rightWristY = 0;    

scoreRightWrist= 0;
scoreLeftWrist=0; 

song_status = "";
song1_status = "";

song="";
song1="";
function preload(){
    song= loadSound("Numb.mp3")
    song1 = loadSound("Revolution.mp3")
}

function setup(){
    canvas = createCanvas(650, 490);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('poseNet is initialized');
    }

    function draw() {
        image(video, 0, 0, 650, 490);
        
            song_status = song.isPlaying();
            song1_status = song1.isPlaying();
        
            fill("#FF0000");
            stroke("#FF0000");
        
            if(scoreRightWrist > 0.2)
            { 
                circle(rightWristX,rightWristY,20);
        
                    song1.stop();
        
                if(song_status == false)
                {
                    song.play();
                    document.getElementById("song").innerHTML = "Playing ------ Numb ----- by Linkin Park";
                }
            }
        
            if(scoreLeftWrist > 0.2)
            {
                circle(leftWristX,leftWristY,20);
        
                    song.stop();
        
                if(song1_status == false)
                {
                    song1.play();
                    document.getElementById("song").innerHTML = "Playing ----- Revolution----- by The Score";
                }
        }
    
    }

function gotPoses(results){
if(results.length> 0){
    console.log(results);
    scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

     leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
}
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}