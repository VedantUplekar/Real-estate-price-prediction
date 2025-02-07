from flask import Flask, request, jsonify
from matplotlib.cbook import strip_math

import util
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    est_price = util.get_estimated_price(location,total_sqft,bhk,bath)
    unit = "Lakh"

    if est_price >= 100.00:
        cr_price = str(est_price).split(".")[0]
        cr_price = cr_price[:-2] + "." + cr_price[-2:]
        est_price = cr_price
        unit = "Crore"

    response = jsonify({
        'estimated_price': str(est_price) + " " + unit
    })

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()