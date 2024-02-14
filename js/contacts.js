let contacts = {};
let currentContact = -1;

function addContact() 
{
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
            console.log("Contact has been added");
        });
    } catch (err) {
        console.log(err.message);
    }
}

function openContact(contactId)
{
    currentContact = contactId;
    document.getElementById("current-fname").textContent = contacts[contactId].firstName;
    document.getElementById("current-lname").textContent = contacts[contactId].lastName;
    document.getElementById("current-phone").textContent = contacts[contactId].phoneNumber;
    document.getElementById("current-email").textContent = contacts[contactId].email;
}

function loadContacts(data)
{
    var html = "";
    results = data.results;
    for (var i = 0; i < results.length; i++)
    {
        var contact = results[i].split(" ");
        var id = i;
        var firstName = contact[0];
        var lastName = contact[1];
        var phone = contact[2];
        var email = contact[3];

        // skip contact if corrupt
        if (firstName == "" || lastName == "" || phone == "" || email == "") break;
        
        // add to contacts list
        contacts[i] =
        {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            email: email,
            id: id
        };

        // generate html tags
        html += "<tr><td><a href=\"#\" onclick=openContact(" + id + ")>" + firstName + " " +  lastName + "</a></td></tr>";
    }

    // inject html text
    document.getElementById("contact-table-data").innerHTML = html;
}

function searchContacts()
{
    let searchData = document.getElementById("search-bar").value;
    let searchInfo = {
        firstName: searchData,
        userId: userId
    }
    let payload = JSON.stringify(searchInfo);
    let url = apiURL + '/SearchContacts' + apiExtension;

    try
    {
        $.post(url, payload, function(data, status)
        {
            loadContacts(data);
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
    document.getElementById("contact-delete-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "inline-block";
    document.getElementById("contact-save-button").style.display = "inline-block";
    document.getElementById("add-contact").style.display = "none";

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

function resetFields()
{
    // reset visibility
    document.getElementById("current-name").style.display = "flex";
    document.getElementById("fname-editor-data").style.display = "none";
    document.getElementById("lname-editor-data").style.display = "none";
    document.getElementById("current-phone").style.display = "inline-block";
    document.getElementById("phone-editor").style.display = "none";
    document.getElementById("current-email").style.display = "inline-block";
    document.getElementById("email-editor").style.display = "none";
    
    document.getElementById("add-contact").style.display = "inline-block";
    document.getElementById("cancel-button").style.display = "none";
    document.getElementById("new-contact-save").style.display = "none";
    document.getElementById("contact-edit-button").style.display = "inline-block";
    document.getElementById("contact-delete-button").style.display = "inline-block";
    document.getElementById("contact-save-button").style.display = "none";
    
    // reset field content
    document.getElementById("current-fname").textContent = "";
    document.getElementById("current-lname").textContent = "";
    document.getElementById("current-phone").textContent = "";
    document.getElementById("current-email").textContent = "";

    if (currentContact > 0) openContact(currentContact);
    else currentContact = -1;
}

function saveEdits()
{
    // update button
    document.getElementById("cancel-button").style.display = "none";
    document.getElementById("new-contact-save").style.display = "none";
    document.getElementById("contact-delete-button").style.display = "inline-block";
    document.getElementById("contact-save-button").style.display = "none";
    document.getElementById("contact-edit-button").style.display = "inline-block";
    document.getElementById("add-contact").style.display = "inline-block";
    
    // update name labels
    document.getElementById("fname-editor-data").style.display = "none";
    document.getElementById("lname-editor-data").style.display = "none";
    document.getElementById("current-name").style.display = "flex";

    // update contact fields
    document.getElementById("phone-editor").style.display = "none";
    document.getElementById("current-phone").style.display = "inline-block";
    document.getElementById("email-editor").style.display = "none";
    document.getElementById("current-email").style.display = "inline-block";

    // save name
    contacts[currentContact].firstName = document.getElementById("fname-editor").value;
    contacts[currentContact].lastName = document.getElementById("lname-editor").value;

    // save contact fields
    contacts[currentContact].phoneNumber = document.getElementById("phone-editor").value;
    contacts[currentContact].email = document.getElementById("email-editor").value;

    openContact(currentContact);

    // update contact in database
    // DO ONCE UPDATE API ENDPOINT IS CREATED
}

function newContact()
{
    // update button
    document.getElementById("contact-edit-button").style.display = "none";
    document.getElementById("contact-delete-button").style.display = "none";
    document.getElementById("cancel-button").style.display = "inline-block";
    document.getElementById("new-contact-save").style.display = "inline-block";
    document.getElementById("contact-save-button").style.display = "none";
    document.getElementById("add-contact").style.display = "none";

    // update name labels
    document.getElementById("current-name").style.display = "none";
    document.getElementById("fname-editor-data").style.display = "flex";
    document.getElementById("lname-editor-data").style.display = "flex";

    // update contact fields
    document.getElementById("current-phone").style.display = "none";
    document.getElementById("phone-editor").style.display = "inline-block";
    document.getElementById("current-email").style.display = "none";
    document.getElementById("email-editor").style.display = "inline-block";
}

function createContact()
{
    fields = 
    {
        userId: userId,
        firstName: document.getElementById("fname-editor").value,
        lastName: document.getElementById("lname-editor").value,
        phone: document.getElementById("phone-editor").value,
        email: document.getElementById("email-editor").value
    }

    let payload = JSON.stringify(fields);
    let url = apiURL + '/AddContact' + apiExtension;

    try
    {
        $.post(url, payload, function(data, status)
        {
            newId = contacts.length + 1;
            contacts[newId] =
            {
                firstName: fields.firstName,
                lastName: fields.lastName,
                phoneNumber: fields.phone,
                email: fields.email,
                id: newId
            };
            resetFields();
            openContact(newId);
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}
