function login()
{
    // get login information
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // check if empty
    var exit = false;
    if (username == "")
    {
        document.getElementById("username-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("username-empty").style.display = "none";
    }
    if (password == "")
    {
        document.getElementById("password-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("password-empty").style.display = "none";
    }
    if (exit) return false;

    loginFields =
    {
        login: username,
        password: password
    }

    let payload = JSON.stringify(loginFields);

    let url = apiURL + "/Login" + apiExtension;

    try
    {
        $.post(url, payload, function(data, status)
        {
                // check if login is valid
                userId = data.id;
                if (userId < 1)
                {
                    document.getElementById("login-response").innerHTML = "Username or password is incorrect";
                    return false;
                }

                firstName = data.firstName;
                lastName = data.lastName;

                // save user login
                storeCookie();

                // redirect page
                window.location.href = "contacts.html";
        });
    }
    catch(error)
    {
        document.getElementById("login-response").innerHTML = "Login failed";
        console.log("Login failed - " + error.message)
        return false;
    }
    return false;
}

function logout()
{
    userId = -1;
    firstName = "";
    lastName = "";
    window.location.href = "index.html";
    document.cookie = "";
}

function register()
{
    // get registration information
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("password-confirmation").value;

    let loginResponse = document.getElementById("login-response");

    // check if empty
    var exit = false;
    if (firstName == "")
    {
        document.getElementById("fname-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("fname-empty").style.display = "none";
    }
    if (lastName == "")
    {
        document.getElementById("lname-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("lname-empty").style.display = "none";

    }
    if (username == "")
    {
        document.getElementById("username-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("username-empty").style.display = "none";
    }
    if (password == "")
    {
        document.getElementById("password-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("password-empty").style.display = "none";
    }
    if (password != passwordConfirmation)
    {
        document.getElementById("cpassword-empty").style.display = "flex";
        exit = true;
    }
    else
    {
        document.getElementById("cpassword-empty").style.display = "none";

    }
    if (exit) return false;

    registerFields =
    {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password
    }

    payload = JSON.stringify(registerFields);

    let url = apiURL + "/Register" + apiExtension;
    try
    {
        $.post(url, payload, function(data, status)
        {
            userId = data.userId;
            if (userId < 1)
            {
                document.getElementById("login-response").innerHTML = "Error while creating account";
                return false;
            }

            storeCookie();

            window.location.href="contacts.html";
        });
    }
    catch(error)
    {
        document.getElementById("login-response").innerHTML = "Error while creating account";
        console.log("Register failed - " + error.message);
        return false;
    }
    return false;
}
