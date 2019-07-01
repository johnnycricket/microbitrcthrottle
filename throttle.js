let speed = 0;
let regulator = [-1023, -767, -511, -380, 0, 380, 511, 767, 1023];
let regulatorStep = 5; //5 is off.
radio.setGroup(1);
basic.forever(function () {
    input.onButtonPressed(Button.A, function () {
        speed = throttle('down');
        radio.sendValue('down', speed);
        printSpeed('down', speed, regulatorStep);
    })
    input.onButtonPressed(Button.B, function () {
        speed = throttle('up');
        radio.sendValue('up', speed);
        printSpeed('up', speed, regulatorStep);
    })
    input.onButtonPressed(Button.AB, function () {
        speed = throttle('stop');
        radio.sendValue('stop', speed);
        printSpeed('stop', speed, regulatorStep);
    })
});

function printSpeed(dir: string, n: number, r: number) {
    function upArrow() {
        basic.showArrow(0);
    }
    function downArrow() {
        basic.showArrow(4);
    }
    function stopDisplay() {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }

    switch (dir) {
        case 'up':
            basic.clearScreen()
            upArrow()
            break;
        case 'down':
            basic.clearScreen()
            downArrow()
            break;
        case 'stop':
            basic.clearScreen()
            stopDisplay()
            break;
        default: ;
            basic.clearScreen()
            stopDisplay()
            break;
    }
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
