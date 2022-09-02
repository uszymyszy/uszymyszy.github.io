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

var ra = document.getElementById('ra');


function gotMIDImessage(messageData) 
{
	var newItem = document.createElement('li');
	// var newImg = document.createElement('img');
	// var huj = 
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


			// case 30:
			// 	yourImg = document.getElementById('i1');
			// 	document.getElementById("gr").textContent="newtext";
			// 	// document.getElementById("p").innerHTML = "New text!"; 
			// 	break;
			// case 34: document.getElementById("io").textContent='off'; break;
			// case 31: document.getElementById("gr").textContent=messageData.data[1]; break;
			// case 32: yourImg = document.getElementById('i4'); break;
			// case 33: yourImg = document.getElementById('i5'); break;

			//ramka
			case 44: ra.style.left='19vh'; ra.style.top='75vh';break;
			case 45: ra.style.left='19vh'; ra.style.top='50vh';break;
			case 46: ra.style.left='19vh'; ra.style.top='25vh';break;
			case 47: ra.style.left='19vh'; ra.style.top='0vh';break;
			
			case 48: ra.style.left='0px'; ra.style.top='75vh';break;
			case 49: ra.style.left='0px'; ra.style.top='50vh';break;
			case 50: ra.style.left='0px'; ra.style.top='25vh';break;
			case 51: ra.style.left='0px'; ra.style.top='0vh';break;

			default:  break;
		}

		if(yourImg && yourImg.style)
		{
			lastImg.style.visibility = 'hidden';
			yourImg.style.visibility = 'visible';
			lastImg.style.zIndex=9;
			yourImg.style.zIndex=10;
		}

		if (messageData.data[1]<=8)
		{
			document.getElementById("gr").textContent=messageData.data[1];
		}

	}
	// else


if (messageData.data[0]==146)
{
	switch(messageData.data[1])
	{
		case 0: document.getElementById("io").textContent='off'; break;
		case 1: document.getElementById("io").textContent='on'; break;
		case 2: document.getElementById("io").textContent='black'; break;
		case 3: document.getElementById("io").textContent='stop'; break;
		default:  break;
	}
}

}
