const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

function clear_search_cells(){
    const cells = document.querySelectorAll('th.cell')
    for (let i = 0; i < cells.length; i++) {
        c = cells[i]
        if (c.classList.contains("cell-search")){
            c.className = "cell cell-default";
        }
    }
}

async function algorithm_greedy(ms=null){
    if(!player_exists()){
        return false
    }
    if (ms==null){
        ms = 1000 //TODO cfg
    }

    const [n, m] = get_grid_size()
    //stack
    var active_cells = []

    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    active_cells.push([x,y])

    while(active_cells.length>0){
        await sleep(ms/100);
        const [i, j] = active_cells.pop()//!!!
       //right
       if (j+1<m){
           let q = document.querySelector("th.cell[row='"+(i).toString()+"'][column='"+(j+1).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i,j+1])
           }
       }
       //down
       if (i+1<n){
           let q = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+(j).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i+1,j])
           }
       }
       //left
       if (j-1>=0){
           let q = document.querySelector("th.cell[row='"+(i).toString()+"'][column='"+(j-1).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i,j-1])
           }
       }
       //up
       if (i-1>=0){
           let q = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+(j).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i-1,j])
           }
       }
    }
    return false
}

async function algorithm_swarm(ms=null){
    if(!player_exists()){
        return false
    }
    if (ms==null){
        ms = 1000 //TODO cfg
    }

    const [n, m] = get_grid_size()
    //queue
    var active_cells = []

    const player = document.querySelector("th.cell-player")
    x = parseInt(player.getAttribute('row'),10)
    y = parseInt(player.getAttribute('column'),10)
    active_cells.push([x,y])

    while(active_cells.length>0){
        await sleep(ms/100);
        const [i, j] = active_cells.shift()//!!!
        //right
       if (j+1<m){
           let q = document.querySelector("th.cell[row='"+(i).toString()+"'][column='"+(j+1).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i,j+1])
           }
       }
       //down
       if (i+1<n){
           let q = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+(j).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i+1,j])
           }
       }
       //left
       if (j-1>=0){
           let q = document.querySelector("th.cell[row='"+(i).toString()+"'][column='"+(j-1).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i,j-1])
           }
       }
       //up
       if (i-1>=0){
           let q = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+(j).toString()+"']");
           if (q!=null && q.classList.contains("cell-end")){
               return true
           }else if (q != null && q.classList.contains("cell-default")){
               q.classList.remove('cell-default');
               q.classList.add('cell-search');
               active_cells.push([i-1,j])
           }
       }
    }
    return false
}

async function gen_maze(){
    const ms = 1000 //TODO cfg

    //TODO wait for ongoing async updates to the board
    await sleep(ms+100);

    clear_cells()
    const [n, m] = get_grid_size()

    var k = 0
    var k_threshold = Math.floor(n/2)*Math.floor(m/2)

    init_start("0","0")
    init_end((n-1).toString(),(m-1).toString())
    init_player("0","0")
    var wall_swap = true
    var gen_success = false

    //init structure
    gen_success = gen_vertical_wall(n,m,ms,val=Math.floor(m/3))
    await sleep(ms);
    gen_success = gen_horizontal_wall(n,m,ms,val=Math.floor(n/3))
    await sleep(ms);
    gen_success = gen_horizontal_wall(n,m,ms,val=Math.floor(n/3))
    await sleep(ms);
    gen_success = gen_vertical_wall(n,m,ms,val=Math.floor(2*m/3))
    await sleep(ms);
    gen_success = gen_horizontal_wall(n,m,ms,val=Math.floor(2*n/3))
    await sleep(ms);

    while(true){
        if (k>k_threshold){
            break
        }
        //check for empty space
        //1. determine vertical or horizontal wall
        if (wall_swap){
            gen_success = gen_vertical_wall(n,m,ms)
            if (gen_success){
                wall_swap=false
            }
        }else{
            gen_success = gen_horizontal_wall(n,m,ms)
            if (gen_success){
                wall_swap=true
            }
        }
        k++
        await sleep(ms);
    }
}

function close_gate_before_border_vertical(i,j,n,m){
    while(i<n){
        left_border = false
        right_border = false
        idx_wall_border = false

        if (j-1>0){
            let ql = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j-1).toString()+"']");
            if (ql == null || ql.classList.contains("cell-border")){
                left_border=true
            }
        }
        if (j+1<m){
            let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j+1).toString()+"']");
            if (qr == null || qr.classList.contains("cell-border")){
                right_border=true
            }
        }
        let q = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+j.toString()+"']");
        if (q == null || q.classList.contains("cell-border")){
            idx_wall_border=true
        }
        if (idx_wall_border){
            return false
        }
        if (!idx_wall_border && right_border && left_border){
            return true
        }
        i++
    }
    return false
}

function close_gate_before_border_horizontal(i,j,n,m){
    while(j<m){
        up_border = false
        down_border = false
        idx_wall_border = false

        if (i-1>0){
            let qu = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+j.toString()+"']");
            if (qu == null || qu.classList.contains("cell-border")){
                up_border=true
            }
        }
        if (i+1>n){
            let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+j.toString()+"']");
            if (qd == null || qd.classList.contains("cell-border")){
                down_border=true
            }
        }
        let q = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+j.toString()+"']");
        if (q == null || q.classList.contains("cell-border")){
            idx_wall_border=true
        }
        if (idx_wall_border){
            return false
        }
        if (!idx_wall_border && up_border && down_border){
            return true
        }
        j++
    }
    return false
}

function get_random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max-1);//exclude max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function gen_horizontal_wall(n,m,ms,val=null){
    //return true if done (at least 1 cell)
    //return false if attempt failed (random row -> horizontal wall not possible)
    var i = get_random(0,n)
    if (val!=null){
        i=val
    }
    var j = 0
    //1. get start cell
    var found_start_cell = false

    while(!found_start_cell){
        if (j>=m){
            return false
        }
        if (j+1<m){
            let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j+1).toString()+"']");
            if (qr == null || qr.classList.contains("cell-border")){
                j++
                continue
            }else if(j+2<m){
                let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j+2).toString()+"']");
                if (qr == null || qr.classList.contains("cell-border")){
                    j=j+2
                    continue
                }
            }
        }
        var up_cond = true
        var down_cond = true
        var right_neighbor_cond = true //do not close gates
        if (i>0){
            let qu = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+j.toString()+"']");
            if (qu == null || qu.classList.contains("cell-border")){
                up_cond = false
            }
            if (j+1<m){
                let qr = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+(j+1).toString()+"']");
                if (qr == null || qr.classList.contains("cell-border")){
                    right_neighbor_cond = false
                }
            }
        }
        if (i+1<n){
            let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+j.toString()+"']");
            if (qd == null || qd.classList.contains("cell-border")){
                right_cond = false
            }
            if (i+1<n){
                let qr = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+(j+1).toString()+"']");
                if (qr==null || qr.classList.contains("cell-border")){
                    right_neighbor_cond = false
                }
            }
        }
        if (up_cond && down_cond && right_neighbor_cond){
            found_start_cell=true
        }else{
            j++;
        }
    }
    const horizontal_start_index = j
    if (close_gate_before_border_horizontal(i,j,n,m)){
        return false
    }

    //2. get end cell (uc, dd, or cell right===border)
    var horizontal_end_index = j
    var found_end_cell = false

    while(!found_end_cell){
        if (horizontal_end_index>=m-1){
            horizontal_end_index=m-1
            found_end_cell=true
        }
        var up_cond = false
        var down_cond = false
        var right_cond = false
        if (horizontal_end_index+1<m){
            let qr = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(horizontal_end_index+1).toString()+"']");
            if (qr == null || qr.classList.contains("cell-border")){
                right_cond = true
            }
        }
        if (i>0){
            let qu = document.querySelector("th.cell[row='"+(i-1).toString()+"'][column='"+horizontal_end_index.toString()+"']");
            if (qu == null || qu.classList.contains("cell-border")){
                up_cond = true
            }
        }
        if (i+1<n){
            let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+horizontal_end_index.toString()+"']");
            if (qd == null || qd.classList.contains("cell-border")){
                down_cond = true
            }
        }
        if (up_cond || down_cond || right_cond){
            found_end_cell=true
        }else{
            horizontal_end_index++;
        }
    }
    // given: horizontal_start_index, horizontal_end_index
    //3. get potential gate index inbetween start and end (excluding)
    var gate_index = -1
    if ((horizontal_end_index-horizontal_start_index)>=2){
        gate_index=get_random(horizontal_start_index+1,horizontal_end_index-1)
    }else{
        //no gate
        return false
    }
    //4. add border cells (walls), exclude gate
    for (let idx = horizontal_start_index; idx <= horizontal_end_index; idx++) {
        await sleep(ms/(m+1));
        if (idx!=gate_index){
            update_wall(i,idx)
        }
    }
    return true
}


async function gen_vertical_wall(n,m,ms,val=null){
    //return true if done (at least 1 cell)
    //return false if attempt failed (random column -> vert wall not possible)
    var j = get_random(0,m)
    if (val!=null){
        j=val
    }
    var i = 0 //get start[ |- ] + end [ -| ] + gate[ -0- ]        |---------0---| (flipped)
    //1. get start cell
    var found_start_cell = false

    while(!found_start_cell){
        if (i>=n){
            return false
        }
        if (i+1<n){
            let qd = document.querySelector("th.cell[row='"+(i+1).toString()+"'][column='"+j.toString()+"']");
            if (qd == null || qd.classList.contains("cell-border")){
                i++
                continue
            }else if(i+2<n){
                let qd = document.querySelector("th.cell[row='"+(i+2).toString()+"'][column='"+j.toString()+"']");
                if (qd == null || qd.classList.contains("cell-border")){
                    i=i+2
                    continue
                }
            }
        }
        var left_cond = true
        var right_cond = true
        var down_neighbor_cond = true //do not close gates
        if (j>0){
            let ql = document.querySelector("th.cell[row='"+i.toString()+"'][column='"+(j-1).toString()+"']");
            if (ql == null || ql.classList.contains("cell-border")){
                left_cond = false
            }
            if (i+1<n){
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
            if (i+1<n){
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
    if (close_gate_before_border_vertical(i,j,n,m)){
        return false
    }
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
        if (vert_end_index+1<n){
            let qd = document.querySelector("th.cell[row='"+(vert_end_index+1).toString()+"'][column='"+j.toString()+"']");
            if (qd == null || qd.classList.contains("cell-border")){
                down_cond = true
            }
        }
        if (j>0){
            let ql = document.querySelector("th.cell[row='"+vert_end_index.toString()+"'][column='"+(j-1).toString()+"']");
            if (ql == null || ql.classList.contains("cell-border")){
                left_cond = true
            }
        }
        if (j<m-1){
            let qr = document.querySelector("th.cell[row='"+vert_end_index.toString()+"'][column='"+(j+1).toString()+"']");
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
    //3. get potential gate index inbetween start and end (excluding)
    var gate_index = -1
    if ((vert_end_index-vert_start_index)>=2){
        gate_index=get_random(vert_start_index+1,vert_end_index-1)
    }else{
        //no gate
        return false
    }
    //4. add border cells (walls), exclude gate
    for (let idx = vert_start_index; idx <= vert_end_index; idx++) {
        if (idx!=gate_index){
            update_wall(idx,j)
        }
        await sleep(ms/(n+1));
    }
    return true
}

function update_wall(_x,_y){
    let x = _x.toString()
    let y = _y.toString()
    const q = document.querySelector("th.cell-default[row='"+x+"'][column='"+y+"']");
    if (q==null){
        //cell-default failed -> player, or...
        return
    }
    //q.classList.remove('cell-default')
    //q.classList.add('cell-border')
    q.className = "cell cell-border"

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