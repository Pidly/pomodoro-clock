'use client';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import TimerComponent from './TimerComponent';
import ControlsComponent from './ControlsComponent';

export default function PomodoroContainer() {
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [workMinutes, setWorkMinutes] = useState(25);

    return(
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column'
            }}>
            Pomodoro Container
            <div style={{display: 'flex'}}>
                <BreakComponent />
                <WorkComponent />
            </div>
            <TimerComponent />
            <ControlsComponent />
        </div>
    )
}