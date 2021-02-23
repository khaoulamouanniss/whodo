  // npm install xlsx
  import React from "react";
  import Item from "./Item";
  import * as XLSX from 'xlsx';
  import "./Items.css";

  export default function Items(props) {
      // process CSV data
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] === '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] === '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
  
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
  
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
  
      for (let l of list) {
        console.log("item",l)
        props.submitItem(l.item,true);
      }
      console.log(list)
      console.log(columns)
    
    }
  
    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    }
    let newItem="";
    const itemData = props.items.map(i => <Item id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
    return(
      <>
  <h3 style ={{textAlign:"center", marginTop:"20px"}}>Read CSV file in React - <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3><br />
    <div style={{marginLeft:"30%"}}>
          <input style={{fontSize:"25px", borderRadius:"35px", outline:"none"}} 
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          />
        <button style={{fontSize:"25px"}} >+</button>
        <input style={{fontSize:"25px", borderRadius:"35px", outline:"none"}} onChange={e => newItem=e.target.value}></input>
        <button style={{fontSize:"25px",width:"95px", borderRadius:"40%", ouline:"none"}} onClick={() => props.submitItem(newItem,true)}>Add</button>

    </div>
    <div className = "itemstable">
         {/* <div className = "itemsth">
           <div className = "itemstd" style ={{flexGrow:"2", flexFlow:"2"}}>
             Item
           </div>
           <div className="itemstd" style ={{flexGrow:"5", flexFlow:"5"}}>
             Topic
            </div>
            <div className="itemstd" style ={{flexGrow:"1", flexFlow:"0"}}>
           No. of item
            </div>
            <div className="itemstd"  style ={{flexGrow:"1", flexFlow:"1"}}>
          Delete
            </div>
         </div> */}
         <div  className="itemstd-container">
         {itemData}
         </div>
         </div>
    </>
    )
  }