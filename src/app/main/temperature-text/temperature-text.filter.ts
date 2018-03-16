
const values: { from: number, to: number, text: string }[] = [
    { from: -100, to: -30, text: `nice if you're a polar bear` },
    { from: -30, to: -10, text: `freezing in here` },
    { from: -10, to: 4, text: `nippy` },
    { from: 4, to: 15, text: `cool` },
    { from: 15, to: 26, text: `a beautiful day` },
    { from: 26, to: 32, text: `toasty` },
    { from: 32, to: 38, text: `really really hot` },
    { from: 38, to: 55, text: `hell on earth` },
]

export function TemperatureTextFilterFactory() {
    return function (input: number) {
        let res = values.filter(x => input > x.from && input <= x.to)[0];
        return res ? res.text : null;
    };
}



