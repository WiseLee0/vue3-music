export function shuffle(list) {
    const arr = list.slice()
    for (let i = 0; i < arr.length; i++) {
        const last = arr.length - i - 1
        const j = Math.floor(Math.random() * (last + 1));
        [arr[last], arr[j]] = [arr[j], arr[last]];
    }
    return arr
}