#!/usr/bin/env python
# -*- coding: utf-8 -*
"""
routeを定義する。models.pyで定義したものを呼び出し、リクエストURL毎の処理の振り分け、リクエストパラメータ取得、レンダーテンプレート、リダイレクトなどをする。
"""

from flask import Flask, render_template, url_for, request, redirect, json, jsonify
from flask_restful import Resource, Api, reqparse
from settings.log_settings import logging_setting

app = Flask(__name__)
api = Api(app)

class TwitterLogin(Resource):
    """
    twitter login API
    ## something to do:
    ・login verrification
    ・regist user info for User table
    ・redirect for index page.
    """
    def get(self):
        pass
    def post(self):
        pass


class MakeShorterUrl(Resource):
    """
    Class to make shorter URL.
    Create shorter URL from recived first one.
    also save all URL info for create shorter URL Table.
    Do it when button "Create" on making shorter URL view.
    Recieved Post only. it can recieve multipul URLs.
    
    input: dict
    output: dict
    return: shorter_url
    """
    def get(self):
        pass
    def post(self):
        data = request.json
        # ソースURLを取得
        source_urls = data.post('source_urls')
        # ユーザーテーブルに登録するvv
        # ソースURL・ターゲットURL紐付けテーブルに登録する
        # ソースURLの最初の１つ目を取得する

# urlとパスの紐付け
api.add_resource(MakeShorterUrl, '/make')
