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
    var troll;
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
        container.innerHTML = '<h2>You have to choose all the options first!</h2>';
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
                    var current_genre = current_game.genre[k].toLowerCase();
                    if (current_genre.includes("simulat")){
                        current_genre = "rpg";
                    } else if (current_genre.includes("shoot") || current_genre.includes("party") || current_genre.includes("horror")){
                        current_genre = "action";
                    } else if(current_genre.includes("battle")){
                        current_genre = "pvp open-world multiplayer";
                    } else if (current_genre.includes("open")){
                        current_genre = "open-world";
                    } else if (current_game.name.toLowerCase().includes("build")){
                        current_genre = "pvp action sandbox";
                    } else if (current_genre.includes("survi")){
                        current_genre = "sandbox";
                    }

                    if (current_genre.includes(current_key)){
                        if (genre_results[current_key] == 'yes'){
                            current_game['like'] += 2;
                            if (troll == undefined){
                                troll = 'yes'
                            } else if (troll === 'yes'){
                                // bruh
                            } else {troll = 'none'}
                        } else if (genre_results[current_key] == 'no') {
                            current_game['like'] -= 1;
                            if (troll == undefined){
                                troll = 'no'
                            } else if (troll === 'no'){
                                //bruh
                            } else {troll = 'none'}
                        } else {
                            if (troll == undefined){
                                troll = 'not sure'
                            } else if (troll === 'not sure'){
                                // bruh
                            } else {troll = 'none'}
                        }
                    }
                }
            
            }

           

        }

        if (troll !== 'none'){
            var troll_header = document.createElement('h2')
            troll_header.innerText = "Well, if you like to answer " + '"' + troll + '"' + " so much then why not give our team some extra score?"
            troll_header.style.gridColumn = 'span 3';
            troll_header.style.marginBottom = '2rem';
            container.appendChild(troll_header);
        }

        var game_like_list = [];
        for (var i = 0; i < api_data.length; i++){
            game_like_list.push({});
            var current_game_like = game_like_list[i];
            if (api_data[i].name.includes("Egg")){
                current_game_like['name'] = "Egg War"
            } else {
                current_game_like['name'] = api_data[i].name;
            }
            current_game_like['like'] = api_data[i].like;
            current_game_like['index']= api_data[i].no - 1;
        }

        game_like_list.sort((a, b) =>  b.like - a.like);

        var games_amount = 4;
        
        for (var y = 0; y < games_amount; y++){
            var box = document.createElement('div');
            var fig = document.createElement('figure');
            var capt = document.createElement('figcaption');
            var title = document.createElement('h3');
            var level = document.createElement('span');
            var img = document.createElement('img');
            var anchor = document.createElement('a');

            title.innerText = game_like_list[y].name;
            title.style.marginBottom = '0.5rem';
            img.src = api_data[game_like_list[y].index].icon;
            
            if (y!== 0 && game_like_list[y].like === game_like_list[y-1].like){
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

            var current_name_like = game_like_list[y].name.toLowerCase();
            if (current_name_like.includes("bed")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/1/";
            } else if (current_name_like.includes("city")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/4/";
            }  else if (current_name_like.includes("frontline")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/95/";
            } else if (current_name_like.includes("party")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/97/";
            } else if (current_name_like.includes("bullets")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/11/";
            } else if (current_name_like.includes("rodent")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/13/";
            } else if (current_name_like.includes("jail")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/9/";
            } else if (current_name_like.includes("build")){
                anchor.href = "https://pc.blockmanmobile.com/#/game-details/g1042?onlineNumber=1991";
            } else if (current_name_like.includes("sky")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/2/";
            } else if (current_name_like.includes("egg")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/3/";
            } else if (current_name_like.includes("district")){
                anchor.href = "https://blockmango.garena.com/mini_games/article/en/47/";
            } else if (current_name_like.includes("night")){
                anchor.href = "https://pc.blockmanmobile.com/#/game-details/g2046?onlineNumber=689";
            }

            anchor.target = "_blank";
            anchor.style.color = "white";

            img.style.padding = '1rem';
            img.style.borderRadius = '2rem';
            fig.appendChild(capt);
            capt.appendChild(title);
            capt.appendChild(level);
            fig.appendChild(img);
            anchor.appendChild(fig);
            box.appendChild(anchor);
            box.classList.add('chosen-game');
            box.style.boxShadow = '0 0 20px #1f1f1f'
            container.appendChild(box);
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

