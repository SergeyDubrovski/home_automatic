
import { useTimer } from 'react-timer-hook';

type Props = {
    expiryTimestamp : Date
    setLight: (light:boolean) => void
}




function MyTimer({ expiryTimestamp, setLight }: Props) {
  const {
    
    seconds,
    minutes
  
  } = useTimer({ expiryTimestamp, onExpire: () => {setLight(false) }});
    
  
  return (
    <div style={{textAlign: 'center'}}>
      
      <div style={{fontSize: '60px'}}>
       <span>{minutes}</span>:<span>{(seconds<10)? '0' : '' }{seconds}</span>
      </div>
    
      
    </div>
  );
}


export default MyTimer