function submitForm(e){
    e.preventDefault();
    const name = document.getElementById("name");
    const dob = document.getElementById("dob");
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const sex = document.querySelector('input[name="sex"]:checked');
    const email = document.getElementById("email");
    const files = document.getElementById("upload");
    const formData = new FormData();
    for(let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
    formData.append("name",name.value)
    formData.append("dob",dob.value)
    formData.append("weight",weight.value)
    formData.append("height",height.value)
    formData.append("sex",sex.value)
    formData.append("email",email.value)

    fetch("http://localhost:3000/upload_files", {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((res) =>{
        window.location.href = '/login2.html'
    })
    .catch((err) => ("Error occured", err));
}