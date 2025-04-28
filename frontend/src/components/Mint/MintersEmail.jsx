import rightArrow from '../../assets/right-arrow.svg';
import '../../styles/components/mint/mint-pages.scss'
import emailPlaceholder from '../../assets/dashboard/create-certificate/steps/form-certificate-placeholder.svg';

function MintersEmail({mintData, nextStep, setMintData}){
    // Function to handle input field changes
    const handleChange = (e) => {
        setMintData({ ...mintData, [e.target.name]: e.target.value });
    };
    return(
        <div className='mint-body-pages mint-email-body'>
            <div className='mint-title-pages mint-email-title'>
                <h1>Input your email address</h1>
                <label>
                    <input type="text" placeholder='xertis@gmail.com' name="mintersEmail" value={mintData.mintersEmail} onChange={handleChange} />
                    <img src={emailPlaceholder} alt="a placeholder for the email input" />
                </label>
            </div>
            <button onClick={nextStep} className='advance'>
                Continue
                <img src={rightArrow} alt="a right arrow icon" />
            </button>
        </div>
    )
}
export default MintersEmail