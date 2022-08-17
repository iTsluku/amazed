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

function gen_maze(){
    const [n, m] = get_grid_size()
    console.log(n,m)
    let _n = (n-1).toString()
    let _m = (m-1).toString()
    const q = document.querySelector("th.cell-default[row='"+_n+"'][column='"+_m+"']");
    q.classList.remove('cell-default');
    q.classList.add('cell-border');
    console.log(q)
}

function clear_cells(){
    const cells = document.querySelectorAll('th.cell')
    for (let i = 0; i < cells.length; i++) {
        c = cells[i]
        c.className = "cell cell-default";
    }
}