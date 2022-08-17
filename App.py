from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

grid_n = None
grid_m = None


def set_new_grid_size(n: int, m: int) -> None:
    global grid_n, grid_m
    if n >= 2 and m >= 2:
        grid_n = n
        grid_m = m


@app.route("/")
def main():
    if request.args:
        grid_size_n = request.args.get("grid_n", type=int)
        grid_size_m = request.args.get("grid_m", type=int)
        set_new_grid_size(grid_size_n, grid_size_m)
    return render_template("main.html", grid_n=grid_n, grid_m=grid_m)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("page_not_found.html")


@app.route("/create_new_grid/", methods=["POST"])
def create_new_grid():
    return redirect(
        url_for("main", grid_n=request.form["grid-n"], grid_m=request.form["grid-m"])
    )


if __name__ == "__main__":
    app.run()
