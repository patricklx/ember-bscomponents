__author__ = 'Patrick'

import os

dirs = os.listdir('components/')

for d in dirs:
    path = 'components/'+d
    if os.path.isdir(path):
        files = os.listdir(path)
        if len(files) > 2:
            exit(-1)
        coffee = next((s for s in files if '.coffee' in s), None)
        hbs = next((s for s in files if '.hbs' in s), None)

        coffeepath = path + '/' + coffee
        newpath = path + '/' + 'component.coffee'
        os.rename(coffeepath, newpath)

        if not hbs: continue
        hbspath = path + '/' + hbs
        newpath = path + '/' + 'template.hbs'
        os.rename(hbspath, newpath)


