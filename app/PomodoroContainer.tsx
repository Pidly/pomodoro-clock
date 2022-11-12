'use client';
import { useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import { TimerComponent } from './TimerComponent';
import ControlsComponent from './ControlsComponent';
import dayjs from 'dayjs';
import { isPropertySignature } from 'typescript';

import { TimerStatusUpdater } from '../typings';

export default function PomodoroContainer() {
    const breakLength = 5;
    const workLength = 30;

    const [breakMinutes, setBreakMinutes] = useState(breakLength);
    const [workMinutes, setWorkMinutes] = useState(workLength);

    const [nowDate, setNowDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(workMinutes, 'minute'));
    const [breakEndDate, setBreakEndDate] = useState(dayjs().add(breakLength, 'minute'));

    const [currentSeconds, setCurrentSeconds] = useState<number>(0);
    const [currentMinutes, setCurrentMinutes] = useState<number>(workMinutes);

    const [paused, setPaused] = useState(true);
    const [isOnBreak, setIsOnBreak] = useState(false);

    var seconds = () => {
        if (!paused) {
            var nowSeconds = dayjs().unix();
            var endSeconds = 0;

            if (!isOnBreak) {
                endSeconds = endDate.unix();
            } else {
                endSeconds = breakEndDate.unix();
            }

            var difference = (endSeconds - nowSeconds) % 60;
            setCurrentSeconds(difference);
        }
    }

    var minutes = () => {
        if (!paused) {
            var nowSeconds = dayjs().unix();
            var endSeconds = 0;

            if (!isOnBreak) {
                endSeconds = endDate.unix();
            } else {
                endSeconds = breakEndDate.unix();
            }

            var minutes = (endSeconds - nowSeconds) / 60;
            setCurrentMinutes(Math.floor(minutes));
        }
    }

    setInterval(seconds, 1000);
    setInterval(minutes, 1000);

    const addWorkMinute = () => {
        if (paused) {
            var newMinutes = workMinutes + 1;
            if (!isOnBreak) {
                setWorkMinutes(newMinutes);
                setCurrentSeconds(0);
                setCurrentMinutes(newMinutes)
            } else {
                setWorkMinutes(newMinutes);
            }
        }
    }

    const timerStatusProps = {
        setCurrentMinutes: setCurrentMinutes,
        setCurrentSeconds: setCurrentSeconds,
        currentMinutes: currentMinutes,
        setBreakMinutes: setBreakMinutes,
        breakMinutes: breakMinutes,
        setWorkMinutes: setWorkMinutes,
        workMinutes: workMinutes,
        paused: paused,
        isOnBreak: isOnBreak
    };

    //minute, seconds, isPaused, isonbreak, workminutes
    return(
        <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column'
            }}>
            <h1 style={{marginTop: '0px'}}>Pomodoro Clock</h1>
            <p>{currentMinutes}:{currentSeconds}</p>
            <div style={{display: 'flex', gap: '60px'}}>
                <BreakComponent {...timerStatusProps}/>
                <WorkComponent {...{setCurrentMinutes: setCurrentMinutes, setCurrentSeconds: setCurrentSeconds, currentMinutes: currentMinutes, setBreakMinutes: setBreakMinutes, breakMinutes: breakMinutes, setWorkMinutes: setWorkMinutes, workMinutes: workMinutes, paused: paused, isOnBreak: isOnBreak}}/>
            </div>
            <TimerComponent minutes={currentMinutes} seconds={currentSeconds}/>
            <ControlsComponent />
        </div>
    )
}