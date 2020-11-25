import React, { useState, useContext, useEffect } from 'react';
import Spinner from '../../Spinners/Spinner';
import { AuthContext } from '../../../../Auth/context/AuthContext';
import { ProjectFireStore } from '../../../../FireBase/fireBase'
import { DashboardContext } from '../../../Dashboards/MainAdminDashboard/MainAdminDashBoard';
import './AddAdminForm.css'

const AddAdminForm = () => {
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const signup = useContext(AuthContext).signup;
    const currentUser = useContext(AuthContext).currentUser;
    const { currentCollege } = useContext(DashboardContext);
    console.log(currentCollege);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailValue = email;
        let passwordValue = password;
        console.log(emailValue);
        try {
            setError('');
            setLoading(true);
            await signup(emailValue, passwordValue);

        } catch {
            setError('failed');
        }
        ProjectFireStore
            .collection('Admins')
            .doc(emailValue)
            .set({ Name: emailValue, collegeName: currentCollege })
            .then(res => setLoading(false))
            .catch(err => setError(err));

        setLoading(false);
    }
    const onCancel = () => {
        setEmail('');
        setPassword('');
        setToggle(false);
    }
    useEffect(() => {
        console.log(currentUser);
    })

    return (
        <div className='AddAdminForm'>
            <form onSubmit={(e) => handleSubmit(e)}>
                {loading && <Spinner />}
                <div className='Add-admin-email'>
                    <div className='icon'>
                        <i className="fas fa-users-cog"></i>
                    </div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        value={email}
                        disabled={!toggle} />
                    <div
                        className='custom-button btn'
                        onClick={() => setToggle(!toggle)}>
                        <i className="fas fa-edit"></i></div>
                </div>

                {
                    toggle &&
                    <div className='password-gen'>
                        <div className='icon'>
                            <i className="fas fa-key"></i>
                        </div>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={show ? 'text' : 'password'}
                            value={password} />
                        <div className='custom-button btn'
                            onClick={() => setShow(!show)}>
                            <i className="fas fa-eye-slash"></i>
                        </div>
                    </div>
                }
                <div className='submitAndCancel'>
                    <button className='SubmitButton'> SAVE</button>
                    <div onClick={() => onCancel()} className='CancelButton btn'> CANCEL</div>
                </div>
                {error && <h1 style={{ margin: '10px', color: '#d62828' }}>{error}</h1>}

            </form>
        </div>

    );
};

export default AddAdminForm;