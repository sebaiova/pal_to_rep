window.onload = init;

let cinta_entrada;
let cinta_trabajo;
let cinta_salida;
let celdas_trabajo = Array(0);
let celdas_entrada = Array(0);
let celdas_salida = Array(0);

let current_step = 0;
let palabra;
let matched = true;
let is_over = false;
let times = [];

function next()
{
    switch(current_step)
    {
        case 0: set_celda(0, celdas_trabajo[0]); break;
        case 1: contar(palabra.length, celdas_trabajo[1]); break;
        case 2: matched = point(celdas_trabajo[0], celdas_trabajo[1]); break;
        case 3: is_over = mover_puntero(celdas_trabajo[0], celdas_trabajo[1]); break;
        case 4: completed(); break;
        case 5: escribir_salida(matched); break;
    }

    if(current_step==2 && !matched)
        current_step+=2;
    if(current_step==3 && !is_over)
        current_step = 1;

    current_step++;
}

function calc_times()
{
    times[0] = 1500;
    times[1] = (palabra.length+2)*500;
    times[2] = 3500;
    times[3] = 3500;
    times[4] = 1500;
    times[5] = 0;
}

function play()
{
    let time = times[current_step];
    if(current_step==7)
        return;
    next();

    setTimeout(function(){
        play();
    }, time);    
}

function init()
{
    cinta_trabajo = document.getElementById("cinta_trabajo");
    cinta_entrada = document.getElementById("cinta_entrada");
    cinta_salida = document.getElementById("cinta_salida");

    let button_iniciar = document.getElementById("button_iniciar");
    button_iniciar.onclick = iniciar;
    fill_cinta(celdas_trabajo, cinta_trabajo, "  ");
    fill_cinta(celdas_salida, cinta_salida, "  ");
}

function iniciar()
{
    [...cinta_entrada.children].forEach(c => c.remove());
    celdas_entrada = [];

    celdas_salida[0].innerText = "";
    celdas_salida[1].innerText = "";
    celdas_trabajo[0].innerText = "";
    celdas_trabajo[1].innerText = "";

    matched = true;
    is_over = false;
    current_step = 0;

    palabra = document.getElementById("input").value;
    fill_cinta(celdas_entrada, cinta_entrada, palabra);
    calc_times();

    setTimeout(function()
    {
        play();
    }, 500);
}

function fill_cinta(array, cinta, palabra)
{
    for (let i = 0; i < palabra.length; i++)
    {
        array.push(create_cell(cinta, palabra.charAt(i), i));
    }    
}

function create_cell(cinta, e, i)
{
    wrapper = document.createElement(null);
    cinta.append(wrapper);

    cell = document.createElement(null);
    cell.classList.add("cell");
    cell.innerText += e;

    wrapper.append(cell);

    index = document.createElement(null);
    index.innerText += i;

    wrapper.prepend(index);
    return cell;
}

function set_celda(value, cell)
{
    setTimeout(function(){
        cell.innerText = value;
        cell.classList.add("orange");
    }, 500);

    setTimeout(function(){
        cell.classList.remove("orange");
    }, 1000);
}

function contar(to, cell)
{
    setTimeout(function(){
        cell.classList.add("orange");
    }, 500);

    setTimeout(function(){
        cell.classList.remove("orange");
    }, 500*(to+1));

    for(let i=0; i<to; i++)
    {
        setTimeout(function(){
            celdas_entrada[i].classList.add("pointed");
            cell.innerText = i;
        }, 500*(i+1));

        setTimeout(function(){
                celdas_entrada[i].classList.remove("pointed");
        }, 500*(to+1));
    }

}

function point(cell1, cell2)
{
    pos1 = cell1.innerText;
    pos2 = cell2.innerText;
    letter1 = celdas_entrada[pos1].innerText;
    letter2 = celdas_entrada[pos2].innerText;
    match_color = letter1==letter2 ? "correct" : "wrong";

    setTimeout(function(){
        cell1.classList.add("orange");
    }, 500);    
    
    setTimeout(function(){
        celdas_entrada[pos1].classList.add("orange");
    }, 1000);    

    setTimeout(function(){
        cell2.classList.add("blue");
    }, 1500);    
    
    setTimeout(function(){
        celdas_entrada[pos2].classList.add("blue");
    }, 2000); 
    
    setTimeout(function(){
        celdas_entrada[pos1].classList.remove("orange");
        celdas_entrada[pos2].classList.remove("blue");
        celdas_entrada[pos1].classList.add(match_color);
        celdas_entrada[pos2].classList.add(match_color);
    }, 2500); 

    setTimeout(function(){
        celdas_entrada[pos1].classList.remove(match_color);
        celdas_entrada[pos2].classList.remove(match_color);
        cell1.classList.remove("orange");
        cell2.classList.remove("blue");
    }, 3000);  

    return letter1==letter2;
}

function mover_puntero(cell1, cell2)
{
    setTimeout(function(){
        cell1.classList.add("yellow");
    }, 500); 

    setTimeout(function(){
        cell1.innerText++;
    }, 1000); 

    setTimeout(function(){
        cell1.classList.remove("yellow");
    }, 1500); 

    setTimeout(function(){
        cell2.classList.add("yellow");
    }, 2000); 

    setTimeout(function(){
        cell2.innerText--;
    }, 2500); 

    setTimeout(function(){
        cell2.classList.remove("yellow");
    }, 3000); 

    console.log(cell1.innerText + " " + cell2.innerText);

    return (Number(cell2.innerText) - Number(cell1.innerText)) <= 2;
}

function completed()
{
    setTimeout(function()
    {
        celdas_trabajo[0].classList.add("correct");
        celdas_trabajo[1].classList.add("correct");
    }, 500); 

    setTimeout(function()
    {
        celdas_trabajo[0].classList.remove("correct");
        celdas_trabajo[1].classList.remove("correct");
    }, 1000); 
}

function escribir_salida(matched)
{
    celdas_salida[0].innerText = matched ? "Y" : "N";
    celdas_salida[1].innerText = matched ? "Y" : "O";

    celdas_salida[0].classList.add(matched ? "cyan" : "lila");
    celdas_salida[1].classList.add(matched ? "cyan" : "lila");

    setTimeout(function()
    {
        celdas_salida[0].classList.remove(matched ? "cyan" : "lila");
        celdas_salida[1].classList.remove(matched ? "cyan" : "lila");
    }, 500); 
}