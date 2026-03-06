document.getElementById('btn-login')
    .addEventListener('click', function () {
        // 1- get the mobile number input
        const userNameInput = document.getElementById('input-userName');
        const userName = userNameInput.value;
        // 2- get the pin input
        const pinInput = document.getElementById('input-pin');
        const pin = pinInput.value;

        // 3- macth mobile & pin
        if(userName === 'admin' && pin === 'admin123'){
            // 3.1 ==> true> alart= homepage
            alert('Login Successful');

            window.location.assign('./home.html')
        }
        else{
            // 3.2 ==> false> alart= return
            alert('Please Enter valid Username or Password');
            return;
        }
    })