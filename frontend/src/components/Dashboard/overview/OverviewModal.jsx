import { useState } from 'react';
import '../../../styles/components/dashboard/overview/overview-modal.scss';
import rightArrow from '../../../assets/right-arrow.svg';
import mintImg from '../../../assets/dashboard/create-certificate/steps/form-mint-placeholder.svg';
import { withdrawProfits } from '../../../certificate/cert';
function OverviewModal({closeModal}){
    //Checks if the user inputs a letter instead of a number
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const newValue = e.target.value;
      
      if (/^\d*$/.test(newValue)) {
        setValue(newValue);
        setError(""); // Clear error if input is valid
      } else {
        setError("Only numbers are allowed!");
      }
    };
    return(
        <section className="overview-modal">
            <div className="modal">
                <h1>Withdraw earnings</h1>
                <div className='modal-withdraw'>
                    <label>
                        Withdrawal amount
                        <input type="text" placeholder='$700' onChange={handleChange}/>
                        {error && <p style={{ color: "red", margin: 0}}>{error}</p>}
                        <img src={mintImg} alt="a mint icon" />
                    </label>
                    <div className='modal-balance'>
                        <p>Available balance</p>
                        <p>$178.56</p>
                    </div>
                </div>
                {/*Set the withdrawProfits function here */}
                <button onClick={withdrawProfits ? closeModal : null}>
                    Withdraw
                    <img src={rightArrow} alt="a right arrow icon" />
                </button>
            </div>
        </section>
    )
}
export default OverviewModal