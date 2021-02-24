  // npm install xlsx
  import React, {useRef} from "react";
  import Item from "./Item";
  import * as XLSX from 'xlsx';
  import "./Items.css";

  export default function Items(props) {

    const wrapperRef = useRef(null);

      // process CSV data

    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"')
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
      console.log("list",list)
      console.log("coloumns",columns)
    
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
  
    <div style={{marginLeft:"30%",fontWeight:"bold", fontSize:"18px"}}> 
    {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>      */}
        <input className="itemsinput" onChange={e => newItem=e.target.value}></input>
        <div style={{marginLeft:"35%", marginTop:"-5%"}} onClick={() => {wrapperRef.current.click()}}>
        <i style ={{fontSize:"40px", color:"black"}} className ="fas fa-upload"></i>
          <input style={{display:"none"}}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          ref={wrapperRef}
          />
          {/* </div> */}
        <i onClick={() => props.submitItem(newItem,true)} style={{marginLeft:"10%", marginTop:"-45px"}} class="itemsfas2 fa-plus-square"></i>
    </div> 
    </div>
    <div className = "itemstable">
         <div  className="itemstd-container">
         {itemData}
         </div>
         </div>
    </>
    )
  }