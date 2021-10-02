import React, { useState,useEffect } from 'react'
import { useParams,useHistory} from 'react-router-dom'
import axios from 'axios';
import './viewlists.scss'
function ViewLists() {
    const {id} = useParams();
    const [lists, setLists] = useState([]);
    const history = useHistory();

    // const [courses, setCourses] = useState([]);
    // const [course, setCourse] = useState({});
    useEffect(() => {
        const getList = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/department/"+"hem"+"/lists");
                setLists(res.data.lists);
                console.log(lists);
            } catch (error) {
                
                console.log(error);
            }
        };
        getList();
        
    }, []);
    function chooseList(list) {
        history.push("/admin/list/"+list._id+"/view");
    }
    return (
        <div className="viewlists">
            <div className="autoComplete">
                {lists !== undefined && lists.map(list => (
                    <li onClick={() => chooseList(list)}>{list.name}</li>
                ))}
            </div>
        </div>
    )
}

export default ViewLists
