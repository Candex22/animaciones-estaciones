// Variables globales para cada estación
let springSketch, summerSketch, autumnSketch, winterSketch;
let springActive = false, summerActive = false, autumnActive = false, winterActive = false;

// Función para inicializar todas las animaciones
function initializeSeasons() {
    // Inicializar Primavera
    springSketch = new p5(function(p) {
        let flowers = [];
        let mousePressed = false;
        
        p.setup = function() {
            let canvas = p.createCanvas(300, 280);
            canvas.parent('spring-container');
            p.background(135, 206, 235); // Cielo azul claro
            
            // Crear algunas flores iniciales
            for (let i = 0; i < 3; i++) {
                flowers.push(new Flower(p, p.random(p.width), p.random(p.height * 0.7, p.height)));
            }
        };
        
        p.draw = function() {
            if (!springActive) return;
            
            // Fondo con degradado
            for (let i = 0; i <= p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(135, 206, 235), p.color(144, 238, 144), inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Dibujar y actualizar flores
            for (let flower of flowers) {
                flower.update();
                flower.display();
            }
        };
        
        p.mousePressed = function() {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                flowers.push(new Flower(p, p.mouseX, p.mouseY));
            }
        };
        
        // Clase Flower
        function Flower(p, x, y) {
            this.x = x;
            this.y = y;
            this.size = 0;
            this.maxSize = p.random(15, 30);
            this.petals = p.random(5, 8);
            this.color = p.color(p.random(200, 255), p.random(50, 150), p.random(100, 200));
            this.grown = false;
            
            this.update = function() {
                if (this.size < this.maxSize) {
                    this.size += 0.5;
                } else {
                    this.grown = true;
                }
            };
            
            this.display = function() {
                p.push();
                p.translate(this.x, this.y);
                
                // Tallo
                p.stroke(34, 139, 34);
                p.strokeWeight(3);
                p.line(0, 0, 0, 20);
                
                // Pétalos
                p.fill(this.color);
                p.noStroke();
                for (let i = 0; i < this.petals; i++) {
                    p.push();
                    p.rotate(p.TWO_PI / this.petals * i);
                    p.ellipse(0, -this.size / 2, this.size / 2, this.size);
                    p.pop();
                }
                
                // Centro
                p.fill(255, 255, 0);
                p.ellipse(0, 0, this.size / 3);
                
                p.pop();
            };
        }
    });
    
    // Inicializar Verano
    summerSketch = new p5(function(p) {
        let heatWaves = [];
        let sun = { x: 250, y: 50, size: 60 };
        
        p.setup = function() {
            let canvas = p.createCanvas(300, 280);
            canvas.parent('summer-container');
        };
        
        p.draw = function() {
            if (!summerActive) return;
            
            // Fondo de verano
            for (let i = 0; i <= p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(255, 223, 0), p.color(255, 140, 0), inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Sol
            p.fill(255, 255, 0);
            p.noStroke();
            p.ellipse(sun.x, sun.y, sun.size);
            
            // Rayos del sol
            p.stroke(255, 255, 0);
            p.strokeWeight(3);
            for (let i = 0; i < 8; i++) {
                let angle = p.TWO_PI / 8 * i;
                let x1 = sun.x + p.cos(angle) * (sun.size / 2 + 10);
                let y1 = sun.y + p.sin(angle) * (sun.size / 2 + 10);
                let x2 = sun.x + p.cos(angle) * (sun.size / 2 + 25);
                let y2 = sun.y + p.sin(angle) * (sun.size / 2 + 25);
                p.line(x1, y1, x2, y2);
            }
            
            // Ondas de calor
            p.noFill();
            p.stroke(255, 100, 0, 100);
            p.strokeWeight(2);
            for (let wave of heatWaves) {
                wave.update();
                wave.display();
            }
            
            // Limpiar ondas antiguas
            heatWaves = heatWaves.filter(wave => wave.life > 0);
        };
        
        p.mouseMoved = function() {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                heatWaves.push(new HeatWave(p, p.mouseX, p.mouseY));
            }
        };
        
        function HeatWave(p, x, y) {
            this.x = x;
            this.y = y;
            this.size = 0;
            this.life = 60;
            
            this.update = function() {
                this.size += 2;
                this.life--;
            };
            
            this.display = function() {
                p.push();
                p.translate(this.x, this.y);
                for (let i = 0; i < 3; i++) {
                    let offset = p.sin(p.frameCount * 0.1 + i) * 5;
                    p.ellipse(offset, 0, this.size + i * 10);
                }
                p.pop();
            };
        }
    });
    
    // Inicializar Otoño
    autumnSketch = new p5(function(p) {
        let leaves = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(300, 280);
            canvas.parent('autumn-container');
            
            // Crear algunas hojas iniciales
            for (let i = 0; i < 5; i++) {
                leaves.push(new Leaf(p, p.random(p.width), p.random(-50, 0)));
            }
        };
        
        p.draw = function() {
            if (!autumnActive) return;
            
            // Fondo otoñal
            for (let i = 0; i <= p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(255, 165, 0), p.color(139, 69, 19), inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Dibujar árbol
            p.stroke(101, 67, 33);
            p.strokeWeight(8);
            p.line(p.width / 2, p.height, p.width / 2, p.height * 0.3);
            
            // Ramas
            p.strokeWeight(4);
            p.line(p.width / 2, p.height * 0.4, p.width / 2 - 40, p.height * 0.2);
            p.line(p.width / 2, p.height * 0.4, p.width / 2 + 40, p.height * 0.2);
            
            // Actualizar y dibujar hojas
            for (let leaf of leaves) {
                leaf.update();
                leaf.display();
            }
            
            // Remover hojas que salieron de la pantalla
            leaves = leaves.filter(leaf => leaf.y < p.height + 50);
        };
        
        p.keyPressed = function() {
            // Crear nuevas hojas cuando se presiona una tecla
            for (let i = 0; i < 5; i++) {
                leaves.push(new Leaf(p, p.random(p.width), p.random(-50, 0)));
            }
        };
        
        function Leaf(p, x, y) {
            this.x = x;
            this.y = y;
            this.vx = p.random(-1, 1);
            this.vy = p.random(1, 3);
            this.size = p.random(8, 15);
            this.rotation = p.random(p.TWO_PI);
            this.rotationSpeed = p.random(-0.1, 0.1);
            this.color = p.color(p.random(150, 255), p.random(50, 150), 0);
            
            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                
                // Movimiento ondulante
                this.vx += p.sin(this.y * 0.01) * 0.1;
            };
            
            this.display = function() {
                p.push();
                p.translate(this.x, this.y);
                p.rotate(this.rotation);
                p.fill(this.color);
                p.noStroke();
                p.ellipse(0, 0, this.size, this.size * 0.7);
                p.pop();
            };
        }
    });
    
    // Inicializar Invierno
    winterSketch = new p5(function(p) {
        let snowflakes = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(300, 280);
            canvas.parent('winter-container');
            
            // Crear algunos copos iniciales
            for (let i = 0; i < 10; i++) {
                snowflakes.push(new Snowflake(p, p.random(p.width), p.random(-50, 0)));
            }
        };
        
        p.draw = function() {
            if (!winterActive) return;
            
            // Fondo invernal
            for (let i = 0; i <= p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(200, 230, 255), p.color(240, 248, 255), inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Dibujar montañas
            p.fill(180, 180, 180);
            p.noStroke();
            p.triangle(0, p.height, 100, p.height * 0.4, 200, p.height);
            p.triangle(100, p.height, 200, p.height * 0.3, 300, p.height);
            
            // Actualizar y dibujar copos de nieve
            for (let flake of snowflakes) {
                flake.update();
                flake.display();
            }
            
            // Remover copos que salieron de la pantalla
            snowflakes = snowflakes.filter(flake => flake.y < p.height + 50);
        };
        
        p.mouseDragged = function() {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                snowflakes.push(new Snowflake(p, p.mouseX, p.mouseY));
            }
        };
        
        function Snowflake(p, x, y) {
            this.x = x;
            this.y = y;
            this.vx = p.random(-0.5, 0.5);
            this.vy = p.random(0.5, 2);
            this.size = p.random(3, 8);
            this.rotation = 0;
            this.rotationSpeed = p.random(-0.05, 0.05);
            
            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                
                // Movimiento ondulante
                this.vx += p.sin(this.y * 0.01) * 0.1;
                
                // Gravedad suave
                this.vy += 0.01;
            };
            
            this.display = function() {
                p.push();
                p.translate(this.x, this.y);
                p.rotate(this.rotation);
                p.fill(255);
                p.noStroke();
                
                // Dibujar copo de nieve
                for (let i = 0; i < 6; i++) {
                    p.push();
                    p.rotate(p.TWO_PI / 6 * i);
                    p.line(0, 0, 0, -this.size);
                    p.line(0, -this.size * 0.6, -this.size * 0.3, -this.size * 0.8);
                    p.line(0, -this.size * 0.6, this.size * 0.3, -this.size * 0.8);
                    p.pop();
                }
                
                p.pop();
            };
        }
    });
}

// Event listeners para los botones
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las animaciones
    initializeSeasons();
    
    // Botones individuales de Primavera
    document.getElementById('spring-start').addEventListener('click', function() {
        springActive = true;
    });
    
    document.getElementById('spring-pause').addEventListener('click', function() {
        springActive = false;
    });
    
    // Botones individuales de Verano
    document.getElementById('summer-start').addEventListener('click', function() {
        summerActive = true;
    });
    
    document.getElementById('summer-pause').addEventListener('click', function() {
        summerActive = false;
    });
    
    // Botones individuales de Otoño
    document.getElementById('autumn-start').addEventListener('click', function() {
        autumnActive = true;
    });
    
    document.getElementById('autumn-pause').addEventListener('click', function() {
        autumnActive = false;
    });
    
    // Botones individuales de Invierno
    document.getElementById('winter-start').addEventListener('click', function() {
        winterActive = true;
    });
    
    document.getElementById('winter-pause').addEventListener('click', function() {
        winterActive = false;
    });
    
    // Botones maestros
    document.getElementById('start-all').addEventListener('click', function() {
        springActive = true;
        summerActive = true;
        autumnActive = true;
        winterActive = true;
    });
    
    document.getElementById('pause-all').addEventListener('click', function() {
        springActive = false;
        summerActive = false;
        autumnActive = false;
        winterActive = false;
    });
    
    // Event listener global para las teclas (para otoño)
    document.addEventListener('keydown', function(event) {
        if (autumnActive && autumnSketch) {
            autumnSketch.keyPressed();
        }
    });
});

// Función para redimensionar canvas cuando cambia el tamaño de ventana
window.addEventListener('resize', function() {
    // Las animaciones se ajustarán automáticamente con p5.js
});

// Funciones adicionales para efectos especiales
function addSparkle(x, y, sketch) {
    // Efecto de brillo para interacciones especiales
    sketch.push();
    sketch.fill(255, 255, 0, 150);
    sketch.noStroke();
    for (let i = 0; i < 5; i++) {
        let angle = sketch.TWO_PI / 5 * i;
        let sparkleX = x + sketch.cos(angle) * 10;
        let sparkleY = y + sketch.sin(angle) * 10;
        sketch.ellipse(sparkleX, sparkleY, 3, 3);
    }
    sketch.pop();
}

// Mensaje de bienvenida
console.log("🌈 Mashup Interactivo - Estaciones del Año cargado correctamente!");
console.log("🌸 Primavera: Haz clic para crear flores");
console.log("☀️ Verano: Mueve el mouse para ondas de calor");
console.log("🍂 Otoño: Presiona teclas para hojas que caen");
console.log("❄️ Invierno: Arrastra el mouse para copos de nieve");