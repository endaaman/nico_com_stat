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
    if not 'member_count' in doc['stats']:
        continue
    data.append(doc['stats']['member_count'])

plt.hist(data, bins=100, range=(0, 200))
plt.xticks(np.linspace(0, 200, 21, endpoint=True))
# plt.yticks(np.linspace(0, 200, 21, endpoint=True))
plt.grid(True)
plt.savefig('image_1.png', dpi=100)
