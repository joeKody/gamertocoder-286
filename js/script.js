// Variables

const big_img = document.getElementById("big-image");
var index = 2;

function select(str){
    return document.querySelector(str);
}

function select_small_img(num) {
    index = Number(num) + 1;
    return select('.small-img .img-preview:nth-child(' + num + ')');
}

function change_big_img(new_img) {
    big_img.style.opacity = '0%';
    var new_src = new_img.src
    setTimeout(()=>{big_img.setAttribute("src", new_src)}, 200);
    setTimeout(()=>{big_img.style.opacity = '100%'}, 350);
}

setInterval(() => {
    if (index > 12){index = 1;}
    // if (index < 1){index = 12;}
    change_big_img(select_small_img(String(index)));
    index++;
}, 7270);

var choose_game_btn = select('#choose-game-btn');
choose_game_btn.addEventListener("click", ()=>{
    var genre_inputs = document.getElementsByClassName("genre-input");
    console.log(genre_inputs);
    let genre_results = {};
    for (var x = 0; x < genre_inputs.length; x++){
        var current_item = genre_inputs.item(x);
        if (current_item.checked){
            genre_results[current_item.name] = current_item.value;
        }
    }
    console.log(genre_results);
    console.log(genre_results.keys);
});