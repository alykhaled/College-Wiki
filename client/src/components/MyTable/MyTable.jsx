import axios from 'axios';
import React, { useEffect } from 'react'
function MyTable() {
    useEffect(() => {
        const getTable = async () => 
        {
            try {
                const res = await axios.post("http://chreg.eng.cu.edu.eg/SIS/Default.aspx?_dc=1633957203557",{
                    headers: {
                        token: "Bearer " + localStorage.getItem("token"),
                        cookie: "_ga=GA1.3.1965056361.1627196650; __utma=176611255.1965056361.1627196650.1633186275.1633348908.5; __utmz=176611255.1633348908.5.5.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not provided); ASP.NET_SessionId=pxm4qptccbkotoyxp1opvxcj; .ASPXAUTH=13B1B958D241F5A2E63ADE6D07937E3F2F5DB67306523C9CCE2434534FC42100DD4559CFBD21A891D898A67C103D63C11A0C0233DC3404EE65E636BDC0449FAC019EFC07B902938DC577F74F5FA1FAF63874C0C0905522C3CF99DAF75B806A7F48CA32129BDD51AC2D6BB18F57B197F0684852CE9BEE046219CC0A4CB77EBC17EE7A46339D820418B10FF5C82C264C8F",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-Ext.Net":"delta=true",
                    }
                });
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTable();
    }, [])
    return (
        <div className="mytable">

        </div>
    )
}

export default MyTable
