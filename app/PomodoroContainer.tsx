'use client';
import { useEffect, useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import { TimerComponent } from './TimerComponent';
import { ControlsComponent } from './ControlsComponent';
import dayjs from 'dayjs';
import { isPropertySignature } from 'typescript';

import { TimerStatusUpdater } from '../typings';
import { debug } from 'console';

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                updateSeconds();
                updateMinutes();
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [paused]);

    var updateSeconds = () => {        
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

    var updateMinutes = () => {
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

    /*
    Play Button:
    Set pause, set end date, current minutes/seconds.

    Pause button:
    Set pause

    Refresh Button:
    Set pause, set end date, set minutes/seconds.
    */
    return(
        <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column'
            }}>
            <h1 style={{marginTop: '0px'}}>Pomodoro Clock</h1>
            <div style={{display: 'flex', gap: '60px'}}>
                <BreakComponent {...timerStatusProps}/>
                <WorkComponent {...{setCurrentMinutes: setCurrentMinutes, setCurrentSeconds: setCurrentSeconds, currentMinutes: currentMinutes, setBreakMinutes: setBreakMinutes, breakMinutes: breakMinutes, setWorkMinutes: setWorkMinutes, workMinutes: workMinutes, paused: paused, isOnBreak: isOnBreak}}/>
            </div>
            <TimerComponent minutes={currentMinutes} seconds={currentSeconds}/>
            <ControlsComponent setPaused={setPaused} setEndDate={setEndDate} minutes={currentMinutes} seconds={currentSeconds} paused={paused}/>
        </div>
    )
}