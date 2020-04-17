import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import logo from '../../assets/logo.png';
import firebase from '../../base';
import { validate } from 'email-validator';

let user = new Array(10); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id
var countArr = new Array(1); //account
var unameArr = [];
var emailArr = [];
var Util = require('../../util/Util');

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.signup = this.signup.bind(this);
      this.submitForgotPassword = this.submitForgotPassword.bind(this);
      this.state = {
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        repassword: '',
        wallet: ''
      };
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    componentDidMount() {
      document.getElementById("signinemail").focus();

      // counts current total account registered
      firebase.database()
        .ref('admin')
        .orderByChild('acct')
        .once('value')
        .then(function (snapshot) {
          snapshot.forEach(function (child) {
            countArr[0] = child.val().acct;
          })
        });

      // loads accounts
      firebase.database().ref('accounts')
        .orderByChild('email')
        .once('value')
        .then(function (snapshot) {
          var i = 0;
          snapshot.forEach(function (child) {
            unameArr[i] = child.val().uname;
            emailArr[i] = child.val().email;
            i++;
            console.log(countArr[0], emailArr.length);
          })
        });

      console.log(emailArr, unameArr);
    }

    // get all information from this account and stores into user
    checkEmail = e => {
      user = [];
      user[3] = document.getElementById("signinemail").value;
      user[3] = user[3].toString().toLowerCase();

      const accountsRef = firebase.database().ref('accounts');
      accountsRef.orderByChild('email')
        .equalTo(user[3])
        .once('value')
        .then(function (snapshot) {
          snapshot.forEach(function (child) {
            user[0] = child.val().fname;
            user[1] = child.val().lname;
            user[2] = child.val().uname;
            user[4] = child.val().phone;
            user[5] = child.val().isDriver;
            user[6] = child.val().isAdmin;
            user[7] = child.val().isBanned;
            user[8] = child.val().wallet;
            user[9] = child.key;
          });
        })
    }

    forgotPass(e) {
      document.getElementById("signinblock").style.display = "none";
      document.getElementById("signupblock").style.display = "none";
      document.getElementById("forgotpasswordblock").style.display = "block";
    }

    // reset password for user
    submitForgotPassword(e) {
      e.preventDefault();
      firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
        alert("Reset link has been sent to your email!")
      }).catch(function (error) {
        alert("Uh-oh! Something went wrong")
      });
    }

    // login
    login(e) {
      e.preventDefault();

      if (typeof user[9] != 'undefined') {
        var i = 0;
        var email = this.state.email.toString().toLowerCase();

        if (!validate(email)) {
          alert("Email not valid bro");
        } else {
          while (i < emailArr.length) {
            console.log(emailArr[i], email, i);
            if (emailArr[i].toString() === email) {
              if (user[7].toString() === "yes") {
                alert("Account is banned. Please contact administrator.")
              } else {
                firebase.auth().signInWithEmailAndPassword(email, this.state.password).then((u) => {}).catch((error) => {
                  alert(error.message)
                })
                break;
              }
            } else if (i == emailArr.length - 1) {
              alert("Email not found yo");
              i++;
            } else {
              i++;
            }
          }
        }
      }
    }

    signup(e) {
      e.preventDefault();

      // checks for duplicate username
      var i = 0;
      var unameCheck = false;
      while (i < unameArr.length) {
        if (this.state.username === unameArr[i]) {
          alert("Username has already been registered");
          unameCheck = false;
          break;
        } else {
          unameCheck = true;
        }
        i++;
      }

      // checks confirm password
      if (this.state.password != this.state.repassword) {
        alert("Passwords do not match");
      } else {
        console.log(unameCheck);
        if (unameCheck) {
          firebase.auth().createUserWithEmailAndPassword(this.state.email.toString().toLowerCase(), this.state.password).then((u) => {}).then((u) => {
              const accountsRef = firebase.database().ref('accounts');
              const account = {
                fname: this.state.firstName,
                lname: this.state.lastName,
                uname: this.state.username,
                phone: this.state.phone,
                email: this.state.email.toString().toLowerCase(),
                isDriver: "no",
                isAdmin: "no",
                isBanned: "no",
                wallet: "0.00"
              }
              user = [];
              // after signup, stores user data into user
              user[0] = account.fname;
              user[1] = account.lname;
              user[2] = account.uname;
              user[3] = account.email;
              user[4] = account.phone;
              user[5] = account.isDriver;
              user[6] = account.isAdmin;
              user[7] = account.isBanned;
              user[8] = account.wallet;
              user[9] = account.key;

              accountsRef.push(account);
              this.state = {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                repassword: '',
                isDriver: '',
                isAdmin: '',
                isBanned: '',
                wallet: ''
              };

              // writing
              firebase.database().ref('admin/counter')
                .once('value')
                .then(function (snapshot) {
                  countArr[0] = emailArr.length+1;
                  console.log("rewrite: ", countArr[0]);
                  snapshot.ref.update({
                    acct: countArr[0]
                  });
                });
            })
            .catch((error) => {
              alert(error.message);
            })
        }
      }
    }

    extendsignup(e) {
      e.preventDefault();
      document.getElementById("signinblock").style.display = "none";
      document.getElementById("signupblock").style.display = "block";
      document.getElementById("forgotpasswordblock").style.display = "none";
    }

    cancel(e) {
      e.preventDefault();
      document.getElementById("signinblock").style.display = "block";
      document.getElementById("signupblock").style.display = "none";
      document.getElementById("forgotpasswordblock").style.display = "none";
    }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: '#fff', fontSize: 30, fontFamily: 'Helvetica', fontWeight: '600'}}>Welcome to SIMRide</Text>
        <Image source={logo} />
        <div>
          <form>
            <div id="signinblock">
              <br/>
              <br/>
              <input id="signinemail" value={this.state.email} onChange={this.handleChange} onBlur={this.checkEmail} type="email" name="email"
                placeholder="E-Mail (test@this.com)" />
              <input value={this.state.password} onChange={this.handleChange} type="password"
                name="password" placeholder="Password (shafiq)" style={{marginLeft: '15px'}} />
              <br/>
              <a onClick={this.forgotPass}>Forgot password?</a>
              <br />
              <br />
              <div id="div_SubmitSignIn" style={{textAlign: 'center'}}>
                <button type="submit" onClick={this.login}>Sign In</button>
                <button onClick={this.extendsignup} style={{marginLeft: '25px'}}>Sign Up</button>
              </div>
            </div>

            <div id="forgotpasswordblock" style={{display: 'none'}}>
              <br/>
              <br/>
              <input id="forgotemail" value={this.state.email} onChange={this.handleChange} onBlur={this.checkEmail} type="email" name="email"
                placeholder="E-Mail (test@this.com)" />
              <br/>
              <br/>
              <div style={{textAlign: 'center'}}>
                <button type="submit" onClick={this.submitForgotPassword}>Reset Password</button>
                <button type="submit" onClick={this.cancel}>Back</button>
              </div>
            </div>

            <div id="signupblock" style={{display: 'none'}}>
              <table>
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td><input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" />
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td><input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" />
                    </td>
                  </tr>
                  <tr>
                    <td>E-Mail</td>
                    <td><input value={this.state.email} onChange={this.handleChange} type="email" name="email" /></td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td><input value={this.state.phone} onChange={this.handleChange} type="phone" name="phone" /></td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td><input value={this.state.username} onChange={this.handleChange} type="text" name="username" />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td><input value={this.state.password} onChange={this.handleChange} type="password"
                        name="password" /></td>
                  </tr>
                  <tr>
                    <td>Re-Enter Password</td>
                    <td><input value={this.state.repassword} onChange={this.handleChange} type="password"
                        name="repassword" /></td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div style={{textAlign: 'center'}}>
                <button onClick={this.signup}>Submit</button>
                <button onClick={this.cancel} style={{marginLeft: '25px'}}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </View>
    );
  }
}

export default Login;
export { user }
