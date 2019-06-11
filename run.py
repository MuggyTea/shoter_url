#!/usr/bin/env python
# -*- coding: utf-8 -*i
from flask import Flask, render_template, url_for, request, redirect, json, jsonify
from flask_restful import Resource, Api, reqparse

from app import settings, views
from app.views import create_app, MakeShorterUrl

app = create_app()
api = Api(app)

@app.route('/')
def index():
    print('index')
    return render_template('index.html')

# urlとパスの紐付け
api.add_resource(MakeShorterUrl, '/make')

if __name__ == '__main__':
    print('main')
    app.run()
