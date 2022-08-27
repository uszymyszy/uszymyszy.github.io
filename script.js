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

	if (messageData.data[1]==65)
	{
		yourImg = document.getElementById('i1');
	}
	if (messageData.data[1]==67)
	{
		yourImg = document.getElementById('i2');
	}
	if (messageData.data[1]==69)
	{
		yourImg = document.getElementById('i3');
	}
	
	if(yourImg && yourImg.style)
	{
		// yourImg.style.translate (0,0);
		lastImg.style.zIndex=9;
		yourImg.style.zIndex=10;
		yourImg.style.width = '100%';
		yourImg.style.height = 'auto';
	
		// lastImg=yourImg;
	}
}

}
