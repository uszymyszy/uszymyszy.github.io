var midi, data;
// start talking to MIDI controller
if (navigator.requestMIDIAccess) 
{
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
}
else 
{
  console.warn("No MIDI support in your browser")
}

// on success
function onMIDISuccess(midiData)
{
  // this is all our MIDI data
  midi = midiData;
  var allInputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) 
	{
    // when a MIDI value is received call the onMIDIMessage function
    input.value.onmidimessage = gotMIDImessage;
  }
}
// on failure
function onMIDIFailure() 
{
	console.warn("Not recognising MIDI controller")
}

var dataList = document.querySelector('#midi-data ul')
var lastImg;
var yourImg;


function gotMIDImessage(messageData) 
{
	var newItem = document.createElement('li');
	// var newImg = document.createElement('img');

	newItem.appendChild(document.createTextNode(messageData.data));
	dataList.appendChild(newItem);
	// lastImg=yourImg;
	
	// yourImg.style.translate (0,0);
	// lastImg.style.height = '5%';
	// lastImg.style.width = '5%';
	// lastImg.style.zIndex=9;
	
	if (messageData.data[0]==144)
	{
		lastImg=yourImg;

		switch(messageData.data[1])
		{
			case 1: yourImg = document.getElementById('i1'); break;
			case 2: yourImg = document.getElementById('i2'); break;
			case 3: yourImg = document.getElementById('i3'); break;
			case 4: yourImg = document.getElementById('i4'); break;
			case 5: yourImg = document.getElementById('i5'); break;
			case 6: yourImg = document.getElementById('i6'); break;
			case 7: yourImg = document.getElementById('i7'); break;
			case 8: yourImg = document.getElementById('i8'); break;
			case 9: yourImg = document.getElementById('i9'); break;
			case 10: yourImg = document.getElementById('i10'); break;
			case 11: yourImg = document.getElementById('i11'); break;
			case 12: yourImg = document.getElementById('i12'); break;
			case 13: yourImg = document.getElementById('i13'); break;
			case 14: yourImg = document.getElementById('i14'); break;
			case 15: yourImg = document.getElementById('i15'); break;
			case 16: yourImg = document.getElementById('i16'); break;
			case 17: yourImg = document.getElementById('i17'); break;
			case 18: yourImg = document.getElementById('i18'); break;

			default:  break;
				// code block
		} 



	// if (messageData.data[1]==65)
	// {
	// 	yourImg = document.getElementById('i1');
	// }
	// if (messageData.data[1]==67)
	// {
	// 	yourImg = document.getElementById('i2');
	// }
	// if (messageData.data[1]==69)
	// {
	// 	yourImg = document.getElementById('i3');
	// }
	
	if(yourImg && yourImg.style)
	{
		// yourImg.style.translate (0,0);
		lastImg.style.zIndex=9;
		yourImg.style.zIndex=10;
		// yourImg.style.height = '100%';
		// yourImg.style.width = 'auto';
	
		// lastImg=yourImg;
	}
}

}
