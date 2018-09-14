
// this is the background code...
var resp_headers = {};

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: '/src/inject/inject.js'
	});
});

chrome.webRequest.onResponseStarted.addListener(function(details){
  console.log(details.responseHeaders);
 resp_headers = details.responseHeaders;
 for (var i=0; i < resp_headers.length; i++){
  if (resp_headers[i].name === "X-True-Cache-Key"){
    chrome.storage.local.set({'resp_head_store': details.responseHeaders}, function() {
      console.log('X-Cache-Key-Extended-Internal-Use-Only:' + details.responseHeaders[19].value);
    });
    chrome.storage.local.set({'ghost_detected': "true"}, function() {
      console.log('ghost_detected=true');
    });
  }
 }
},
{
 urls: ["http://sandbox.akamaidevops.com/", "http://www.akamaidevops.com/", "http://localhost:5005/"]
},
["responseHeaders"]);