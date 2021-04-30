
import flask
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import json
import os
from flask import request
# if os.path.isfile('filename.txt'):
#     print ("File exist")
# else:
#     print ("File not exist")
app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/checkExistFile', methods=['GET'])
@cross_origin()
def checkExistFile():
    if 'url' in request.args:
        url = request.args['url']
        print(url)
    else:
        return "ERROR: NO URL PROVIDED"
    if os.path.isfile(url):
        print("true")
        key = "true"
        return key
    else:
        
        key = 'false'
        return key

app.run()