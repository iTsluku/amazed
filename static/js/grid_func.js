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
        if (check_is_border(check)){
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
        if (check_is_border(check)){
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
        if (check_is_border(check)){
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
        if (check_is_border(check)){
            return
        }
        player.classList.remove('cell-player');
        check.classList.add('cell-player');
    }
}

function check_is_over(check){
    if (check.classList.contains("cell-end")){
        gen_maze()
        return true
    }
    return false
}

function check_is_border(check){
    if (check.classList.contains("cell-border")){
        return true
    }
    return false
}

function player_exists(){
    try{
        const player = document.querySelector("th.cell-player")
        if (player == null){
            return false
        }
        return true
    }catch (e){
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
    var k = 0//TODO rm

    clear_cells()
    const [n, m] = get_grid_size()
    init_start("0","0")
    init_end((n-1).toString(),(m-1).toString())
    init_player("0","0")
    var random_boolean = true
    while(true){
        //TODO rm
        if (k>30){
            break
        }
        //check for empty space
        //1. determine vertical or horizontal wall
        var random_boolean = Math.random() < 0.5;
        if (random_boolean){
            gen_vertical_wall(n,m)
        }else{
            gen_vertical_wall(n,m)
            //TODO replace gen_horizontal_wall()
        }
        //break//TODO rm
        k++
    }
}

function get_random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max-1);//exclude max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function gen_vertical_wall(n,m){
    //return true if done (at least 1 cell)
    //return false if attempt failed (random column -> vert wall not possible)
    var j = get_random(0,m)
    var i = 0 //get start[ |- ] + end [ -| ] + gate[ -0- ]        |---------0---| (flipped)
    //1. get start cell
    var found_start_cell = false

    while(!found_start_cell){
        if (i>=n){
            return false
        }
        var left_cond = true
        var right_cond = true
        var down_neighbor_cond = true //do not close gates
        if (j>0){
            let ql = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j-1).toString()+"']");
            if (ql == null || ql.classList.contains("cell-border")){
                left_cond = false
            }
            if (i+1<n-1){
                let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+(j-1).toString()+"']");
                if (qd == null || qd.classList.contains("cell-border")){
                    down_neighbor_cond = false
                }
            }
        }
        if (j<m-1){
            let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j+1).toString()+"']");
            if (qr == null || qr.classList.contains("cell-border")){
                right_cond = false
            }
            if (i+1<n-1){
                let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+(j+1).toString()+"']");
                if (qd==null || qd.classList.contains("cell-border")){
                    down_neighbor_cond = false
                }
            }
        }
        if (left_cond && right_cond && down_neighbor_cond){
            found_start_cell=true
        }else{
            i++;
        }
    }
    const vert_start_index = i

    //2. get end cell (lc, rd, or cell below===border)
    var vert_end_index = i
    var found_end_cell = false

    while(!found_end_cell){
        if (vert_end_index>=n-1){
            vert_end_index=n-1
            found_end_cell=true
        }
        var left_cond = false
        var right_cond = false
        var down_cond = false
        let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+j.toString()+"']");
        if (qd == null || qd.classList.contains("cell-border")){
            down_cond = true
        }
        if (j>0){
            let ql = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j-1).toString()+"']");
            if (ql == null || ql.classList.contains("cell-border")){
                left_cond = true
            }
        }
        if (j<m-1){
            let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j+1).toString()+"']");
            if (qr == null || qr.classList.contains("cell-border")){
                right_cond = true
            }
        }
        if (left_cond || right_cond || down_cond){
            found_end_cell=true
        }else{
            vert_end_index++;
        }
    }
    // given: vert_start_index, vert_end_index
    //3. get potential gate index inbetween start and end (excluding) 0123
    var gate_index = -1
    if ((vert_end_index-vert_start_index)>=2){
        gate_index=get_random(vert_start_index+1,vert_end_index-1)
    }
    //4. add border cells (walls), exclude gate
    for (let idx = vert_start_index; idx < vert_end_index; idx++) {
        if (idx!=gate_index){
            update_wall(idx,j)
        }
    }
    return true
}

function gen_horizontal_wall(n,m){
    return
}

function update_wall(_x,_y){
    let x = _x.toString()
    let y = _y.toString()
    //TODO try catch cell-default class.... q clash player -> null
    const q = document.querySelector("th.cell-default[row='"+x+"'][column='"+y+"']");
    if (q==null){
        //cell-default failed -> player, or...
        return
    }
    //q.classList.remove('cell-default')
    //q.classList.add('cell-border')
    q.className = "cell cell-border"
    //TODO await new Promise(r => setTimeout(r, 1000));
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