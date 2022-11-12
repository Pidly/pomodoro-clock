export default function TimerComponent() {
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
            <p style={{marginBottom: '0px'}}>Session</p>
            <p style={{fontSize: '60px', margin: '0px'}}>26:57</p>
        </div>
    )
}