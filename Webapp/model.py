from ultralytics import YOLO
import sys, json
from PIL import Image
import numpy as np
import base64

def read_in():
    value = sys.stdin.readlines()[0]
    return json.loads(value)

path_loc = read_in()
model_test = YOLO('best.pt')
out = model_test(path_loc, verbose=False)
try:
    img_data = out[0].plot().astype(np.uint8)
    output = json.loads(out[0].tojson())[0]

    img = Image.fromarray(img_data[..., ::-1])
    path_save = 'outs/' + path_loc.split("/")[1]
    
    img.save("src/" + path_save)
    img.close()

    data = {
        "path" :  path_loc,
        "name" : output["name"],
        "class" : output["class"],
        "confidence" : output["confidence"],
        "output" : path_save,
    }
except:
        data = {
        "path" : path_loc,
        "name" : "N/A",
        "class" : -1,
        "confidence" : -1,
        "output" : "",
    }
json.dump(data,sys.stdout,indent=2)

