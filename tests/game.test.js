const game = require('../code/game');

test('el id generado para la linea deberia tener el formato: lx1_y1_x2_y2', () => {
    expect(game.generateId({x1: 100, y1: 100, x2: 200, y2: 100})).toBe("l100_100_200_100");
});

test('el id generado para la marca deberia tener el formato: lx_y', () => {
    expect(game.generateMarkId({ x1: 100, y1: 100, x2: 200, y2: 100 }, 50, 50)).toBe("l150_150");
});
