
debugger;
const email_input = document.getElementById("email_input")
console.log(email_input);

const password_input = document.getElementById("password_input")



email_input.addEventListener("input", function () {
    

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regexEmail.test(email_input.value) && !email_input.value == "") {
        let email_message_validate = document.getElementById("email_message_validate")
        email_message_validate.innerHTML = "Invalid email address."
        
    } else{
        let email_message_validate = document.getElementById("email_message_validate")
        email_message_validate.innerHTML = ""
        
    }
    
    })



password_input.addEventListener("input", function () {
    

    const regexEmail = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    if (!regexEmail.test(password_input.value) && !password_input.value == "") {
        let password_message_validate = document.getElementById("password_message_validate")
        password_message_validate.innerHTML = "Password must have 8+ chars, 1 uppercase, 1 number, 1 special char."
        
    } else {

      let password_message_validate = document.getElementById("password_message_validate")
        password_message_validate.innerHTML = ""
        
    }
    
    })




    document.getElementById('login_form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        // Get input values
        const email = document.getElementById('email_input').value.trim();
        const password = document.getElementById('password_input').value;
    
     
    
        // Retrieve existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Check if the email and password match a user
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
            alert(`Welcome, ${user.name}!`);
            // Save logged-in state to session storage
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            
        } else {
            alert('Invalid email or password!');
        }
    });
    
    

