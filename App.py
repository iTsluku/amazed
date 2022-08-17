from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)


@app.route("/")
def home():
    grid_n = None
    grid_m = None
    if request.args:
        grid_n = request.args.get('grid_n')
        grid_m = request.args.get('grid_m')
    return render_template("main.html", grid_n=grid_n, grid_m=grid_m)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("page_not_found.html")


@app.route("/create_new_grid/", methods=['POST'])
def create_new_grid():
    return redirect(url_for('home', grid_n=request.form["grid-n"], grid_m=request.form["grid-m"]))


if __name__ == "__main__":
    app.run()
