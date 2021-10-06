import React, { useEffect, useState } from 'react'
import './tablepage.scss'
import axios from 'axios';

function TablePage() {
    const [table, setTable] = useState({});
    const [sunday, setSunday] = useState([]);
    table.courses && table.courses.map(course => (
        console.log()
    ))
    useEffect(() => {
        const getTable = async () => 
        {
            try {
                const res = await axios.get(process.env.REACT_APP_API+"/table/615d8616802199b562f0fa0b",{
                    headers: {
                        token: "Bearer " + localStorage.getItem("token"),
                    }
                });
                setTable(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTable();
        setSunday(table["courses"]);
    }, []);
    return (
        <div className="tablepage">
            <div className="container">
                <table>
                    <tr>
                        <th colSpan="11">Sunday</th>
                    </tr>
                    <tr>
                        <th>08:00 <br/> 09:00</th>
                        <th>09:00 <br/> 10:00</th>
                        <th>10:00 <br/> 11:00</th>
                        <th>11:00 <br/> 12:00</th>
                        <th>12:00 <br/> 01:00</th>
                        <th>01:00 <br/> 02:00</th>
                        <th>02:00 <br/> 03:00</th>
                        <th>03:00 <br/> 04:00</th>
                        <th>04:00 <br/> 05:00</th>
                        <th>05:00 <br/> 06:00</th>
                        <th>06:00 <br/> 07:00</th>
                    </tr>
                    <tr>
                        {table.courses && table.courses.map(course => (
                            <td colSpan={course.time.split("-")[1] - course.time.split("-")[0]}>{course.course.code}</td>
                        ))}
                        {/* <td colSpan="3">fsd</td> */}
                    </tr>
                </table>
                <table>
                    <tr>
                        <th colSpan="11">Monday</th>
                    </tr>
                    <tr>
                        <th>8:00 <br/> 9:00</th>
                        <th>9:00 <br/> 10:00</th>
                        <th>10:00 <br/> 11:00</th>
                        <th>11:00 <br/> 12:00</th>
                        <th>12:00 <br/> 1:00</th>
                        <th>1:00 <br/> 2:00</th>
                        <th>2:00 <br/> 3:00</th>
                        <th>3:00 <br/> 4:00</th>
                        <th>4:00 <br/> 5:00</th>
                        <th>5:00 <br/> 6:00</th>
                        <th>6:00 <br/> 7:00</th>
                    </tr>
                    <tr>
                        <td colSpan="3">GENN102</td>
                        <td colSpan="2">GENN102</td>
                        <td colSpan="2">GENN102</td>
                        <td colSpan="3">GENN102</td>
                        {/* <td >GENN102</td> */}
                    </tr>
                    <tr>
                        <td colSpan="3">GENN102</td>
                        <td colSpan="2">GENN102</td>
                        <td colSpan="3">GENN102</td>
                        <td colSpan="3">GENN102</td>
                        {/* <td >GENN102</td> */}
                    </tr>
                </table>
               
            </div>
        </div>
    )
}

export default TablePage
