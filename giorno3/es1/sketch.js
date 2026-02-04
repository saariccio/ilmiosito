function setup() {
    createCanvas(400, 400);
}
function draw() {
    background(200, 20)

    fill(random(255), random(255), random(255))
    point(mouseX, mouseY, 20, 20)
    textSize(20)
    textAlign(CENTER, CENTER)
    textFont("Courier New")
    text("SR", mouseX, mouseY)

    translate (width/2, height/2)
    rotate (mouseX*0.01)
    rectMode(CENTER)
    ellipse(mouseX, mouseY, 10, 10)
    
}