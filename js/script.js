// Variables

// get the data from api
var api_data;
fetch("https://gamertocoder.garena.co.th/api/minigames")
.then((response) => {if (response.status === 200){return response.json()} return response.status})
    .then((data) => {
        api_data = data;
    })
    .catch((data) => console.log(data))
.catch((response) => {console.log(response)});


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
    if (genre_results_keys.length !== 6){
        container.innerHTML = '<h2>You select choose all the options first!</h2>';
        container.style.display = 'block';
    } else {

        for (var j = 0; j < api_data.length; j++)
        {   
            var current_game = api_data[j];
            current_game['like'] = 0;

            for (var x = 0; x < genre_results_keys.length; x++)
            {   
                var current_key = genre_results_keys[x];
                for (var k = 0; k < current_game.genre.length; k++)
                {
                    if (current_game.genre[k].toLowerCase().includes(current_key)){
                        if (genre_results[current_key] == 'yes'){
                            current_game['like'] += 2;
                        } else if (genre_results[current_key] == 'no') {
                            current_game['like'] -= 1;
                        }
                    }
                }
            
            }

           

        }

        var game_like_list = [];
        for (var i = 0; i < api_data.length; i++){
            game_like_list.push({});
            game_like_list[i]['name'] = api_data[i].name;
            game_like_list[i]['like'] = api_data[i].like;
            game_like_list[i]['index']= api_data[i].no - 1;
        }

        game_like_list.sort((a, b) =>  b.like - a.like);
        console.log(game_like_list);

        var games_amount = 4;
        
        for (var y = 0; y < games_amount; y++){
            var box = document.createElement('div');
            var fig = document.createElement('figure');
            var capt = document.createElement('figcaption');
            var title = document.createElement('h3');
            var level = document.createElement('span');
            var img = document.createElement('img');

            title.innerText = game_like_list[y].name;
            title.style.marginBottom = '0.5rem';
            img.src = api_data[game_like_list[y].index].icon;
            
            if (game_like_list[y].like === game_like_list[y+1].like){
                box.style.display = 'inline-block';
            }
            if (y!== 0 && game_like_list[y].like === game_like_list[y-1].like){
                box.style.display = 'inline-block';
                if (games_amount < 6){
                    games_amount++;
                } 
            }

            if (y < 4){
                level.innerText = 'The most compatible game for you!';
            } else if (game_like_list[y].like > 1) {
                level.innerText = 'A game you also will like! You might love it!';
            } else {
                level.innerText = 'You should give this game a try too!';
            }

            img.style.padding = '1rem';
            img.style.borderRadius = '2rem';
            fig.appendChild(capt);
            capt.appendChild(title);
            capt.appendChild(level);
            fig.appendChild(img);
            box.appendChild(fig);
            box.classList.add('chosen-game');
            box.style.boxShadow = '0 0 20px #1f1f1f'
            container.appendChild(box);
            // box.children.length
        }
    
    for (var i = 0; i < container.children.length; i++){
        container.children.item(i).style.opacity = '0%';
    }
    
    container.style.display = 'grid';
    container.style.placeItems = 'center';
    container.style.gridTemplateColumns = 'repeat(3, minmax(200px, 1fr))';
    
    setTimeout(() => {
    for (var i = 0; i < container.children.length; i++){
        container.children.item(i).style.opacity = '100%';
    }
    }, 10)
    
}
    
});

