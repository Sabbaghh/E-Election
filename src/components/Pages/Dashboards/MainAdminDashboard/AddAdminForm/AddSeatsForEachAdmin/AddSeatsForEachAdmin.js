import React from 'react';

const AddSeatsForEachAdmin = () => {
    return (
        <>
            <div className='Add-admin-email'>
                <div className='icon'>
                    <i class="fas fa-chair"></i>
                </div>
                <input type="number" min='1' max='6' />
            </div>

            <div className='submitAndCancel'>
                <button className='SubmitButton'> SAVE</button>
                <div className='CancelButton btn'> CANCEL</div>
            </div>
        </>
    );
};

export default AddSeatsForEachAdmin;