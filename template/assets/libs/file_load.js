function download(data, filename, contentType) {
		
	var blob = getBlob(data, contentType);
	
	filename = filename || 'download.bin';
	
	var success = trySaveBlob(blob, contentType);

	if (!success) {
		// Get the blob url creator
		var urlCreator = getUrl();
		if (urlCreator) {
			success = tryWithLink(urlCreator, blob, filename);
			
			if (!success) {
				success = tryWithLinkIphone(blob, filename);
				
				if (!success) {
					success = tryInWindow(urlCreator, blob);
				}
			}
		}
	}

	return success;
}

function getBlob(arraybuffer, contentType) {
		
	var octetStreamMime = 'application/octet-stream';

	contentType = contentType || octetStreamMime;

	window.Blob = window.Blob;
	
	window.BlobBuilder = getBlobBuilder();
							
	window.URL = getUrl();
		
	//var uInt8Array = new window.Uint8Array(arraybuffer);
		
	var blob;
	if (window.Blob) {
		blob = new window.Blob([arraybuffer], {
			type: contentType
		});
	} else {
		var bb = new window.blobBuilder();
		bb.append(arraybuffer);
		blob = bb.getBlob(contentType);
	}
	
	return blob;
}
	
function getUrl() {
	return window.URL || window.webkitURL || window.mozURL || window.msURL;
}

function getBlobBuilder() {
	return window.BlobBuilder || window.MSBlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
}	

function getSaveBlob() {
	return navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
}	

function trySaveBlob(blob, filename) {
	try {
		// Try using msSaveBlob if supported
		//console.log('Trying saveBlob method ...');

		var navigator = window.navigator;
		if (navigator.msSaveBlob) {
			navigator.msSaveBlob(blob, filename);
		} else {
			// Try using other saveBlob implementations, if available
			var saveBlob = getSaveBlob();
			if (saveBlob === undefined) {
				throw 'Not supported';
			}
			saveBlob(blob, filename);
		}
		//console.log('saveBlob succeeded');
		return true;
	} catch (ex) {
		//console.log('saveBlob method failed with the following exception:');
		console.log(ex);
		return false;
	}
}

function tryWithLink(urlCreator, blob, filename) {
	// Try to use a download link
	var link = window.document.createElement('a');
	if ('download' in link) {
		// Try to simulate a click
		try {
			// Prepare a blob URL
			//console.log('Trying download link method with simulated click ...');
			link.setAttribute('href', urlCreator.createObjectURL(blob));

			// Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
			link.setAttribute('download', filename);

			// Simulate clicking the download link
			var event = window.document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, true, window,
				1, 0, 0, 0, 0,
				false, false, false, false,
				0, null);
			link.dispatchEvent(event);
			//console.log('Download link method with simulated click succeeded');
			return true;
		} catch (ex) {
			//console.log('Download link method with simulated click failed with the following exception:');
			console.log(ex);
			return false;
		}
	}
}

function tryWithLinkIphone(blob, filename){
	try {
		var reader = new FileReader();
		var url = getUrl();
		reader.onload = function (event) {
			var save = window.document.createElement('a');
			save.href = event.target['result'];
			save.target = '_blank';
			save.download = filename || 'archivo.dat';
			var clicEvent = new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true
			});
			save.dispatchEvent(clicEvent);
			url.revokeObjectURL(save.href);
		};
		reader.readAsDataURL(blob);
		// var bdata = btoa(data);
		// var datauri = 'data:application/xls;base64,' + bdata;
		// window.location.href = datauri;
		return true;
	} catch (ex) {
		//console.log('Download link method with simulated click failed with the following exception:');
		console.log(ex);
		return false;
	}
}

function tryInWindow(urlCreator, blob) {
	// Fallback to window.location method
	try {
		// Prepare a blob URL
		// Use application/octet-stream when using window.location to force download
		//console.log('Trying download link method with window.location ...');
		window.location.href = urlCreator.createObjectURL(blob);
		//console.log('Download link method with window.location succeeded');
		
		return true;
	} catch (ex) {
		//console.log('Download link method with window.location failed with the following exception:');
		console.log(ex);
		return false;
	}
}

function base64ToArrayBuffer(base64) {
	var binary_string =  window.atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array( len );
	for (var i = 0; i < len; i++)        {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	if (bytes == 0) {
		return {
			valor: 0, 
			tipo: 'Byte'
		};
	};

	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());

	return {
		valor: Math.round((bytes / Math.pow(1024, i)) * 100/*, 2*/) / 100, 
		tipo: sizes[i]
	};
}	

function getObjectUrlOfBase64(base64) {
	return getUrl().createObjectURL(getBlob(base64ToArrayBuffer(base64) , 'application/pdf'));
}

function downloadByBase64(base64, filename) {
	return download(base64ToArrayBuffer(base64), filename);
}