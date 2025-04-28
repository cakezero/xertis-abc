import rightArrow from '../../assets/right-arrow.svg';
import '../../styles/components/mint/mint-pages.scss'
function MintIntro({nextStep}){
    return(
        <div className='mint-body-pages'>
            <div className='mint-title-pages'>
                <h1>Welcome to Xertis!</h1>
                <p>
                    You're just a few steps away from claiming your blockchain-powered certificate. Let's get started-Ready to mint your certificate? Let's go! 
                </p>
            </div>
            <button onClick={nextStep} className='advance'>
                Get started
                <img src={rightArrow} alt="a right arrow icon" />
            </button>
        </div>
    )
}

export default MintIntro