function createImage(srcPath) {
    const img = document.createElement('img');
    img.src = srcPath;
    img.height=500;
    img.width=500;
    img.alt = "Image description";
    return img;
}

let result = fetch('/recieveData', {method: 'GET'})
.then((res)=>res.json())
.then((data)=>{
    for(k in data["body"]){
        let element = document.getElementById(k)
        if(element)
            element.textContent += data["body"][k]
    }
    out_img = createImage(data['data']['output'])
    inp_img = createImage(data['data']['path'])
    document.getElementById("xray").appendChild(inp_img);
    document.getElementById("diag").appendChild(out_img);
})
.catch((err) => ("Error occured", err));
