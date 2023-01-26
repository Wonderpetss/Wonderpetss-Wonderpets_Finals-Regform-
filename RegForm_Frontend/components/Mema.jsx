import styles from "./Mema.module.css";
import { useState } from 'react';
import axios  from 'axios';



const Swal = require('sweetalert2')
const {log} = console;


export default function Mema() {
    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [cpnum, setCpnum] = useState('');
    const [address, setAddress] = useState('');
    const [choice, setChoice] = useState('');
    const [reason, setReason] = useState('');



    
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        Swal.fire({
            title: "Are you sure on your data?",
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No'  
        }).then((result) => {
            if (result.isConfirmed) {
              try {
                axios({
                    url: 'http://localhost:5000/data',
                    method: 'GET', 
                    params: {
                        email:email
                    }
                })
    
                .then(response => {
                    if (response.data === 'Exists') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Email already exist',})
                    }
                    else {
                        axios ({
                            url:"http://localhost:5000/data",
                            method: "POST",
                            data: {
                            fname: fname,
                            lname: lname,
                            email: email,
                            cpnum: cpnum,
                            address: address,
                            choice: choice,
                            reason: reason}
                        });
                        Swal.fire('Saved!', '', 'success')
                    }
                })
                .catch (error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',})
                })
    
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',})
            }
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
              
            }
          })
            
        


    }

        

    if (typeof window !== "undefined"){
        document.querySelectorAll('input[type="number"]').forEach(input=>{
            input.oninput = () =>{
                if(input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
            }
        });
    }
    

    
 
    return (
        <form onSubmit={handleSubmit}>
        <div className={styles.container} id="input">         
            <div>
                <div className={styles.rect}>
                    <img src="fff.png" alt="" />
                    <h2>International State College of the Philippines</h2>
                </div>
                <div className={styles.rect1}>
                    <h1>Registration Form</h1>
                </div>     
                <div className={styles.rect2}></div>  
            </div>
            <div className={styles.fname}><p>First Name:</p></div>
            <div className={styles.lname}><p>Last Name:</p></div>
            <div className={styles.mail}><p>Email:</p></div>
            <div className={styles.mobn}><p>Mobile No:</p></div>
            <div className={styles.num}><p>+63</p></div>
            <div className={styles.add}><p>Address:</p></div>
            <div className={styles.ques}><p>Are you an old ISCP student?</p></div>
            <div className={styles.reas}><p>Why do you want to study here?</p></div>
            <div> 
                <input  type="text" id='fname' pattern="[a-z A-Z]*" value={fname.charAt(0).toUpperCase()+ fname.slice(1)} onChange={({target}) => setFname(target?.value)} className={styles.rectfname} required />
            </div> 
            <div>
                <input  type="text" id='lname' pattern="[a-z A-Z]*" value={lname.charAt(0).toUpperCase()+ lname.slice(1)} onChange={({target}) => setLname(target?.value)} className={styles.rectlname} required/>
            </div>
            <div>
                <input  type="email" id='email' value={email} onChange={({target}) => setEmail(target?.value)} className={styles.rectemail} required/>
            </div>
            <div>
                <input type="number" id='cpnum' maxLength="10" value={cpnum} onChange={({target}) => setCpnum(target?.value)} className={styles.rectnum} min="9000000000" required/> 
            </div>
            <div>
                <input type="text" id='address' value={address.charAt(0).toUpperCase()+ address.slice(1)} onChange={({target}) => setAddress(target?.value)} className={styles.rectaddress} required/> 
            </div>
            <div className={styles.checks} value={choice} onChange={({target}) => setChoice(target?.value)}  >
                <div className={styles.ychecks}>
                    <input type="radio" id="yes" name="choice" value="Yes" required />
                    <label for="yes">Yes</label>
                </div>
                <div className={styles.nchecks}>
                    <input type="radio" id="no" name="choice" value="No" required />
                    <label for="no">No</label>
                </div>
            </div>
            <div>
                <textarea id='reason' wrap="hard" value={reason.charAt(0).toUpperCase()+ reason.slice(1)} onChange={({target}) => setReason(target?.value)} className={styles.rectreason} required/> 
            </div>
            <div>
                <button type="submit" className={styles.button} >Submit</button>               
            </div>
            </div>
            </form> 
    );
}






