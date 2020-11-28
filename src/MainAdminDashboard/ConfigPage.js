import React, { useEffect, useState } from 'react';
import { ProjectFireStore, TimeStamps } from '../FireBase/fireBase'

const ConfigPage = () => {

    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(0);
    const [TotalNumberOfSeats, setTotalNumberOfSeats] = useState(0);
    const [Toggle, setToggle] = useState(true);
    const [startDateTimeStamps, setStartDateTimeStamps] = useState(0);
    const [endDateTimeStamps, setEndDateTimeStamps] = useState(0);
    const onReset = () => {
        setStartDate('yyyy-MM-dd');
        setEndDate('yyyy-MM-dd');
        setTotalNumberOfSeats(70);
    }
    const onConfirm = (e) => {
        e.preventDefault();
        let startDateTimeStamp = TimeStamps.fromDate(new Date(StartDate));
        let endDateTimeStamp = TimeStamps.fromDate(new Date(EndDate));
        if (startDateTimeStamp > endDateTimeStamp) {
            alert('the end date is earlier than the end date')
        } else {
            ProjectFireStore.collection('Config').doc('Date')
                .set({
                    StartDate: TimeStamps.fromDate(new Date(StartDate)),
                    EndDate: TimeStamps.fromDate(new Date(EndDate))
                })
            ProjectFireStore.collection('Config').doc('NSeatTotal').set({
                Number: TotalNumberOfSeats
            })
            setToggle(false);
        }
    }


    useEffect(() => {
        const getData = async () => {
            await ProjectFireStore.collection('Config').doc('Date').get().then(res => {
                try {
                    let unix_timestampEndDate = res.data()['EndDate']['seconds'];
                    let endDate = new Date(unix_timestampEndDate * 1000);
                    setEndDateTimeStamps(endDate);
                    let unix_timestampstartDate = res.data()['StartDate']['seconds'];
                    let StartDate = new Date(unix_timestampstartDate * 1000);
                    setStartDateTimeStamps(StartDate);
                    setToggle(false)
                } catch {
                    setToggle(true);
                }
            })
        }
        return getData();

    }, [Toggle])

    return (
        <div className='config-page'>
            <form className='AnyItem-container' onSubmit={(e) => onConfirm(e)}
                style={{ border: 'none' }}>
                {Toggle &&
                    <>
                        <div>
                            <h3>START DATE:</h3>
                            <div className='anyitem-container-row'>
                                <div className='icon'>
                                    <i className="fas fa-hourglass-start"></i>
                                </div>
                                <input type="datetime-local"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={StartDate} required />
                            </div>
                        </div>
                        <div>
                            <h3>END DATE:</h3>
                            <div className='anyitem-container-row'>
                                <div className='icon'>
                                    <i className="fas fa-hourglass-end"></i>
                                </div>
                                <input type="datetime-local"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={EndDate} required />
                            </div>
                        </div>
                        <div>
                            <h3>NUMBER OF TOTAL SEATS:</h3>
                            <div className='anyitem-container-row'>
                                <div className='icon'>
                                    <i className="fas fa-chair"></i>
                                </div>
                                <input type="number" min='1'
                                    onChange={(e) => setTotalNumberOfSeats(e.target.value)}
                                    value={TotalNumberOfSeats} required />
                            </div>
                        </div>
                        <div className='submitAndCancel'>
                            <button className='SubmitButton btn'> SAVE</button>
                            <div onClick={() => onReset()} className='CancelButton btn'> RESET</div>
                        </div>
                    </>
                }
                {
                    !Toggle &&
                    <>
                        <div>
                            <h3>START DATE:<h5>{startDateTimeStamps.toString()}</h5></h3>
                            <br />
                            <hr />
                            <br />
                            <h3>END DATE:<h5>{endDateTimeStamps.toString()}</h5></h3>
                        </div>
                    </>
                }
            </form>
        </div>
    );
};

export default ConfigPage;