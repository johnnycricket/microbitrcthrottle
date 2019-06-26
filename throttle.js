let speed = 0;
let regulator = [-1023, -767, -511, -255, 0, 255, 511, 767, 1023];
let regulatorStep = 5; //5 is off.
radio.setGroup(1);
basic.forever(function () {
    input.onButtonPressed(Button.A, function () {
        speed = throttle('down');
        radio.sendValue('down', speed);
        printSpeed(speed);
    })
    input.onButtonPressed(Button.B, function () {
        speed = throttle('up');
        radio.sendValue('up', speed);
        printSpeed(speed);
    })
    input.onButtonPressed(Button.AB, function () {
        speed = throttle('stop');
        radio.sendValue('stop', speed);
        printSpeed(speed);
    })
});

function printSpeed(n: number) {
    basic.showNumber(n);
}

function moveRegulator(b: boolean) {
    b ? regulatorStep++ : regulatorStep--;
}

function limiter(n: number) {
    if (regulatorStep > regulator.length() - 1) {
        regulatorStep = regulator.length() - 1;
        return regulator[regulatorStep];
    } else if (regulatorStep < 0) {
        regulatorStep = 0;
        return regulator[0];
    } else {
        return n;
    }
}

function throttle(dir: string) {
    switch (dir) {
        case 'up':
            moveRegulator(true);
            speed = regulator[regulatorStep];
            break;
        case 'down':
            moveRegulator(false);
            speed = regulator[regulatorStep];
            break;
        case 'stop':
            speed = regulator[4];
            regulatorStep = 4;
            break;
        default:
            speed = 0;
            break;
    }
    return speed = limiter(speed);
}

