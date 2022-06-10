const url_pattern = "*://*.youtube.com/shorts/*";

const url_filter = {
	urls: [url_pattern]
};

function openPage(url) {
	
	const url_re = /.*youtube\.com\/shorts\/(.+)/;
	const url_match = url_re.exec(url);

	if (url_match == null) {
		return;
	}

	console.log("Deshortify: navigating to regular YouTube watch page...");

	const video_id = url_match[1];
	
	browser.tabs.update({
		url: "https://www.youtube.com/watch?v=" + video_id
	});
}

browser.browserAction.onClicked.addListener(function(tab) {
	openPage(tab.url);
});


function onGot(item) {
	browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	    if (item.pageload && changeInfo.status == "complete") {
	    	openPage(tab.url);
	    }
	}, url_filter);
}

function onError(e) {
	console.log(`Error: ${e}`);
}

let getting = browser.storage.sync.get("pageload");
getting.then(onGot, onError);