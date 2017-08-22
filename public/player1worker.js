console.log(`Worker 1 before aEL`);
addEventListener('message', function (e) {
    postMessage(e.data);
}, false);
console.log(`Worker 1 after aEL`);