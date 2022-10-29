// Variables

const big_img = document.getElementById("big-image");
var index = 2;

// General functions

function select(str){
    // shorten the dom selecting
    return document.querySelector(str);
}

// Image carousel stuff (promotion thing)

function select_small_img(num) {
    index = Number(num) + 1;
    return select('.small-img .img-preview:nth-child(' + num + ')');
}

function change_big_img(new_img) {
    // add fade and change image source
    big_img.style.opacity = '0%';
    var new_src = new_img.src
    setTimeout(()=>{big_img.setAttribute("src", new_src)}, 200);
    setTimeout(()=>{big_img.style.opacity = '100%'}, 350);
}

    // automatically change image
setInterval(() => {
    if (index > 12){index = 1;}
    // if (index < 1){index = 12;}
    change_big_img(select_small_img(String(index)));
    index++;
}, 7270);


// Choose game functionality
var choose_game_btn = select('#choose-game-btn');
choose_game_btn.addEventListener("click", ()=>{
    var genre_inputs = document.getElementsByClassName("genre-input");
    console.log(genre_inputs);
    let genre_results = {};
    // add value of genre with checked inputs
    for (var x = 0; x < genre_inputs.length; x++){
        var current_item = genre_inputs.item(x);
        if (current_item.checked){
            genre_results[current_item.name] = current_item.value;
        }
    }
    genre_results_keys = Object.keys(genre_results);
    var container = select('#chosen-game-container');
    container.innerHTML = '';
    if (!genre_results_keys.length === 6){
        
        container.innerHTML = '<h2>You select choose all the options first!</h2>'
    } else {
        for (var x = 0; x < genre_results_keys.length; x++){
            var box = document.createElement('div');
            var txt = document.createElement('span');
            box.classList.add("chosen-game");
            txt.innerText = genre_results_keys[x];
            txt.innerText += " : " + genre_results[txt.innerText];
            box.appendChild(txt);
            container.appendChild(box);
        }

    }
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
});

