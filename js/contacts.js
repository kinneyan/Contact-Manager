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

    try {
        $.post(url, payload, function(data, status)
        {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been added");
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

function loadContacts(results)
{
    let text = "";
    let firstNameTable;
    let lastNameTable;
    let totalName;
    for (let i = 0; i<results.results.length; i++)
    {
	text += "<tr>";
        totalName = results.results[i];
        totalName = totalName.split(" ");
        firstNameTable = totalName[0];
        lastNameTable = totalName[1];
        text += "<td><span>" + firstNameTable + "</span></td>";
        text += "<td><span>" + lastNameTable + "</span></td>";
    	text += "</tr>";
}
    document.getElementById("contactList").innerHTML = text;
}

function searchContacts()
{
    let searchFirst = document.getElementById("searchFirstName").value;
    let searchLast = document.getElementById("searchLastName").value;
    let searchInfo = {
        firstName: searchFirst,
        lastName: searchLast,
        //userId: userId
    }
    let payload = JSON.stringify(searchInfo);
    let url = apiURL + '/SearchContacts' + apiExtension;

    try
    {
        $.post(url, payload, function(data, status)
        {
            if(this.readyState == 4 && this.status == 200)
            {
                loadContacts(data);
            }
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}

function editContact()
{
    // update button
    document.getElementById("contact-edit-button").style.display = "none";
    document.getElementById("contact-save-button").style.display = "inline-block";

    // update name labels
    document.getElementById("current-name").style.display = "none";
    document.getElementById("fname-editor-data").style.display = "flex";
    document.getElementById("lname-editor-data").style.display = "flex";

    // update placeholders to match current name
    document.getElementById("fname-editor").value = document.getElementById("current-fname").textContent;
    document.getElementById("lname-editor").value = document.getElementById("current-lname").textContent;

    // update contact fields
    document.getElementById("current-phone").style.display = "none";
    document.getElementById("phone-editor").style.display = "inline-block";
    document.getElementById("current-email").style.display = "none";
    document.getElementById("email-editor").style.display = "inline-block";

    // update placeholders for contact fields
    document.getElementById("phone-editor").value = document.getElementById("current-phone").textContent;
    document.getElementById("email-editor").value = document.getElementById("current-email").textContent;
}

function saveEdits()
{
    // update button
    document.getElementById("contact-save-button").style.display = "none";
    document.getElementById("contact-edit-button").style.display = "inline-block";
    
    // update name labels
    document.getElementById("fname-editor-data").style.display = "none";
    document.getElementById("lname-editor-data").style.display = "none";
    document.getElementById("current-name").style.display = "flex";

    // update contact fields
    document.getElementById("phone-editor").style.display = "none";
    document.getElementById("current-phone").style.display = "inline-block";
    document.getElementById("email-editor").style.display = "none";
    document.getElementById("current-email").style.display = "inline-block";
}
