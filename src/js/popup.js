
// 获取当前活动的标签页url，并绘制二维码
chrome.tabs.getSelected(null, function (tab) {
	console.log(tab.url);
	initExtendPlugin();
	generateQrcode(tab.url);
	var urlDom = document.getElementById("url");
	console.log(urlDom);
	urlDom.value = tab.url;
});

var QRCODE_SETTING = {
	size: 160,
	backColor: '#fff',
	frontColor: '#000',
}

var pluginModel = {
	operator: {
		more: false,
		setting: false,
	}
}

window.onload = function () {
	document.getElementById("btn-render").addEventListener("click", reRenderUrl);
	document.getElementById("btn-more").addEventListener("click", () => { toggleShow('more') });
	document.getElementById("btn-setting").addEventListener("click", () => { toggleShow('setting') });
	document.getElementById("size").addEventListener("input", (e) => { changeSetting(e, 'size') });
	document.getElementById("backColor").addEventListener("input", (e) => { changeSetting(e, 'backColor') });
	document.getElementById("frontColor").addEventListener("input", (e) => { changeSetting(e, 'frontColor') });
	initExtendPlugin();
}

function initExtendPlugin() {
	try {
		var configJson = localStorage.getItem("PLUGIN_URL_TO_QRCODE_SETTING")
		console.log("configJsong: ", configJson);
		QRCODE_SETTING = JSON.parse(configJson);
	} catch (err) {

	}

	mounted();
}

function mounted() {
	console.log("plugin model: ", pluginModel)
	if (pluginModel.operator.more) {
		document.getElementById("more-tool").style.display = "flex";
	} else {
		document.getElementById("more-tool").style.display = "none";
	}
	if (pluginModel.operator.setting) {
		document.getElementById("setting").style.display = "flex";
	} else {
		document.getElementById("setting").style.display = "none";
	}

	document.getElementById('backColor').value = QRCODE_SETTING.backColor;
	document.getElementById('frontColor').value = QRCODE_SETTING.frontColor;
	document.getElementById('size').value = QRCODE_SETTING.size;
}

function toggleShow(key) {
	switch (key) {
		case 'more':
			pluginModel.operator.more = !pluginModel.operator.more;
			if (pluginModel.operator.more) {
				pluginModel.operator.setting = false;
			}
			mounted();
			break;
		case 'setting':
			pluginModel.operator.setting = !pluginModel.operator.setting;
			if (pluginModel.operator.setting) {
				pluginModel.operator.more = false;
			}
			mounted();
			break;
	}
}


function generateQrcode(url) {
	var qrcode = new QRCode(document.getElementById("qr-code"), {
		width: QRCODE_SETTING.size,
		height: QRCODE_SETTING.size,
		colorLight: QRCODE_SETTING.backColor,
		colorDark: QRCODE_SETTING.frontColor,
	});
	qrcode.makeCode(url);
}

function changeSetting(evt, key) {
	var value = evt.target.value;
	console.log("change setting: ", evt, key);
	switch (key) {
		case 'size':
			if (!isNaN(value)) {
				QRCODE_SETTING.size = Number(value);
				saveSetting();
			}
			reRenderUrl();
			break;
		case 'backColor':
			QRCODE_SETTING.backColor = (value);
			saveSetting();
			reRenderUrl();
			break;
		case 'frontColor':
			QRCODE_SETTING.frontColor = (value);
			saveSetting();
			reRenderUrl();
			break;
		default:
			break;
	}
}

function saveSetting() {
	localStorage.setItem("PLUGIN_URL_TO_QRCODE_SETTING", JSON.stringify(QRCODE_SETTING));
}

function reRenderUrl() {
	document.getElementById("qr-code").innerHTML = "";
	// return;
	let url = document.getElementById("url").value;
	var qrcode = new QRCode(document.getElementById("qr-code"), {
		width: QRCODE_SETTING.size,
		height: QRCODE_SETTING.size,
		colorLight: QRCODE_SETTING.backColor,
		colorDark: QRCODE_SETTING.frontColor,
	});
	qrcode.clear();
	qrcode.makeCode(url);
}