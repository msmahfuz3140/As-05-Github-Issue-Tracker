const btnContainer = document.getElementById("allBtnContainer")

btnContainer.addEventListener("click",(e)=>{
    console.log(e.target);
    if(e.target.localName === "button"){
        const buttons = document.querySelectorAll(".btn-nav");
        buttons.forEach(btn =>{
            btn.classList.remove("btn-primary")
        })
        e.target.classList.add("btn-primary")
    }
})