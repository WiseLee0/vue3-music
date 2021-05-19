export function shuffle(list) {
    const arr = list.slice()
    for (let i = 0; i < arr.length; i++) {
        const last = arr.length - i - 1
        const j = Math.floor(Math.random() * (last + 1));
        [arr[last], arr[j]] = [arr[j], arr[last]];
    }
    return arr
}

export function formatTime(interval) {
    interval = interval | 0
    const minute = ((interval / 60 | 0) + '').padStart(2, '0')
    const second = (interval % 60 + '').padStart(2, '0')
    return `${minute}:${second}`
}


export function circleCenter(x1, y1, x2, y2, x3, y3) {
    var a, b;
    a = (y2 - y1) / (x2 - x1);
    b = y1 - a * x1;

    var xMiddle = (x1 + x2) / 2;
    var yMiddle = (y1 + y2) / 2;
    var c, lastX, lastY;
    if (a != 0) {
        c = yMiddle - (-1 / a) * xMiddle;
        lastX = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) - 2 * c * y1 + 2 * c * y3) / (2 * ((x1 - x3) - (1 / a) * (y1 - y3)));
        lastY = (-1 / a) * lastX + c;
    } else {
        lastX = c = xMiddle;
        lastY = (Math.pow(x1, 2) + Math.pow(y1, 2) - Math.pow(x3, 2) - Math.pow(y3, 2) + 2 * lastX * (x3 - x1)) / (2 * (y1 - y3));
    }
    return {
        x: lastX,
        y: lastY
    }
}

export function angleToRad(angle: number): number {
    return (angle * Math.PI) / 180
}

export function calcCircleY(a, b, r, x) {
    return b - Math.sqrt(r ** 2 - (x - a) ** 2)
}