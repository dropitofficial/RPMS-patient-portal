import { child, get, getDatabase, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { FireContext } from '../Config/Firebase'

const Measures = () => {
    
    const { userdetails } = useContext(FireContext)
    const [valueExists, setvalueExists] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showDate, setshowDate] = useState(new Date())
    const [dbDate, setdbDate] = useState(new Date().toLocaleDateString('en-GB').split("/").join("-"))
    const [values, setvalues] = useState([])

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/patients/${userdetails.uid}/values/${dbDate}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setvalues(snapshot.val())
            setvalueExists(true)
          } else {
            setvalueExists(false)
          }
        }).catch((error) => {
          console.error(error);
        });
    }, [dbDate])
    

    const changeDate = (e) => {
        setDate(e)
        setdbDate(e.toLocaleDateString('en-GB').split("/").join("-"))
    }

    return (
        <div>
            <div className='recentmeasures'>
                {

                    showDate.toDateString() == date.toDateString() ?
                        <h3 className='head3'>Today's Reading</h3>
                        :
                        <h3 className='head3'>{date.toDateString()}</h3>
                }
                {
                    valueExists ?
                        <div className='width100'>
                            <div className='valuediv'>
                                <div><b>Heart Rate</b></div>
                                <div className='val'><b>{values[0]} bpm</b></div>
                            </div>
                            <div className='valuediv'>
                                <div><b>SpO2</b></div>
                                <div className='val'><b>{values[1]} %</b></div>
                            </div>
                            <div className='valuediv'>
                                <div><b>Body Temperature</b></div>
                                <div className='val'><b>{values[2]} °F</b></div>
                            </div>
                            <div className='valuediv'>
                                <div><b>Atmospheric Temperature</b></div>
                                <div className='val'><b>{values[3]} °C</b></div>
                            </div>
                            <div className='valuediv'>
                                <div><b>Atmospheric Humidity</b></div>
                                <div className='val'><b>{values[4]} °C</b></div>
                            </div>
                        </div>
                        :
                        <div className='valuediv'>
                            <div className='val'><b>No Records Found</b></div>
                        </div>
                }
            </div>
            <div className='calander'>
                <Calendar onChange={changeDate} value={date} />
            </div>
        </div>
    )
}

export default Measures