navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    console.log(stream);
})