#!/usr/bin/env python
# -*- coding: utf-8 -*
import hashlib
from hashids import Hashids
from settings.log_settings import logging_setting
"""
モデル(関数、クラス、フィールド、メソッドなど)を定義する。
"""
# base 62
CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJELMNOPQRSTUVWXYZ"
hashids = Hashids()
logger = logging_setting('short_url')

def encode63(user_id, create_num, chars=CHARS):
    # ベース
    base = len(chars)
    # user_idとcreate_numを連結させる
    source_url = str(user_id) + str(create_num)
    logger.info('source_url: {}'.format(source_url))
    source_num = 0
    # ハッシュ化
    source256 = hashlib.sha256(source_url.encode()).hexdigest()
    logger.info('SHA256 for source_url: {}'.format(source256))
    # 10進数に変換する
    for char in source256:
        source_num = source_num * base + chars.index(char)
    source_base62 = ""
    logger.info('a decimal for source256: {}'.format(source_num))
    # 生成した10進数を62進数に変換する
    while True:
        source_base62 = str(chars[source_num % base]) + str(source_base62)
        source_num = source_num // base
        if source_num == 0:
            break
    # 得られたハッシュ値の先頭7文字を一意の短縮URLとする
    generate_short_url = source_base62[:7]
    logger.info('base 62 hash: {}'.format(source_base62))
    logger.info('generate short url: {}'.format(generate_short_url))
    return source_base62, generate_short_url

def decode63(source_url_hash, chars=CHARS):
    """
    base 62 to base 10
    """
    base = len(chars)
    source_num = 0
    # 62進数を10進数に変換する
    for char in source_url_hash:
        source_num = source_num * base + chars.index(char)
    # 10進数をハッシュ値（16進数）に変換する
    source_256 = hex(source_num)
    # ハッシュ値を復号する
    source = hashlib.sha256(source_256).digest()
    return source

if __name__ == "__main__":
    user_id = "testtestetsea_"
    create_num = 1
    source_url_hash, generate_short_url = encode63(user_id, create_num)
    d = decode63(source_url_hash)
    print(d)
