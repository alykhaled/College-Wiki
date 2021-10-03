import React, { useState,useEffect } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios';
import './viewlists.scss'
function ViewLists() {
    const [lists, setLists] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const getList = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/department/hem/lists",{
                    headers: {
                        token: "Bearer " + localStorage.getItem("token"),
                    }
                });
                setLists(res.data.lists);
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
