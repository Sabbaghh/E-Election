import React from 'react';

const ConfigPage = () => {
    return (
        <div className='config-page'>
            <form className='AnyItem-container' style={{ border: 'none' }}>
                <div>
                    <h3>START DATE:</h3>
                    <div className='anyitem-container-row'>
                        <div className='icon'>
                            <i className="fas fa-hourglass-start"></i>
                        </div>
                        <input type="date" />
                    </div>
                </div>
                <div>
                    <h3>END DATE:</h3>
                    <div className='anyitem-container-row'>
                        <div className='icon'>
                            <i className="fas fa-hourglass-end"></i>
                        </div>
                        <input type="date" />
                    </div>
                </div>
                <div>
                    <h3>NUMBER OF TOTAL SEATS:</h3>
                    <div className='anyitem-container-row'>
                        <div className='icon'>
                            <i className="fas fa-chair"></i>
                        </div>
                        <input type="number" min='1' />
                    </div>
                </div>
                <div className='submitAndCancel'>
                    <button className='SubmitButton btn'> SAVE</button>
                    <div className='CancelButton btn'> CANCEL</div>
                </div>
            </form>
        </div>


    );
};

export default ConfigPage;