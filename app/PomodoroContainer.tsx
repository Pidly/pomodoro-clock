'use client';
import { useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import TimerComponent from './TimerComponent';
import ControlsComponent from './ControlsComponent';
import dayjs from 'dayjs';

export default function PomodoroContainer() {
    const breakLenghth = 5;
    const workLength = 30;

    const [breakMinutes, setBreakMinutes] = useState(breakLenghth);
    const [workMinutes, setWorkMinutes] = useState(workLength);

    const [nowDate, setNowDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(workLength, 'minute'));

    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(workLength);

    const [paused, setPaused] = useState(true);

    var seconds = () => {
        if (!paused) {
            var endSeconds = endDate.unix();
            var nowSeconds = dayjs().unix();

            var difference = (endSeconds - nowSeconds) % 60;

            setTotalSeconds(difference);
        }
    }

    var minutes = () => {
        if (!paused) {
            var endSeconds = endDate.unix();
            var nowSeconds = dayjs().unix();

            var minutes = (endSeconds - nowSeconds) / 60;
            setTotalMinutes(Math.floor(minutes));
        }
    }

    setInterval(seconds, 1000);
    setInterval(minutes, 1000);

    return(
        <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column'
            }}>
            <h1 style={{marginTop: '0px'}}>Pomodoro Clock</h1>
            <p>{totalMinutes}:{totalSeconds}</p>
            <div style={{display: 'flex', gap: '60px'}}>
                <BreakComponent />
                <WorkComponent />
            </div>
            <TimerComponent />
            <ControlsComponent />
        </div>
    )
}