var combo = {
		wrap: document.getElementById('wrap'),
		div: document.getElementById('combo'),
		text: document.getElementById('combotext'),
	},
	link = document.getElementById('link');

combo.text.addEventListener('input', function(){
	delay(textToCombo, 500);
});

function inputs(){
	var out = a = b = '';
	if(arguments[1]){
		var g1 = arguments[1].toLowerCase(),
			chr = g1.charAt(g1.length-1);
		if(['p', 'k'].indexOf(chr) > -1) a = chr === 'p' ? 'punch' : 'kick';
		if(['qcf', 'qcb', 'hcf', 'hcb', 'hcfd', 'dp', 'dpb'].indexOf(g1)>-1) a = g1;
		else{
			switch(g1.charAt(0)){
				case 'l':
					b = ' light';
					break;
				case 'm':
					b = ' medium';
					break;
				case 'h':
					b = ' hard';
					break;
				default:
					if(['j', 'jump'].indexOf(g1) > -1) a = 'up';
					else if(['jf', 'jt'].indexOf(g1) > -1) a = 'up-fwd';
					else if(g1 === 'jb') a = 'up-back';
					else if(['cr', 'crouch'].indexOf(g1) > -1) a = 'down';
					else if(['f', 'fwd', 'forward', 't', 'twd', 'toward'].indexOf(g1) > -1) a = 'fwd';
					else if(['b', 'back', 'away'].indexOf(g1) > -1) a = 'back';
					else if(['cf', 'ct'].indexOf(g1) > -1) a = 'down-fwd';
					else if(g1 === 'cb') a = 'down-back';
					break;
			}
		}
		out += icon(a+b);
	}
	if(arguments[2]) out += out;
	if(arguments[3]){
		if(arguments[3] === 'xx') out += icon('cancel');
		else if(arguments[3] === '>') out += icon('right');
		else out += icon('plus');
	}
	toCanvas();
	return out;
}

function textToCombo(){
	var text = combo.text.value.replace(/(?:\s)?(j(?:ump|[ftb])?|cr(?:ouch)?|f(?:wd|orward)?|t(?:wd|oward)?|b(?:ack)?|away|c[ftb]|(?:[qh]c)(?:fd?|b)|dpb?|[lmh]?[pk])(?:\s)?(2x?|x2)?(?:\s)?([+>]|xx)?/gi, inputs);
	combo.div.innerHTML = text;
};

link.addEventListener('click', function(e){
	if(this.href === location.href){
		e.preventDefault();
		alert('No Image to save yet!');
	}
}, false);

function icon(i){
	return '<i class="icon-'+i+'"></i>';
};

function delay(callback, ms){
	if(this.timer) clearTimeout(this.timer);
	this.timer = setTimeout(callback, ms);
};

function toCanvas(){
	html2canvas(combo.div, {
		onrendered: function(canvas) {
			link.href = canvas.toDataURL();
			link.download = 'combo.png';
		}
	});
};