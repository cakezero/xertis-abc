import '../../../styles/pages/Landing_Page/share-certificate.scss';
import copyIcon from '../../../assets/dashboard/create-certificate/steps/generate-url/copy-icon.svg';
import toast from "react-hot-toast";
import { useUser } from "../../../provider/useUser";
import { CLIENT } from '../../../constants/constants';

//This block of code is a function to copy the link to the clipboard, tested and trusted
function copyDivText() {
    const text = document.getElementById("textToCopy").innerText;
    navigator.clipboard.writeText(text).then(() => {
      setTimeout(() => {
        toast.success('copied');
      }, 1500);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  }

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("clear-button")) {
        event.target.previousElementSibling.value = ""; // Clear the input
    }
});

//This block of code is a function that deletes or removes the text in the label element;
document.querySelectorAll('.input-certificate').forEach(container => {
    const input = container.querySelector('.input-text');
    const clearBtn = container.querySelector('.clear-button');
    clearBtn.addEventListener("click", () => {
        input.value = "";
        console.log('fisj')
    });
})

function ShareCertificate() {
    const mintId = localStorage.getItem("mintId");
    const mintLink = `${CLIENT}/claim/${mintId}`;
    return(
        <div className="share-certificate">
            <div className='share-certificate-header'>
            <h2>Share Certificate</h2>
            <p>
                Share the minting link and let recepients claim their block-chain verified certificates with ease
                </p>
            </div>
            
            <hr />

            <div className='share-certificate-email'>
            <p className='share-certificate-email-header'>Email</p>

            <div className='share-certificate-email-invite'>
                <div className='share-certificate-inputs'>
                    <div className='input-certificate'>
                        <input type="text" placeholder='Label' className='input-text'/>
                        <button className='clear-button'>X</button>
                    </div>
                    <div className='input-certificate'>
                        <input type="text" placeholder='Label' className='input-text'/>
                        <button className='clear-button'>X</button>
                    </div>
                    <p>Bob</p>
                </div>     
                <button className='share-invite-button'>Send Invite</button>
            </div>

            <div className='share-certificate-specify'>
                <p>Anyone with the link</p>
                <select className="form-select custom-arrow specify-share-select" aria-label="Small select example">
                <option selected>Can view</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>
                <span class="position-absolute top-50 end-0 translate-middle-y pe-2">
                ▼
                </span>
            </div>
            </div>

            <hr />

            <div className='share-certificate-link'>
            <h2>Share read-only link</h2>
            <div className='share-certificate-link-div'>
                <p className='link-placeholder' id='textToCopy'>{mintLink}</p>
                <div className='copy-tag' onClick={() => copyDivText()}>
                <p>Copy</p>
                <img src={copyIcon} alt="copy icon" />
                </div>
            </div>
            </div>
        </div>
    )
}
export default ShareCertificate