console.log(`Referee before aEL`);
addEventListener('message', function (e) {
    switch (e.data.cmd) {
        case 'getContract':
            postMessage({
                cmd: 'returningContract',
                contract: {
                    
                }
            });
        default:
            postMessage({
                cmd: 'dontRecognize',
            });
            break;
    }
}, false);
console.log(`Referee after aEL`);