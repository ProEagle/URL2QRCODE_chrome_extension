
// 获取当前活动的标签页url，并绘制二维码
chrome.tabs.getSelected(null, function (tab) {
	console.log(tab.url);
	generateQrcode(tab.url);
});

function generateQrcode(url) {
	var qrcode = new QRCode(document.getElementById("qr-code"), {
		width : 160,
		height : 160
	});
	qrcode.makeCode(url);	
}
