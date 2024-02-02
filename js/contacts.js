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

function loadContacts(results)
{

    let nameText = "";
    let infoText = "";
    let firstNameTable;
    let lastNameTable;
    let phoneTable;
    let emailTable;
    let totalSearch;
    for (let i = 0; i<results.results.length; i++)
    {
	nameText += "<tr>";
        totalSearch = results.results[i];
        totalSearch = totalSearch.split(" ");
        firstNameTable = totalSearch[0];
        lastNameTable = totalSearch[1];
	phoneTable = totalSearch[2];
	emailTable = totalSearch[3];
        infoText += "<tr><td id='current-fname'>" + firstNameTable + " " + lastNameTable +"</td></tr>"
        infoText += "<tr><td class='current-contact-details'><span class='current-label'>Phone Number</span><span class='current-data' id='current-phone'>" + phoneTable + "</span></td></tr>"
        infoText += "<tr><td class='current-contact-details'><span class='current-label'>Email</span><span class='current-data' id='current-email'>" + emailTable + "</span></td></tr>"
        nameText += "<td>" + firstNameTable;
        nameText += " " + lastNameTable + "</td>";
    	nameText += "</tr>";
}
    document.getElementById("contactsTable").innerHTML = nameText;
    document.getElementById("contactsListForReal").innerHTML = infoText;
}

function searchContacts()
{
    let searchFirst = document.getElementById("searchFirstName").value;
    let searchLast = document.getElementById("searchLastName").value;
    let searchInfo = {
        firstName: searchFirst,
        lastName: searchLast,
        userId: userId
    }
    let payload = JSON.stringify(searchInfo);
    let url = apiURL + '/SearchContacts' + apiExtension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                let json = JSON.parse(xhr.responseText);
                loadContacts(json);
            }
	};
            xhr.send(payload);
    }
    catch(err)
    {
        console.log(err.message);
    }
}
