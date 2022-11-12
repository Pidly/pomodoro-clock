'use-client';
import React from 'react';

type TimerProps = {
    minutes: number;
    seconds: number;
    label: string;
}

export const TimerComponent = ({minutes, seconds, label='Session'}: TimerProps) => {

    const getSecondsStr = () => {
        if (seconds < 10) {
            return "0" + seconds;
        } else {
            return seconds;
        }
    }

    const getMinutesStr = () => {
        if (minutes < 10) {
            return "0" + minutes;
        } else {
            return minutes;
        }
    }

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column',
            border: '4px solid limegreen',
            padding: '10px 40px',
            borderRadius: '40px',
            marginTop: '15px'
        }}>
            <p style={{margin: '0px'}}>{label}</p>
            <p style={{fontSize: '60px', margin: '0px'}}>{getMinutesStr()}:{getSecondsStr()}</p>
        </div>
    )
}