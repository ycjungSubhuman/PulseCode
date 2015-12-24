window.onload = function(){
	var ctx = new AudioContext();
	var audio = document.getElementById("tangential");
	var audioSrc = ctx.createMediaElementSource(audio);
	var analyser = ctx.createAnalyser();

	//connect to destinations
	audioSrc.connect(analyser);
	analyser.connect(ctx.destination);

	var frequencyData = new Uint8Array(analyser.frequencyBinCount);

	function renderFrame(){
		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(frequencyData);
	}

	renderFrame();
};

