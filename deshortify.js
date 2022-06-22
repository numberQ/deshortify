const url_pattern = "*://*.youtube.com/shorts/*";

const url_filter = {
	urls: [url_pattern]
};
	
const url_regex = /.*youtube\.com\/shorts\/(.+)/;

function openPage(tab) {

	var url = tab.url
	var url_match = url_regex.exec(url);

	if (url_match == null) {
		return;
	}

	console.log("Deshortify: navigating to regular YouTube watch page...");

	var video_id = url_match[1];
	
	browser.tabs.update(tab.id, {
		url: "https://www.youtube.com/watch?v=" + video_id
	});

	browser.history.deleteUrl({
		url: url
	});
}

function onGot(item) {
	browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (item.pageload && changeInfo.status == "complete") {
			openPage(tab);
		}
	}, url_filter);
}

function onError(e) {
	console.log(`Error: ${e}`);
}

browser.browserAction.onClicked.addListener(function(tab) {
	openPage(tab);
});

let getting = browser.storage.sync.get("pageload");
getting.then(onGot, onError);