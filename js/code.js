const apiURL = "http://4331cop.xyz/LAMPAPI";
const apiExtension = ".php";

let userId = -1;
let firstName = "";
let lastName = "";


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
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                let response = JSON.parse(xhr.responseText);

                userId = response.id;

                // check api response
                if (userId < 1)
                {
                    document.getElementById("login-response").innerHTML = "Error while creating account";
                    return false;
                }

                // save user login
                storeCookie();

                // redirect page
                window.location.href = "contacts.html";
            }
        };
        xhr.send(payload);
    }
    catch(error)
    {
        document.getElementById("login-response").innerHTML = error.message;
        return false;
    }
}

function addContact() {

    let firstName = document.getElementById("contactsFirstName").value;
    let lastName = document.getElementById("contactsLastName").value;
    let phone = document.getElementById("contactsPhoneNumber").value;
    let email = document.getElementById("contactsEmail").value;

    let contactInfo = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        userId: userId
    };


    let payload = JSON.stringify(contactInfo);

    let url = apiURL + '/AddContact' + apiExtension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been added");
            }
        };
        xhr.send(payload);
    } catch (err) {
        console.log(err.message);
    }
}


function storeCookie()
{
    let currentDate = new Date();
    let expireMinutes = 30;
    let expireDate = new Date(currentDate.getTime() + expireMinutes * 60 * 1000);

    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + expireDate.toGMTString();
}

function getCookie()
{
    userId = -1;
    const cookie = document.cookie;
    const data = cookie.split(";")[0].split(",");


    for (var i = 0; i < data.length; i++)
    {
        let currentVar = data[i].trim();
        currentVar = currentVar.split("=");
        let key = currentVar[0];
        let value = currentVar[1];
        if (key == "firstName")
        {
            firstName = value;
        }
        else if (key == "lastName")
        {
            lastName = value;
        }
        else if (key == "userId")
        {
            userId = value;
        }
    }

    // verify restored information
    if (userId < 0)
    {
        window.location.href = "login.html";
    }
    else
    {
        window.location.href = "contacts.html";
    }
}
