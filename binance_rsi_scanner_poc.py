import json
import requests
import numpy as np
import pandas as pd
import talib

#Get list of symbols traded on Binance
url0 = 'https://api.binance.com/api/v3/ticker/price'
a = requests.get(url0).json()

#Function to find RSI for each pair
def find_rsi(pair):
    #Get data from Binance API, use 500 periods to calculate the RSI
    p = {'symbol':pair, 'interval':'1h','limit':'500'}
    url1 = 'https://api.binance.com/api/v3/klines'
    b = requests.get(url1, params=p).json()

    #Filter out new pair
    if b[0][0] > 1605474000005:
        return 0

    if b[0][0] < 1605473000000:
        return 0

    #Filter out delisted pair
    if b[499][6] < 1607270000000:
        return 0

    #Filter out pairs with <100 trades in the last hour
    if b[499][8] < 100:
        return 0

    #Load array with closing prices
    df = np.empty(500)
    i = 0

    for row in b:
        df[i]= float(row[4])
        i = i + 1

    #Feed array into RSI function
    rsi = talib.RSI(df, timeperiod=14)

    #Filter out pairs with RSI = 0
    if rsi[-1] == 0:
        return 0

    #Filter out pairs with RSI > 35
    if rsi[-1] > 35:
        return 0

    #Print RSI
    print(pair, end=": ")
    print(rsi[-1])

#Pass each pair through the find_rsi function
for row in a:
    find_rsi(row['symbol'])
