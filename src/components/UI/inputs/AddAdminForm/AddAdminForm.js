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
    const [currentData, setCurrentData] = useState('');
    const signup = useContext(AuthContext).signup;
    const { currentCollege } = useContext(DashboardContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailValue = email;
        let passwordValue = password;
        //signup with firebase Auth
        try {
            setError('');
            setLoading(true);
            await signup(emailValue, passwordValue);

        } catch {
            setError('failed');
        }
        //save emails to admins collections
        ProjectFireStore
            .collection('Admins')
            .doc(emailValue)
            .set({ Name: emailValue, collegeName: currentCollege })
            .then(() => setLoading(false))
            .catch(err => setError(err));
        //save AdminEmail to ech college
        ProjectFireStore
            .collection('Collage')
            .doc(currentCollege)
            .set({ ...currentData, AdminEmail: emailValue })
            .then(res => setLoading(false))
            .catch(err => setError(err));
        setLoading(false);
    }


    useEffect(() => {
        //get the lost data to save them from getting lost &
        //set the email into email hook if it exists in dataBase
        ProjectFireStore
            .collection('Collage')
            .doc(currentCollege)
            .get().then(res => {
                setCurrentData(res.data())
                if (res.data()["AdminEmail"]) {
                    setEmail(res.data()['AdminEmail']);
                    setToggle(false);
                } else {
                    setToggle(true);
                    setEmail('');
                    setPassword('');
                }
            });
    }, [currentCollege])

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
                    {/* tou can't edit if you have no email to edit! */}
                    {
                        !toggle &&
                        <div
                            className='custom-button btn'
                            onClick={() =>
                                email ?
                                    setToggle(!toggle) :
                                    alert('please enter email and password')}>
                            <i className="fas fa-edit"></i></div>
                    }
                </div>
                {/* if you already have an account setup you dont need password input nor buttons */}
                {
                    toggle &&
                    <>
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

                        <div className='submitAndCancel'>
                            <button className='SubmitButton'> SAVE</button>
                            <div
                                onClick={() =>
                                    email && password ?
                                        setToggle(false) :
                                        alert('Please enter Email and Password')}
                                className='CancelButton btn'> CANCEL</div>
                        </div>
                    </>
                }

                {error && <h1 style={{ margin: '10px', color: '#d62828' }}>{error}</h1>}
            </form>
        </div >
    );
};

export default AddAdminForm;