const save_btn = document.querySelector('#save');
const nameInput = document.querySelector('#name');
const eailInput = document.querySelector('#email');
const table = document.querySelector('table');
const notification = document.querySelector('.notify');
const update_btn = document.getElementById('update');
const student = [];
let currentIndex = null; // Added a variable to keep track of the currently selected index

// Get data
const getData = () => {
    const data = JSON.parse(localStorage.getItem('student'));

    if (data) {
        table.innerHTML = ''; // Clear previous data in the table

        data.forEach((stdnt, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${stdnt.name}</td>
                <td>${stdnt.email}</td>
                <td><button class="del_btn" onclick="delete_form(${index})">Delete</button></td>
                <td><button class="update_btn" onclick="edit_form(${index})">Update</button></td>
            `;
            table.appendChild(tr);
        });
    } else {
        notification.innerHTML = "No data Available";
    }
};

// Save or add data
save_btn.addEventListener('click', () => {
    const name = nameInput.value;
    const email = eailInput.value;

    student.push({
        name,
        email
    });

    localStorage.setItem('student', JSON.stringify(student));

    notification.innerHTML = "Data has been added";
    nameInput.value = '';
    eailInput.value = '';

    getData(); // Update the table after saving data
});

// Edit form
function edit_form(index) {
    const data = JSON.parse(localStorage.getItem('student'));
    currentIndex = index; // Set the currentIndex when editing
    nameInput.value = data[index].name;
    eailInput.value = data[index].email;
}

// Placeholder function for the update button
update_btn.addEventListener('click', () => {
    const name = nameInput.value;
    const email = eailInput.value;
    const data = JSON.parse(localStorage.getItem('student'));

    if (currentIndex !== null && currentIndex >= 0 && currentIndex < data.length) {
        data[currentIndex].name = name;
        data[currentIndex].email = email;
        localStorage.setItem('student', JSON.stringify(data));
        notification.innerHTML = "Data has been updated";
        currentIndex = null; // Reset currentIndex after updating
        getData(); // Update the table after modifying data
    }
});

// delete daa 

function delete_form(index) {
  const data = JSON.parse(localStorage.getItem('student'));
  data.splice(index, 1);
  localStorage.setItem('student', JSON.stringify(data));
  notification.innerHTML = "Data has been deleted";
  getData();
}




// Initial rendering of data
getData();