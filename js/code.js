function login()
{
    // get login info
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // check if empty
    if (username == "")
    {
        document.getElementById("login-response").innerHTML = "Username cannot be empty";
        return false;
    }
    else if (password == "")
    {
        document.getElementById("login-response").innerHTML = "Password cannot be empty";
        return false;
    }


}

function create_account()
{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
}
