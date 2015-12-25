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
	}
}

function updateCanvas(frequencyData, bitcount){//in:Uint8Array, int size
	//get canvas from HTML
	var canvas = document.getElementById("visual");

	if(canvas.getContext){//if successfully loaded

		//clear canvas

}



window.onload = function(){
	var ctx = new AudioContext();
	var audio = document.getElementById("tangential");
	var audioSrc = ctx.createMediaElementSource(audio);
	var analyser = ctx.createAnalyser();

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
		updateCanvas(frequencyData, analyser.frequencyBinCount);

	}

	audio.play();
	initCanvas();
	renderFrame();
};

