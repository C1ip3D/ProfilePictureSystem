const firebaseConfig = {
  apiKey: 'AIzaSyBIZZSJGtdByafQUoGfseDkS_qnjcnnrzE',
  authDomain: 'skyhax-8b22e.firebaseapp.com',
  databaseURL: 'https://skyhax-8b22e-default-rtdb.firebaseio.com',
  projectId: 'skyhax-8b22e',
  storageBucket: 'skyhax-8b22e.appspot.com',
  messagingSenderId: '978095074052',
  appId: '1:978095074052:web:0c6a854b81eab082243e51',
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementsByClassName('auth')[0].style.display = 'none';
    document.getElementsByClassName('content')[0].style.display = 'block';

    let storageRef = storage
      .ref()
      .child('profilePics/' + user.uid + '/profilePicture.jpg');

    storageRef
      .getDownloadURL()
      .then(function (url) {
        let img = document.getElementById('profilePic');
        img.src = url;
        img.style.display = 'block';
      })
      .catch(function (error) {
        alert('An error fetching profile pic' + error.message);
      });
  } else {
    document.getElementsByClassName('auth')[0].style.display = 'block';
    document.getElementsByClassName('content')[0].style.display = 'none';
  }
});

document.getElementById('REGsubmit').addEventListener('click', function (e) {
  e.preventDefault();
  let username = document.getElementById('REGusername').value;
  let password = document.getElementById('REGpassword').value;
  let domain = '@skyhax.lol';
  let email = username + domain;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      console.log('User created');
    })
    .catch(function (error) {
      alert('An error occured' + error.message);
    });
});

document.getElementById('LOGsubmit').addEventListener('click', function (e) {
  e.preventDefault();
  let username = document.getElementById('LOGemail').value;
  let password = document.getElementById('LOGpassword').value;
  let domain = '@skyhax.lol';
  let email = username + domain;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      console.log('User logged in');
    })
    .catch(function (error) {
      alert('An error occured' + error.message);
    });
});

document.getElementById('fileSubmit').addEventListener('click', function (e) {
  e.preventDefault();
  let file = document.getElementById('fileInput').files[0];
  let user = auth.currentUser;
  let storageRef = storage
    .ref()
    .child('profilePics/' + user.uid + '/profilePicture.jpg');

  storageRef
    .put(file)
    .then(function (snapshot) {
      alert('Profile Picture Uploaded');
      return storageRef.getDownloadURL();
    })
    .then(function (downloadURL) {
      let img = document.getElementById('profilePic');
      img.src = downloadURL;
      img.style.display = 'block';
    })
    .catch(function (error) {
      alert('An error occured');
      console.error(error.message);
    });
});

document.getElementById('signOut').addEventListener('click', function (e) { 
	e.preventDefault();
  auth.signOut();
  alert('Signed Out');
  window.location.reload();
})
