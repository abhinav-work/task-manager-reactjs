import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ChangeTaskStatus from '../changeTaskStatus';

export default (props) => {
    let data = (props.row || []).map(elem => <td> { elem } </td>)
    if(props.tableBody) {
        return(
                <tr key={props.key}> 
                    {data}
                    {/* <ToggleButtonGroup type='radio' name='genre' defaultValue={['low']}>
                        <ToggleButton className="low-priority-button" value={'low'}>Low</ToggleButton>
                        <ToggleButton className="mid-priority-button" value={'mid'}>Mid</ToggleButton>
                        <ToggleButton className="high-priority-button" value={'high'}>High</ToggleButton>
                    </ToggleButtonGroup> */}
                    
                    <Link to={`/changeTaskStatus/${props.id}`} style={{width: "30%"}}> {'  '}
                        <Button variant="success" style={{width: "30%"}} disabled={props.done}>Done</Button> 
                    </Link>
                    <Link to={`/editTask/${props.id}`} style={{width: "30%"}}> {'  '}
                        <Button>Edit</Button>
                    </Link>
                    <Link to={`/deleteTask/${props.id}`} style={{width: "30%"}}> {'  '}
                        <Button variant="danger">Delete</Button> 
                    </Link>
                    
                </tr>
        )
    }
   else {
//    data[data.length-2] = <td>{(props.row || [])[data.length-2]}{' '}<Button><img src={`../../../public/sortButton.png`}></img></Button></td>
    return(
        <tr> 
           {data}
        </tr>
    )
   }
}