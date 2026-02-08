const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const COLS = 8;
const ROWS = 8;
const SIZE = 64;
canvas.width = COLS * SIZE;
canvas.height = ROWS * SIZE;

let grid = [];
let particles = [];
let shake = 0;

const SPRITES = {};
const spriteFiles = ["red","yellow","green","blue","purple","bomb","rocket","rainbow","background"];
spriteFiles.forEach(name=>{
  const img = new Image();
  img.src = `sprites/${name}.png`;
  SPRITES[name] = img;
});

// Crear tablero
function initGrid() {
  for(let y=0;y<ROWS;y++){
    grid[y] = [];
    for(let x=0;x<COLS;x++){
      const colors = ["red","yellow","green","blue","purple"];
      grid[y][x] = {color: colors[Math.floor(Math.random()*5)], booster: null, empty: false};
    }
  }
}

// Actualizar posiciones smooth
function updateTiles(){
  for(let y=0;y<ROWS;y++){
    for(let x=0;x<COLS;x++){
      const t = grid[y][x];
      if(!t.screenX) t.screenX = x*SIZE;
      if(!t.screenY) t.screenY = y*SIZE;
      t.screenX += (x*SIZE - t.screenX)*0.2;
      t.screenY += (y*SIZE - t.screenY)*0.2;
    }
  }
}

// Dibujar tablero
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(SPRITES["background"],0,0,canvas.width,canvas.height);
  
  if(shake>0){ 
    const dx=(Math.random()-0.5)*shake, dy=(Math.random()-0.5)*shake;
    ctx.save();
    ctx.translate(dx,dy);
    shake--;
  }

  updateTiles();

  for(let y=0;y<ROWS;y++){
    for(let x=0;x<COLS;x++){
      const t=grid[y][x];
      if(t.empty) continue;
      let sprite = t.booster ? SPRITES[t.booster] : SPRITES[t.color];
      let size = t.booster ? SIZE*1.2 : SIZE-4;
      let offset = (SIZE - size)/2;
      if(t.booster){ ctx.shadowColor="gold"; ctx.shadowBlur=12; } else { ctx.shadowBlur=0; }
      ctx.drawImage(sprite, t.screenX+offset, t.screenY+offset, size, size);
    }
  }

  particles.forEach(p=>{
    ctx.fillStyle=p.color;
    ctx.fillRect(p.x,p.y,p.size,p.size);
    p.x+=p.vx; p.y+=p.vy; p.life--;
  });
  particles = particles.filter(p=>p.life>0);

  if(shake>0) ctx.restore();
  requestAnimationFrame(draw);
}

// Inicializar
initGrid();
draw();