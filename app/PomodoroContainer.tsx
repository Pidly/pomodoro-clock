'use client';
import { createRef, useEffect, useState } from 'react';
import BreakComponent from './BreakComponent';
import WorkComponent from './WorkComponent';
import { TimerComponent } from './TimerComponent';
import { ControlsComponent } from './ControlsComponent';
import dayjs from 'dayjs';
import { isPropertySignature } from 'typescript';

import { TimerStatusUpdater } from '../typings';
import { debug } from 'console';

import heyListen from '../public/hey_listen.mp3';

export default function PomodoroContainer() {
    const breakLength = 1;
    const workLength = 0;

    const [breakMinutes, setBreakMinutes] = useState(breakLength);
    const [workMinutes, setWorkMinutes] = useState(workLength);

    const[label, setLabel] = useState("Work");

    const [nowDate, setNowDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(workMinutes, 'minute'));
    const [breakEndDate, setBreakEndDate] = useState(dayjs().add(breakLength, 'minute'));

    const [currentSeconds, setCurrentSeconds] = useState<number>(5);
    const [currentMinutes, setCurrentMinutes] = useState<number>(workMinutes);

    const [paused, setPaused] = useState(true);
    const [isOnBreak, setIsOnBreak] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                var currSeconds = updateSeconds();
                updateMinutes();
                console.log("M: " + currentMinutes + " S:" + currSeconds);
                if (currentMinutes < 1 && currSeconds < 1) {
                    handleTimerComplete();
                }
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [paused, endDate, currentMinutes, currentSeconds, isOnBreak]);
    //breakminutes next
    var updateSeconds = () => {        
        var nowSeconds = dayjs().unix();
        var endSeconds = 0;

        if (!isOnBreak) {
            endSeconds = endDate.unix();
        } else {
            //endSeconds = breakEndDate.unix();
            endSeconds = endDate.unix();
        }

        var difference = (endSeconds - nowSeconds) % 60;
        console.log("endS: " + endSeconds + " nowS:" + nowSeconds + " dif:" + difference);
        
        setCurrentSeconds(difference);
        return difference;
    }

    var updateMinutes = () => {
        var nowSeconds = dayjs().unix();
        var endSeconds = 0;

        if (!isOnBreak) {
            endSeconds = endDate.unix();
        } else {
            endSeconds = endDate.unix();
            //endSeconds = breakEndDate.unix();
        }

        var minutes = (endSeconds - nowSeconds) / 60;
        setCurrentMinutes(Math.floor(minutes));
    }

    var handleTimerComplete = () => {
        console.log("Handle Complete - M: " + currentMinutes + " S:" + currentSeconds);
        
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
        console.log("Handle Complete END - M: " + currentMinutes + " S:" + currentSeconds);
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
            <TimerComponent minutes={currentMinutes} seconds={currentSeconds} label={label}/>
            <ControlsComponent setPaused={setPaused} setEndDate={setEndDate} minutes={currentMinutes} seconds={currentSeconds} paused={paused}/>
            
        </div>
    )
}