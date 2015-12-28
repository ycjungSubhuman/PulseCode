//an array of logvalues that are used to scale the -frequency- axis of the visualizer
//initial value is "empty", fill this in by calling 'makeLogPositionArray'
var logpos = [];

function makeLogPositionArray(normalval, buffersize){//in: normalizing value, the size of freqencyBinCount
	//init an array
	var arr = [];
	var log_max = Math.log(buffersize);//used to normalize the value

	//push log values 
	for(var i=0; i<buffersize; i++){
		arr.push(normalval* Math.log(i+1)/log_max);
	}
	//returns the array
	return arr;
}

function initCanvas(){//initiallize the canvas(for TESTING CANVAS DRAW)
	//get canvas
	var canvas = document.getElementById("visual");

	if(canvas.getContext){//if successfully loaded
		//init canvas context as "2d"
		var ctx = canvas.getContext("2d");

		//draw a red, opaque square
		ctx.fillStyle = "rgb(200, 0, 0)";
		ctx.fillRect(10, 10, 55, 50);

		//draw a blue, transparent square
		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect(30, 30, 55, 50);

		drawWaveFunction(Math.cos, 0, 0, 300, 100);	
	}
}

function updateVisualizer_BassMorph(frequencyData, bufferlength){//in:ByteFreqData, Buffer size
	//get canvas from HTML
	var canvas = document.getElementById("visual");

	if(canvas.getContext){//if successfully loaded
		//init canvas context ad "2d" and get context
		var ctx = canvas.getContext("2d");
		var midpos = logpos[0]/2;
		var parity = 1;//for +- inversion of values

		//clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = "rgb(40, 40, 40)";
		//draw curve line according to the data
		ctx.beginPath();
		//initial posotion is left; middle;
		ctx.moveTo(-30, canvas.height/2);
		for(var i=0; i<bufferlength/2-1; i++){//the highest-freq data will be ignored
			if(parity == 1){
				ctx.quadraticCurveTo(midpos, Math.pow(frequencyData[i]*3/canvas.height, 3)+75, logpos[i], canvas.height/2);
			}
			else{
				ctx.quadraticCurveTo(midpos, (-1) * Math.pow(frequencyData[i]*3/canvas.height,3)+75, logpos[i], canvas.height/2);
			}
			midpos = (logpos[i]+logpos[i+1])/2;//set next curve pos;
			parity = -parity;
		}
		//draw
		ctx.stroke();
	}

}
function drawWaveFunction(waveFunc, x, y, width, height){
	var canvas = document.getElementById("visual");

	if(canvas.getContext){
		var ctx = canvas.getContext("2d");
		ctx.translate(0.5, 0.5);//translate a little bit to fit into the actual pixel
		var vmidx = x;//vertical midposition; x
		var vmidy = y+height/2;//vortical midposition; y
		var samplechunk = 1;//sample width = 1px

		//move the pen to the midposition
		ctx.strokeStyle = "rgb(40, 40, 40)";
		ctx.beginPath();
		ctx.moveTo(vmidx, vmidy);

		for(var i=0; i<width; i+=samplechunk){
			ctx.lineTo(i, vmidy+10*waveFunc(i));
		}
		ctx.lineTo(i, vmidy);
		ctx.stroke();
	}
}

function creatWaveFromFreqencyData(freqData, size){

}


function updateVisualizer_revFourier(frequencyData, bufferlength){//in:ByteFreqData, Buffer size
	//get canvas from HTML
	var canvas = document.getElementById("visual");

	if(canvas.getContext){//if successfully loaded
		//init canvas context ad "2d" and get context
		var ctx = canvas.getContext("2d");

		/*implement here*/
	}

}


window.onload = function(){
	var ctx = new AudioContext();
	var audio = document.getElementById("tangential");
	var audioSrc = ctx.createMediaElementSource(audio);
	var analyser = ctx.createAnalyser();
	var canvas = document.getElementById("visual");

	//connect to destinations
	audioSrc.connect(analyser);
	analyser.connect(ctx.destination);

	//frequencyBinCount : number of values
	frequencyData = new Uint8Array(analyser.frequencyBinCount);

	//loop to update frequency data
	function renderFrame(){
		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(frequencyData);

		/*implement rendering here*/
		//updates canvas according to the frequencyData
		updateVisualizer_BassMorph(frequencyData, analyser.frequencyBinCount);

	}

	//initiallize a global array that is used for x-axis-scaling of the visualizer
	logpos = makeLogPositionArray(visual.width, analyser.frequencyBinCount/2);
	//init canvas(for canvas drawing TEST)
	initCanvas();

	audio.play();//play audio
	renderFrame();//render animation frame recursively
};

