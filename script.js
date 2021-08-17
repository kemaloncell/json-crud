/* Read User*/
const userList = document.getElementById('userTable');
function getUserList() {
  fetch('https://reqres.in/api/users')
    .then((response) => response.json())
    .then((getData) => {
      getData.data.forEach((element) => {
        userList.innerHTML += ` <tr>
        <td><input type="text" class="form-control" id="firstName_${element.id}" value="${element.first_name}" /></td>
        <td><input type="text" class="form-control" id="lastName_${element.id}" value="${element.last_name}" /></td>
        <td><input type="text" class="form-control" id="email_${element.id}" value="${element.email}" /></td>
        <td>
          <button class="btn btn-info " onclick="updateUser(${element.id})">Güncelle</button>
          <button class="btn btn-danger" onclick="deleteUser(${element.id})">Sil</button>
        </td>
      </tr>`;
      });
    });
}
getUserList();

function refreshUser() {
  getUserList();
}

/* Create User*/

function createUser() {
  let data = {
    first_name: document.getElementById('first_name').value || 'Empty value',
    last_name: document.getElementById('last_name').value || 'Empty value',
    email: document.getElementById('email').value || 'Empty value',
  };
  fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((getData) => {
      userList.innerHTML += `<tr>
      <td><input type="text" class="form-control" id="" value="${getData.first_name}" /></td>
      <td><input type="text" class="form-control" id="" value="${getData.last_name}" /></td>
      <td><input type="text" class="form-control" id="" value="${getData.email}" /></td>
      <td>
        <button class="btn btn-info " oclick="updateUser(${getData.id})">Güncelle</button>
        <button class="btn btn-danger" onclick="deleteUser(${getData.id})">Sil</button>
      </td>
    </tr>`;
    })
    .catch((error) => {
      console.log('Mistake: ', error);
    });
}

function updateUser(id) {
  let data = {
    first_name: document.getElementById('firstName_' + id).value || 'invalid value',
    last_name: document.getElementById('lastName_' + id).value || 'invalid value',
    email: document.getElementById('email_' + id).value || 'invalid value',
  };
  fetch('https://reqres.in/api/users', {
    method: 'PUT',
    headers: {
      Content_Type: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((getData) => {
      console.log(getData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(id) {
  fetch('https://reqres.in/api/users' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => console.log(response))
    .then((data) => {
      console.log('User deleted');
    })
    .catch((error) => {
      console.log(error);
    });
}
