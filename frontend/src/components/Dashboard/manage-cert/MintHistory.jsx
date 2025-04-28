import { useState } from 'react';
import certificatePlaceholder from '../../../assets/dashboard/manage-cert/certificate-placeholder.svg';
import '../../../styles/components/dashboard/manage-cert/mint-history.scss';
import threeDots from '../../../assets/dashboard/manage-cert/three-dots.svg';
import toast from "react-hot-toast";
import copyIcon from '../../../assets/dashboard/create-certificate/steps/generate-url/copy-icon.svg';
import editIcon from '../../../assets/dashboard/manage-cert/edit-icon.svg';
import deleteIcon from '../../../assets/dashboard/manage-cert/delete-icon.svg';

const mint = [
    {name: 'LG OLED', minters: '255', link: 'certificate.com/xertis'},
    {name: 'Amazon Class', minters: '255', link: 'certificate.com/xertis'},
    {name: 'Gucci Fashion', minters: '255', link: 'certificate.com/xertis'}
]
const mintValue = []
for(let i = 0; i < 20; i++){
    const random = Math.floor(Math.random() * mint.length);
    mintValue.push(mint[random])
}


function MintHistory(){

     // Manage mintValue state
     const [mintValue, setMintValue] = useState(
        Array.from({ length: 20 }, () => mint[Math.floor(Math.random() * mint.length)])
    );
    const copyDivText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Copied to clipboard!');
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };
    const deleteItem = (index) => {
        setMintValue((prevMintValue) => prevMintValue.filter((_, i) => i !== index));
    };
    return(
        <div className="mint-history">
            {mintValue.map((value, index) => (
                <div className="mint-history-item" key={index}>
                    <div className='mint-item-name'>
                        <input type="checkbox" value={value} className='d-none d-lg-block'/>
                        <img src={certificatePlaceholder} alt="a mini certificate" />
                        <p>{value.name}</p>
                    </div>
                    <div className='mint-number'>
                        <p>{value.minters}</p>
                    </div>
                    <div className='mint-item-right-section'>
                        <div className='share-certificate-link-div'>
                            <p className='link-placeholder d-none d-lg-block'>{value.link}</p>
                            <div className='copy-tag' onClick={() => copyDivText(value.link)}>
                                <p>Copy</p>
                                <img src={copyIcon} alt="copy icon" />
                            </div>
                        </div>
                        <div class="btn-group dropup edit-button">
                            <button type="button" class="btn three-dots" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={threeDots} alt='three dots icon'/>
                            </button>
                            <ul class="dropdown-menu">
                                <li className='dropdown-item'>
                                    <img src = {editIcon} alt="edit icon" />
                                    Edit Certificate
                                </li>
                                <li className='dropdown-item' onClick={() => deleteItem(index)}>
                                    <img src={deleteIcon} alt="delete icon" />
                                    Delete Certificate
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default MintHistory;