// Variabili per la simulazione della molla
let anchorX, anchorY; // Punto fisso (ancora)
let bobX, bobY;       // Posizione del peso (bob)
let velX = 10, velY = 10; // Velocità
let restLength = 100; // Lunghezza a riposo della molla
let k = 1;         // Costante elastica (rigidità)
let damping = 0.95;   // Smorzamento (attrito)
let mass = 24;        // Massa del peso
let dragging = false; // Stato trascinamento

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Posizioniamo l'ancora in alto al centro
    anchorX = width / 2;
    anchorY = 50;
    // Posizione iniziale del peso
    bobX = width / 2;
    bobY = 400;
}

function draw() {
    background(0);

    // --- CALCOLI FISICI ---
    if (dragging) {
        // Se stiamo trascinando, il peso segue il mouse
        bobX = mouseX;
        bobY = mouseY;
        velX = 0;
        velY = 0;
    } else {
        // Calcoliamo il vettore dalla molla al peso
        let dx = bobX - anchorX;
        let dy = bobY - anchorY;
        let distance = sqrt(dx * dx + dy * dy);
        
        // Forza elastica (Legge di Hooke): F = -k * estensione
        let stretch = distance - restLength;
        let force = -k * stretch;
        
        // Componenti della forza elastica
        let forceX = (dx / distance) * force;
        let forceY = (dy / distance) * force;
        
        // Aggiungiamo la gravità
        let gravity = 0.8;
        forceY += gravity * mass;
        
        // Accelerazione: F = ma => a = F/m
        let accelX = forceX / mass;
        let accelY = forceY / mass;
        
        // Aggiorniamo velocità e posizione
        velX += accelX;
        velY += accelY;
        
        // Applichiamo lo smorzamento (attrito)
        velX *= damping;
        velY *= damping;
        
        bobX += velX;
        bobY += velY;
    }

    // --- DISEGNO ---
    
    // Disegna l'ancora (punto fisso)
    fill(150);
    noStroke();
    rectMode(CENTER);
    rect(anchorX, anchorY, 50, 20);

    // Disegna la molla (effetto zig-zag)
    stroke(255);
    strokeWeight(1);
    noFill();
    
    let segments = 24; // Numero di segmenti della molla
    let dx = bobX - anchorX;
    let dy = bobY - anchorY;
    let angle = atan2(dy, dx);
    let distVal = dist(anchorX, anchorY, bobX, bobY);

    push();
    translate(anchorX, anchorY);
    rotate(angle);
    
    beginShape();
    vertex(0, 0);
    for (let i = 1; i < segments; i++) {
        let x = (distVal / segments) * i;
        let y = (i % 2 === 0) ? -15 : 15; // Alterna su e giù per zig-zag
        vertex(x, y);
    }
    vertex(distVal, 0);
    endShape();
    pop();

    // Disegna il peso (bob)
    stroke(0);
    strokeWeight(2);
    fill(255, 80, 80);
    circle(bobX, bobY, mass * 2);
}

// Gestione eventi mouse
function mousePressed() {
    // Controlla se il click è sopra il peso
    if (dist(mouseX, mouseY, bobX, bobY) < mass * 2) {
        dragging = true;
    }
}

function mouseReleased() {
    dragging = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    anchorX = width / 2;
}
