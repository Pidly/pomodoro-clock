'use client';
import { createRef, useEffect, useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import { TimerComponent } from './TimerComponent';
import { ControlsComponent } from './ControlsComponent';
import dayjs from 'dayjs';

export default function PomodoroContainer() {
    const breakLength = 5;
    const workLength = 30;

    const [breakMinutes, setBreakMinutes] = useState(breakLength);
    const [workMinutes, setWorkMinutes] = useState(workLength);

    const[label, setLabel] = useState("Work");

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
                var currSeconds = updateSeconds();
                updateMinutes();
                if (currentMinutes < 1 && currSeconds < 1) {
                    handleTimerComplete();
                }
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [paused, endDate, currentMinutes, currentSeconds, isOnBreak]);

    var updateSeconds = () => {        
        var nowSeconds = dayjs().unix();
        var endSeconds = endDate.unix();
        
        var difference = (endSeconds - nowSeconds) % 60;
        
        setCurrentSeconds(difference);
        return difference;
    }

    var updateMinutes = () => {
        var nowSeconds = dayjs().unix();
        var endSeconds = endDate.unix();
        
        var minutes = (endSeconds - nowSeconds) / 60;
        setCurrentMinutes(Math.floor(minutes));
    }

    var handleTimerComplete = () => {
        if(isOnBreak) {
            const audioElement = new Audio('hey_listen.mp3');
            audioElement.play();
            var newDate = dayjs().add(workMinutes, 'minute');
            setEndDate(newDate);
            setLabel("Work");
            setCurrentMinutes(workMinutes);
            setIsOnBreak(false);
        } else {
            const audioElement = new Audio('OOT_Secret.wav');
            audioElement.play();
            var newDate = dayjs().add(breakMinutes, 'minute');
            setEndDate(newDate);
            setIsOnBreak(true);
            setLabel("Break");
            setCurrentMinutes(breakMinutes);
        }
    }

    const timerStatusProps = {
        setCurrentMinutes: setCurrentMinutes,
        setCurrentSeconds: setCurrentSeconds,
        setBreakMinutes: setBreakMinutes,
        breakMinutes: breakMinutes,
        setWorkMinutes: setWorkMinutes,
        workMinutes: workMinutes,
        paused: paused,
        isOnBreak: isOnBreak
    };

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
                <WorkComponent {...timerStatusProps}/>
            </div>
            <TimerComponent minutes={currentMinutes} seconds={currentSeconds} label={label}/>
            <ControlsComponent setPaused={setPaused} setEndDate={setEndDate} minutes={currentMinutes} seconds={currentSeconds} paused={paused} setWorkMinutes={setWorkMinutes} workMinutes={workLength} setCurrentMinutes={setCurrentMinutes} breakMinutes={breakLength} setCurrentSeconds={setCurrentSeconds} setBreakMinutes={setBreakMinutes} setIsOnBreak={setIsOnBreak} setLabel={setLabel}/>
            
        </div>
    )
}