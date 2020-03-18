export const getRandomSymbol = (isCapitalised) => {
    if (isCapitalised === undefined) {
        isCapitalised = false;
    }

    let letters = 'йцукенгшщзхъфывапролджэячсмитьбюё ';

    if (isCapitalised) {
        letters = letters.toUpperCase();
    }

    const index = Math.floor(Math.random() * letters.length);

    return letters[index];
};

export const shuffle = (values) => {
    for (let i = values.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [values[i], values[j]] = [values[j], values[i]];
    }

    return values;
};

export const getRandomSymbols = (symbol, isCapitalised) => {
    const arr = [symbol];

    arr.push(getRandomSymbol(isCapitalised));
    arr.push(getRandomSymbol(isCapitalised));
    arr.push(getRandomSymbol(isCapitalised));

    return shuffle(arr);
};

export const turnCaseRecursive = (arr, upperCase = true) => {
        if (Array.isArray(arr)) {
            return arr.map((item) => {
                return turnCaseRecursive(item, upperCase);
            });
        } else {
            if (upperCase) {
                return arr.toUpperCase();
            } else {
                return arr.toLowerCase();
            }
        }
};
