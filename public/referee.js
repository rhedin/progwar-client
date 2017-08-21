console.log(`Referee before aEL`);
addEventListener('message', function (e) {
    postMessage(e.data);
}, false);
console.log(`Referee after aEL`);