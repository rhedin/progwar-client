var worker;

export function createWebworker() {
    worker = new Worker('referee.js');
    worker.addEventListener('message', receiveMessage, false);
    console.log('Before call getContract')
    getContract();  // Can I call another function in this file like this?    Yes.  Yay!
    console.log('after call getContract')
}

export function getContract() {
    console.log('In getContract');
    worker.postMessage('Hello, Referee!');
}

export function evalMove() {
    
}

export function destroyWebworker() {
    
}

function receiveMessage(e) {
    console.log(`Received msg from referee ${e.data}`);
}
