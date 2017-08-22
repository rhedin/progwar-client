console.log(`Referee before aEL`);
addEventListener('message', function (e) {
    switch (e.data.cmd) {
        case 'getContract':
            postMessage({
                cmd: 'returningContract',
                contract: {
                    xdim: 3,
                    ydim: 3,
                    player1initialPositions: [
                        {
                            playerNumber: 0,
                            x: 1, 
                            y: 1, 
                            pieceNumber: 2,
                        },
                    ],
                    player2initialPositions: [
                    ]
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