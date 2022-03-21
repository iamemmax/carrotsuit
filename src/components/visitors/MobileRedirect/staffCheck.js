import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
// import { signin, signout } from "../../actions/staffActions";
import { signin, signout } from "../../../actions/staffActions";

export default function StaffCheck() {
  const [id, setId] = useState([]);

  const idChange = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const handleSignIn = async () => {
    if (id.length === 0) {
      alert("id is required");
      //  setAlertColor('red')
      //   setShowModal(true)
      //   setData({
      //   ...data,
      //           errors: "id is required",
      //         });

      return;
    }

    signin(id)
      .then((message) => {
        if (message) {
          if (message === "Signed in successfully!") {
            alert("Signed in successfully!");
            //   setAlertColor('green')
            //     setShowModal(true)

            //       setData({
            //       ...data,
            //                   errors:  message ,
            //       });

            //      setTimeout(() => {
            //                             navigation.navigate("Dashboard");

            //                      }, timeOut)

            //                navigation.navigate("VisitorDashboardScreen");
          } else if (message === "You have been previously checked In") {
            alert("You have been previously checked In");
            //   setAlertColor('red')
            //     setShowModal(true)

            //       setData({
            //       ...data,
            //                   errors:  message ,
            //       });
          } else {
            alert(message);

            //  setAlertColor('red')
            //       setShowModal(true)

            //       setData({
            //        ...data,
            //            errors: message,
            //          });
          }
          //             setAlertColor('red')
          //               setShowModal(true)
          //
          //                 setData({
          //                 ...data,
          //                             errors:  message ,
          //                 });

          //              setTimeout(() => {
          //
          //                     if(message === 'Signed in successfully!'){
          //                     setAlertColor('green')
          //
          //                        navigation.navigate("VisitorDashboardScreen");
          //
          //                         }
          //
          //
          //                 }, 5000)
        }
      })
      .catch((err) => {
        alert(err.response.data);

        //          setAlertColor('red')
        //        setShowModal(true)

        //    setData({
        //                errors: err.response.data,
        //              });
      });
  };

  const handleSignOut = () => {
    if (id.length === 0) {
      alert("id is required");

      // setAlertColor('red')
      // setShowModal(true)
      //   setData({
      //   ...data,
      //     errors:  "id is required",
      //   });

      return;
    }

    signout(id)
      .then((message) => {
        if (message) {
          if (message === "You have been previously checked out") {
            alert(message);

            //    setAlertColor('red')
            //    setShowModal(true)

            //    setData({
            //     ...data,
            //         errors: message,
            //       });
            //           navigation.navigate("VisitorDashboardScreen");
          } else if (message === "Signed Out successfully!") {
            alert(message);

            //   setAlertColor('green')
            //               setShowModal(true)
            //   setData({
            //    ...data,
            //        errors: message,
            //      });

            // setTimeout(() => {
            //         navigation.navigate("Dashboard");

            //  }, timeOut)
          } else {
            alert(message);
            // setAlertColor('red')
            //      setShowModal(true)

            //      setData({
            //       ...data,
            //           errors: message,
            //         });
          }
        }
      })
      .catch((err) => {
        alert(err.response.data);

        //      setAlertColor('red')
        //    setShowModal(true)

        //   setData({
        //   ...data,
        //       errors: `${err.response.data}`
        //     });
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div>Staff ID</div>
          <div>
            {" "}
            <input
              style={{ border: "2px solid black" }}
              onChange={(e) => idChange(e)}
              className="form-control"
            />{" "}
          </div>

          <div className="row">
            <button className="button btnChk1" onClick={handleSignIn}>
              Check In{" "}
            </button>
            <button className="button btnChk1" onClick={handleSignOut}>
              Check Out
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
