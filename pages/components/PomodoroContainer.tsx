import styles from '../../styles/Home.module.css';
import { useState } from 'react';

export default function PomodoroContainer() {
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [workMinutes, setWorkMinutes] = useState(25);

    return(
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

        </div>
    )
}