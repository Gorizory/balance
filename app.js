const _ = require('lodash');
const numeric = require('numeric');

function printMatrix(matrix) {
    let string = '   ';
    vertexes.forEach((vertex, i) => {
        string += vertex / 10 > 1 ? `${vertex} ` : `${vertex}  `
    });

    matrix.forEach((row, j) => {
        const vertexJ = vertexes[j];
        string += `\n${vertexJ / 10 > 1 ? vertexJ : `${vertexJ} `}`;
        row.forEach((vertexValue) => {
            string += vertexValue >= 0 ? ` ${vertexValue} ` : `${vertexValue} `;
        });
    });

    console.log(string);
}

const vertexes = [
    3, 4, 7, 8, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 29, 30
];

const matrixA = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
];

// const matrixA = [
//     [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//     [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
// ];

const matrixB = [];
matrixA.forEach((row, j) => {
    matrixB[j] = [];
    let n = 0;
    row.forEach((vertex) => {
        if (vertex === 1) {
            n += 1;
        }
        matrixB[j].push(0);
    });
    matrixB[j][j] = n;
});

const matrixL = [];
matrixA.forEach((row, j) => {
    matrixL[j] = [];
    row.forEach((vertex, i) => {
        matrixL[j][i] = matrixB[j][i] - matrixA[j][i];
    })
});

const eig = numeric.eig(matrixL);
const eigValues = eig.lambda.x;

const eigVectors = eig.E.x;

const eigMatrix = _.sortBy(eigValues.map((value, i) => ({
        value,
        vector: eigVectors[i],
    })
), (o) => o.value);

const U2 = eigMatrix[2];

const maxU2 = _.max(U2.vector);
const minU2 = _.min(U2.vector);

U2.vector = U2.vector.map((value) => {
    return (value - minU2) / (maxU2 - minU2);
});

const _U = _.mean(U2.vector);

const group1 = [];
const group2 = [];
let to1group = true;

U2.vector.forEach((value, i) => {
    if (value < _U) {
        group1.push(vertexes[i]);
    } else if (value > _U) {
        group2.push(vertexes[i]);
    } else {
        if (to1group) {
            group1.push(vertexes[i]);
        } else {
            group2.push(vertexes[i]);
        }
        to1group = !to1group;
    }
});

console.log('matrix A:');
printMatrix(matrixA);

console.log('\n\nmartix B:');
printMatrix(matrixB);

console.log('\n\nmartix L:');
printMatrix(matrixL);

console.log('\n\nvector U2:');
console.log(U2);

console.log('\n\ngroup1:');
console.log(group1);

console.log('\n\ngroup2:');
console.log(group2);