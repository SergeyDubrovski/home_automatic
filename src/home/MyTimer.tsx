
import { useTimer } from 'react-timer-hook';

type Props = {
    expiryTimestamp : Date
}



function MyTimer({ expiryTimestamp }: Props) {
  const {
    
    seconds,
    minutes
  
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    
 

  
  return (
    <div style={{textAlign: 'center'}}>
      
      <div style={{fontSize: '60px'}}>
       <span>{minutes}</span>:<span>{(seconds<10)? '0' : '' }{seconds}</span>
      </div>
    
      
    </div>
  );
}


export default MyTimer