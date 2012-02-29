function colorme() {
	// draw a qr code getting the specs from background.html
	
	var qrString = "undefined";
	var qrCaption = "undefined";
	var qrSize = "undefined";
	var cbWidth = "undefined";
	var cbHeight = "undefined";
	
	chrome.extension.sendRequest({greeting: "infoplz"}, function(response) {
		qrString = response.qrstr;
		qrCaption = response.qrcap;
		qrSize = response.qrsize;
				
		if (response.status == "qrplz") {
			qrString = "http://chart.apis.google.com/chart?cht=qr&chs=" + qrSize + "x" + qrSize + "&chl=" + qrString;
						
			cbHeight = parseInt(qrSize);
			qrSize = parseInt(qrSize) + 100;
			cbWidth = qrSize + "px";
			cbHeight = cbHeight + 50;
			cbHeight = cbHeight + "px";
			
			$.colorbox.init();
			$.colorbox({
				href:qrString, 
				title:qrCaption, 
				iframe:true, 
				innerWidth:cbWidth, 
				innerHeight:cbHeight, 
				scrolling:false,
				close:"Close (ESC)"
			});
		}
	});
}

function initQR() {
	colorme();
	chrome.extension.sendRequest({greeting: "clear"});
}

initQR(); // runs each time a page loads or the content menu is accessed
