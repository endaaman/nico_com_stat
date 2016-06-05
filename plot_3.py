# -*- coding: UTF-8 -*-
from pymongo import MongoClient
import numpy as np
import matplotlib.pyplot as plt

# print np.linspace(0, 100, 11, endpoint=True)

client = MongoClient('localhost', 27017)
coms = client.nico_1.coms
docs = coms.find({'stats': {'$ne': None}})

data = []
for doc in docs:
    if not 'level' in doc['stats']:
        continue
    data.append(len(doc['stats']['tags']))


plt.hist(data, bins=10)
# plt.xticks(np.linspace(0, 1000, 11, endpoint=True))
plt.yticks(np.linspace(0, 800, 41, endpoint=True))
plt.grid(True)
plt.savefig('image_3.png', dpi=100)
