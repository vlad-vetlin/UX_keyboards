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

export const levenshteinDistance = (a, b) => {
    // Create empty edit distance matrix for all possible modifications of
    // substrings of a to substrings of b.
    const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    // Fill the first row of the matrix.
    // If this is first row then we're transforming empty string to a.
    // In this case the number of transformations equals to size of a substring.
    for (let i = 0; i <= a.length; i += 1) {
        distanceMatrix[0][i] = i;
    }

    // Fill the first column of the matrix.
    // If this is first column then we're transforming empty string to b.
    // In this case the number of transformations equals to size of b substring.
    for (let j = 0; j <= b.length; j += 1) {
        distanceMatrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            distanceMatrix[j][i] = Math.min(
                distanceMatrix[j][i - 1] + 1, // deletion
                distanceMatrix[j - 1][i] + 1, // insertion
                distanceMatrix[j - 1][i - 1] + indicator, // substitution
            );
        }
    }

    return distanceMatrix[b.length][a.length];
};
