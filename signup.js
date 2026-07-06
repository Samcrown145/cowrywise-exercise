function btn() {
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('errorMessage'); 
    const errorText = errorMessage.querySelector('span');
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud|mail|[a-zA-Z0-9.-]+)\.com$/i;
    const usedEmailsList = JSON.parse(localStorage.getItem('usedEmails')) || [];
    const isEmailUsed = usedEmailsList.includes(emailValue);
    
    if (emailValue === '') {
        setTimeout(() => {
            errorText.innerText = "Enter your email address.";
            errorMessage.style.display = 'block';
            emailInput.classList.add('error-field');
        }, 100); 
    } 

    else if (emailPattern.test(emailValue) === false) {
        setTimeout(() => {
            errorText.innerText = "Please check your email address.";
            errorMessage.style.display = 'block';
            emailInput.classList.add('error-field');
        }, 100); 
    } 

    else if (isEmailUsed === true) {
        setTimeout(() => {
            errorText.innerText = "This email has already been used.";
            errorMessage.style.display = 'block';
            emailInput.classList.add('error-field');
        }, 100); 
    }

    else {
        // errorMessage.style.display = 'none';
        // emailInput.classList.remove('error-field');
        usedEmailsList.push(emailValue);
        localStorage.setItem('userEmail', emailValue);
        localStorage.setItem('usedEmails', JSON.stringify(usedEmailsList));
        if (window.showLoaderAndRedirect) {
            window.showLoaderAndRedirect("verificationpage.html");
        } else {
            window.location.href = "verificationpage.html";
        }
    }
}

  
    
  