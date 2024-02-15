import config from "./config"

const common = {
    isLoggedIn: ()=> {
        if (localStorage.getItem("Authorization")) return true;
        return false;
    },
    isAdminLoggedIn: ()=> {
        if (localStorage.getItem("Admin-Authorization")) return true;
        return false;
    },
    isMember: ()=> {
        return localStorage.getItem("membershipStatus") ;
    },
    resetForm: (data) => {

        const {event, className} = data;
        const clearByEvent= (event)=>{
            event.classList.remove('was-validated');
            Array.prototype.slice.call(event.elements)
            .map((ele => {
            ele.classList.remove("is-invalid")
            if(ele.localName ==="input") {
                ele.value = "";
            }
            }))
        }
        if (event){
            clearByEvent(event.target);
        } 

        if (className){
            var forms = document.querySelectorAll('.'+ className);
            
            if(forms.length) clearByEvent(forms[0]);
            
            
        }
        
      },
    getUserId: ()=>{
        return localStorage.getItem('id');
    },
    getHeaders: ()=>{
        const  headers = config.headers;
        if (localStorage.getItem('Authorization')){
            headers['Authorization'] = localStorage.getItem('Authorization');
        }
        return headers;
    }
}

export default common;