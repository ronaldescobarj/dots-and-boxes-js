turns = [
    { color: "#354698", id: "p1", name: "Jugador 1", score: 0 },
    { color: "#C42615", id: "p2", name: "Jugador 2", score: 0 },
    { color: "#EAA81D", id: "p3", name: "Jugador 3", score: 0 },
    { color: "#86B71B", id: "p4", name: "Jugador 4", score: 0 },
    { color: "#7A3AB9", id: "p5", name: "Jugador 5", score: 0 }
];
maxTurnsLength = 2;
index = 0

function updateScore() {
    turns[index].score += 10;
    document.getElementById(turns[index].id).innerHTML = turns[index].score;
}

function markLine(id) {
    let gray = "#7f7f7f";
    let line = document.getElementById(id);
    if (line.getAttribute("stroke") == gray) {
        line.setAttribute("stroke", turns[index].color)
        line.style.opacity = 1;
        checkSquare(id);
    }
}

function nextTurn() {
    index++;
    if (index == maxTurnsLength)
        index = 0;
    document.getElementById("currentPlayer").style.color = turns[index].color;
    document.getElementById("currentPlayer").innerHTML = "Turno de: " + turns[index].name;
}

function checkSquare(id) {
    id = id.substr(1);
    coordinates = id.split("_");
    coords = {
        x1: parseInt(coordinates[0]),
        y1: parseInt(coordinates[1]),
        x2: parseInt(coordinates[2]),
        y2: parseInt(coordinates[3])
    };
    horizontal = coords.y1 == coords.y2;
    let addedSquare = false;
    if (horizontal)
        addedSquare = checkSquareHorizontal(coords)
    else
        addedSquare = checkSquareVertical(coords)
    if (!addedSquare)
        nextTurn();
}

function checkSquareHorizontal(coords) {
    let addedSquare = false
    // if the line isnt the last
    if (coords.y2 != 500) {
        if (checkDownside(coords)) {
            markId = generateMarkId(coords, 50, 50);
            var mark = document.getElementById(markId)
            mark.style.visibility = "visible";
            mark.setAttribute("stroke", turns[index].color);
            mark.setAttribute("fill", turns[index].color);
            updateScore();
            addedSquare = true;
        }
    }
    // if the line isnt the first
    if (coords.y1 != 100) {
        if (checkUpside(coords)) {
            markId = generateMarkId(coords, 50, -50);
            var mark = document.getElementById(markId)
            mark.style.visibility = "visible";
            mark.setAttribute("stroke", turns[index].color);
            mark.setAttribute("fill", turns[index].color);
            updateScore();
            addedSquare = true;
        }
    }
    return addedSquare
}

function checkSquareVertical(coords) {
    let addedSquare = false
    // if the line isnt the last
    if (coords.x2 != 500) {
        if (checkRight(coords)) {
            markId = generateMarkId(coords, 50, 50);
            var mark = document.getElementById(markId)
            mark.style.visibility = "visible";
            mark.setAttribute("stroke", turns[index].color);
            mark.setAttribute("fill", turns[index].color);
            updateScore();
            addedSquare = true;
        }
    }
    // if the line isnt the first
    if (coords.x1 != 100) {
        if (checkLeft(coords)) {
            markId = generateMarkId(coords, -50, 50);
            var mark = document.getElementById(markId)
            mark.style.visibility = "visible";
            mark.setAttribute("stroke", turns[index].color);
            mark.setAttribute("fill", turns[index].color);
            updateScore();
            addedSquare = true;
        }
    }
    return addedSquare
}

function checkDownside(coords) {
    tempCoords = JSON.parse(JSON.stringify(coords));
    tempCoords.y1 += 100;
    tempCoords.y2 += 100;
    neighbor1 = generateId(tempCoords);
    tempCoords.y1 -= 100;
    tempCoords.x2 -= 100;
    neighbor2 = generateId(tempCoords);
    tempCoords.x1 += 100;
    tempCoords.x2 += 100;
    neighbor3 = generateId(tempCoords);
    return allNeighborsAreFill(neighbor1, neighbor2, neighbor3)
}

function checkUpside(coords) {
    tempCoords = JSON.parse(JSON.stringify(coords));
    tempCoords.y1 -= 100;
    tempCoords.y2 -= 100;
    neighbor1 = generateId(tempCoords);
    tempCoords.y2 += 100;
    tempCoords.x2 -= 100;
    neighbor2 = generateId(tempCoords);
    tempCoords.x1 += 100;
    tempCoords.x2 += 100;
    neighbor3 = generateId(tempCoords);
    return allNeighborsAreFill(neighbor1, neighbor2, neighbor3)
}

function checkLeft(coords) {
    tempCoords = JSON.parse(JSON.stringify(coords));
    tempCoords.x1 -= 100;
    tempCoords.x2 -= 100;
    neighbor1 = generateId(tempCoords);
    tempCoords.x2 += 100;
    tempCoords.y2 -= 100;
    neighbor2 = generateId(tempCoords);
    tempCoords.y1 += 100;
    tempCoords.y2 += 100;
    neighbor3 = generateId(tempCoords);
    return allNeighborsAreFill(neighbor1, neighbor2, neighbor3)
}

function checkRight(coords) {
    tempCoords = JSON.parse(JSON.stringify(coords));
    tempCoords.x1 += 100;
    tempCoords.x2 += 100;
    neighbor1 = generateId(tempCoords);
    tempCoords.x1 -= 100;
    tempCoords.y2 -= 100;
    neighbor2 = generateId(tempCoords);
    tempCoords.y1 += 100;
    tempCoords.y2 += 100;
    neighbor3 = generateId(tempCoords);
    return allNeighborsAreFill(neighbor1, neighbor2, neighbor3)
}

function allNeighborsAreFill(n1, n2, n3) {
    return document.getElementById(n1).style.opacity == 1 &&
        document.getElementById(n2).style.opacity == 1 &&
        document.getElementById(n3).style.opacity == 1
}

function generateMarkId(obj, x, y) {
    mark = {};
    mark.x = obj.x1 + x;
    mark.y = obj.y1 + y;
    return "l" + mark.x + "_" + mark.y;
}

function generateId(obj) {
    return "l" + obj.x1 + "_" + obj.y1 + "_" + obj.x2 + "_" + obj.y2;
}

module.exports = {
    updateScore,
    markLine,
    nextTurn,
    checkSquare,
    checkSquareHorizontal,
    checkSquareVertical,
    checkDownside,
    checkUpside,
    checkLeft,
    checkRight,
    allNeighborsAreFill,
    generateMarkId,
    generateId
}