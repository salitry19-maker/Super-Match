const mapContainer = document.getElementById("mapContainer");

function showMap(){
  mapContainer.innerHTML = "";
  levels.forEach(level=>{
    const div = document.createElement("div");
    div.textContent = "Nivel "+level.id;
    div.style.margin = "5px";
    div.style.cursor = "pointer";
    div.onclick = ()=>alert("Nivel "+level.id+" seleccionado");
    mapContainer.appendChild(div);
  });
}

showMap();