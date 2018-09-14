


$(document).ready(function(){



// this is the code which will be injected into a given page...
var response_head ={};
var xcacheextended = {};
var sandbox_detected = "FALSE";
var ghost_detected_in = "false";

chrome.storage.local.get('ghost_detected', function(data1){
if (data1['ghost_detected'] === "true"){
	chrome.storage.local.set({'ghost_detected': "false"}, function() {
		console.log('reseting ghost detected storage');
	  });
console.log('detected_ghost');
chrome.storage.local.get('resp_head_store', function(data) {
	response_head = data['resp_head_store'];

	for (var i=0; i < response_head.length ; i++ ){
		if (response_head[i].name === "X-Cache"){
			cachekey = response_head[i].value;
		}
		if (response_head[i].name === "X-Cache-Key-Extended-Internal-Use-Only"){
			xcacheextended = response_head[i].value;
		}
		if (response_head[i].name === "X-Check-Cacheable"){
			checkccaheable = response_head[i].value;
		}
		if (response_head[i].name === "X-Akamai-Sandbox"){

			if (response_head[i].value === "true"){
				sandbox_detected = "TRUE";
			}
		
		}
	}
	console.log('X-Cache-Key-Extended-Internal-Use-Only:' + xcacheextended);
	showToast(xcacheextended, cachekey, checkccaheable, sandbox_detected);
});

}
});

if (ghost_detected_in === "true"){

}

});

function showToast(details,details1, details2, details3){


console.log(details1);
console.log(details.length);

var textinput = "1.0.0.1";
	//var scripter = document.createElement('script');
	$.toast({
		text: ['Sandbox detected: '+details3+' ;','Request is served via Akamai Ghost', 'X-Cache-Key: ' + details1 + ';', 'X-Cache-Key-Extended-Internal-Use-Only: ' + details +' ;', 'Cacheable-Content: ' + details2 + ' ;'], // Text that is to be shown in the toast
		heading: 'AKAMAI SERVER DETECTED', // Optional heading to be shown on the toast
		icon: 'success', // Type of toast icon
		showHideTransition: 'fade', // fade, slide or plain
		allowToastClose: true, // Boolean value true or false
		hideAfter: false, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
		stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
		position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
		
		textAlign: 'left',  // Text alignment i.e. left, right or center
		loader: true,  // Whether to show loader or not. True by default
		loaderBg: '#ff9934',  // Background color of the toast loader
		textColor: 'white',
		beforeShow: function () {}, // will be triggered before the toast is shown
		afterShown: function () {}, // will be triggered after the toat has been shown
		beforeHide: function () {}, // will be triggered before the toast gets hidden
		afterHidden: function () {}  // will be triggered after the toast has been hidden
	});
}