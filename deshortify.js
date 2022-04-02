function openPage(tab) {

	const url = tab.url;
	const url_re = /.*youtube\.com\/shorts\/(.+)/;
	const url_match = url_re.exec(url);

	if (url_match == null) {
		return;
	}

	const video_id = url_match[1];
	
	browser.tabs.update({
		url: "https://www.youtube.com/watch?v=" + video_id
	});
}

browser.browserAction.onClicked.addListener(openPage);