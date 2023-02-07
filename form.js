let ulist=document.getElementById('ul')
let li=document.createElement('li')
li.className='ul-item'

document.getElementById('my_form').addEventListener('submit', disp);

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/d96ad741cb834944901afe8df63e9346/data")
        .then((response) => {
            console.log(response)
            for (var i=0; i<response.data.length; i++) {
                showUserOnScreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })

        
})

function disp(e){
    e.preventDefault();

    let n=e.target.name.value;
    let email=e.target.email.value;
    // let category=e.target.category.value;

    const obj={
        n, email //, category
    }

    axios.post('https://crudcrud.com/api/d96ad741cb834944901afe8df63e9346/data', obj)
        .then((response) => {
            showUserOnScreen(response)
        })
        .catch((err) => {
            showUserOnScreen(err)
        })
    
    // localStorage.setItem(obj.n,JSON.stringify(obj))
    // localStorage.setItem(obj.email,JSON.stringify(obj))
    // localStorage.setItem(obj.category,JSON.stringify(obj))
    showUserOnScreen(obj)

}

function showUserOnScreen(obj){
    let parentEl=document.getElementById('ul')
    let childEl=document.createElement('li')
    let del=document.createElement('input')
    let edit=document.createElement('input')
    edit.type='button'
    edit.value='Edit'
    del.type='button'
    del.value='Delete'
    
    del.onclick=()=>{
        localStorage.removeItem(obj.email)
        parentEl.removeChild(childEl)
    }

    edit.onclick=()=>{
        let name=document.getElementById('name')
        let em=document.getElementById('email')
        // let cat=document.getElementById('category')

        name.value=obj.n
        em.value=obj.email
        // cat.value=obj.category

        localStorage.removeItem(obj.email)
        parentEl.removeChild(childEl)

    }
    
    
    
    childEl.textContent=obj.n+' | '+obj.email
    parentEl.appendChild(parentEl.appendChild(childEl))

    childEl.appendChild(del)
    childEl.appendChild(edit)

}