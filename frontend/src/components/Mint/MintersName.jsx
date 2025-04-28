import '../../styles/components/mint/mint-pages.scss'
import rightArrow from '../../assets/right-arrow.svg';
import namePlaceholder from '../../assets/dashboard/create-certificate/steps/form-certificate-placeholder.svg';
function MintersName({mintData, setMintData, nextStep}){
    // Function to handle input field changes
    const handleChange = (e) => {
        setMintData({ ...mintData, [e.target.name]: e.target.value });
    };
    return(
        <div className="mint-body-pages mint-name-body">
            <div className="mint-title-pages mint-name-title">
                <h1>Enter your full name</h1>
                <label>
                    <input type="text" placeholder='John Doe' name="mintersName" value={mintData.mintersName} onChange={handleChange} />
                    <img src={namePlaceholder} alt="a placeholder for the email input" />
                </label>
            </div>
            <button onClick={nextStep} className='advance'>
                Continue
                <img src={rightArrow} alt="a right arrow icon" />
            </button>
        </div>
    )
}

export default MintersName