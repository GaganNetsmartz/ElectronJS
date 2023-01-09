// const fs = require('fs');
// const axios = require('axios');

// if (global.filepath && !file.canceled) {
// 		var formData = new FormData();
// 		formData.append('file', fs.createReadStream(global.filepath));
// 		axios.post('../FileUpload', formData, {
// 		headers: {
// 			'Content-Type': 'multipart/form-data'
// 		}
// 		});
// 	}

const ipc = require('electron').ipcRenderer;

const buttonCreated = document.getElementById('upload');

buttonCreated.addEventListener('click', function(event){
    ipc.send('open-file-dialog-for-file');
})

ipc.on('selected-file', function(event, path){
    console.log('Full Path:' + path);
})


