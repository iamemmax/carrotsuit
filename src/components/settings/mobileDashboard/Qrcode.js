import React, { useState, useEffect } from "react";
import { getQRState, qrcodeSelection } from "../../../actions/settingsActions";
import { ToggleButton } from "../configs/customizeFormFields/ToggleButton";

export default function Qrcode() {
  const [toogleState, setToogleState] = useState(false);
  const [qrcodeOption, setqrcodeOption] = useState("false");

  const [qrcode, setqrcode] = useState("false");

  const handleSelection = () => {
    //  setqrcodeOption('false')
    qrcodeSelection(!toogleState);
  };

  useEffect(() => {
    getQRState().then((data) => {
      if (data.qrcode_option === "0") {
        console.log(typeof data.qrcode_option, "ooopp");
        if (data) {
          setToogleState(false);
        }
      } else {
        console.log(typeof data.qrcode_option, "ooopp");
        if (data) {
          setToogleState(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    // console.log(qrcodeOption, 'uuuu')
    console.log(toogleState, "toggguuuu");
  }, [toogleState]);

  useEffect(() => {
    console.log(qrcodeOption, "uuuu");
    // console.log(toogleState, 'toggguuuu')
  }, [qrcodeOption]);

  useEffect(() => {}, [qrcode]);

  return (
    <div>
      <div>Enable Qrcode</div>
      <div>
        <ToggleButton
          selected={toogleState}
          toggleSelected={() => {
            setToogleState(!toogleState);

            if (toogleState == true) {
              setqrcode("true");
              setqrcodeOption("true");
              handleSelection();
            } else {
              setqrcode("false");
              setqrcodeOption("false");
              handleSelection();
            }

            //   setToggleSelectName(!toggleSelectName)
            // toggleSelectName? settoggleValueName('') : settoggleValueName('name')

            //   const formData = [{
            //     field:this.state.role

            //     }
            //   ]

            //   this.state.selectedRole? interviewRole(formData) : interviewRole(formData)
            //  console.log(this.state.role)
          }}
        />

        {/* <div><Button onClick={handleSelection} >Apply</Button></div> */}
      </div>
    </div>
  );
}
