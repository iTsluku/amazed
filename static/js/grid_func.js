window.addEventListener("keydown", function (event) {
    c = event.key
    if (c==="ArrowDown" || c==="s" || c==="j"){
        player_move_down()
    }
    else if (c==="ArrowUp" || c==="w" || c==="k"){
        player_move_up()
    }
    else if (c==="ArrowLeft" || c==="a" || c==="h"){
        player_move_left()
    }
    else if (c==="ArrowRight" || c==="d" || c==="l"){
        player_move_right()
    }
})

function player_move_down(){
    if (!player_exists()){
        return
    }
    const [n, m] = get_grid_size()
    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    if ((x+1)<n){
        check_x = (x+1).toString()
        check_y = y.toString()
        const check = document.querySelector("th.cell[row='"+check_x+"'][column='"+check_y+"']");
        if (check_is_over(check)){
            return
        }
        player.classList.remove('cell-player');
        check.classList.add('cell-player');
    }
}

function player_move_up(){
    if (!player_exists()){
        return
    }
    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    if (x>0){
        check_x = (x-1).toString()
        check_y = y.toString()
        const check = document.querySelector("th.cell[row='"+check_x+"'][column='"+check_y+"']");
        if (check_is_over(check)){
            return
        }
        player.classList.remove('cell-player');
        check.classList.add('cell-player');
    }
}

function player_move_right(){
    if (!player_exists()){
        return
    }
    const [n, m] = get_grid_size()
    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    if ((y+1)<m){
        check_x = x.toString()
        check_y = (y+1).toString()
        const check = document.querySelector("th.cell[row='"+check_x+"'][column='"+check_y+"']");
        if (check_is_over(check)){
            return
        }
        player.classList.remove('cell-player');
        check.classList.add('cell-player');
    }
}

function player_move_left(){
    if (!player_exists()){
        return
    }
    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    if (y>0){
        check_x = x.toString()
        check_y = (y-1).toString()
        const check = document.querySelector("th.cell[row='"+check_x+"'][column='"+check_y+"']");
        if (check_is_over(check)){
            return
        }
        player.classList.remove('cell-player');
        check.classList.add('cell-player');
    }
}

function check_is_over(check){
    if (check.classList.contains("cell-end")){
        clear_cells()
        gen_maze()
        return true
    }
    return false
}

function check_is_border(check){
    //TODO
    return false
}

function player_exists(){
    try{
        const player = document.querySelector("th.cell-player")
        if (player == null){
            // Player not initialized
            return false
        }
        return true
    }catch (e){
        // Player not initialized
        return false
    }
}

function get_grid_size(){
    const cells = document.querySelectorAll('th.cell')
    var rows=-1
    var columns=-1
    for (let i = 0; i < cells.length; i++) {
        _row = parseInt(cells[i].getAttribute('row'),10)
        _column = parseInt(cells[i].getAttribute('column'),10)
        if (_row>rows){
            rows=_row
        }
        if (_column>columns){
            columns=_column
        }
    }
    return [rows+1,columns+1]
}

function clear_cells(){
    const cells = document.querySelectorAll('th.cell')
    for (let i = 0; i < cells.length; i++) {
        c = cells[i]
        c.className = "cell cell-default";
    }
}

function gen_maze(){
    const [n, m] = get_grid_size()
    init_start("0","0")
    init_end((n-1).toString(),(m-1).toString())
    init_player("0","0")
}

function update_wall(_x,_y){
    //TODO
    let x = _x.toString()
    let y = _y.toString()
    const q = document.querySelector("th.cell-default[row='"+x+"'][column='"+y+"']");
    //q.classList.remove('cell-default');
    //q.classList.add('cell-border');
    c.className = "cell cell-border";
}

function init_start(x,y){
    const q = document.querySelector("th.cell[row='"+x+"'][column='"+y+"']");
    q.className = "cell cell-start";
}

function init_end(x,y){
    const q = document.querySelector("th.cell[row='"+x+"'][column='"+y+"']");
    q.className = "cell cell-end";
}

function init_player(x,y){
    const q = document.querySelector("th.cell[row='"+x+"'][column='"+y+"']");
    q.classList.add('cell-player');
}