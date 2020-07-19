export default () => {
    return (`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #ffff;
    }
    /*mobile version*/
    #videoPlayer{
      margin-bottom:10px;
      width:100vw;
      height:300px;
      display:grid;
      grid-template-column:repeat(12,auto);
      grid-template-rows: repeat(12, auto);
      grip-gap:5px;
    }
    video{
        background-color:#807878;
        width:100%;
        height:100%;
        grid-column:1/13;
        grid-row:1/11;
    }
    #controls{
        padding-left:5px;
        padding-right:5px;
        width:100%;
        height:100%;
        z-index:1;
        grid-column:1/10;
        grid-row:12/13;
        align-content:center;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    #controls:hover{
        background-color:#2324285e;
    }
    #controls > button[name="playbtn"] {
          width:50px;
    }
    #controls > * {
        width:30px;
        background-color:transparent;
        border:none;
        cursor:pointer;
    }
   
    svg:hover{
        stroke: white;
    }
    /* The container <section> - needed to position the dropup content */
    .dropup {
        position: relative;
        display: inline-block;
        grid-column:11/13;
        grid-row:12/13;
        width:50px;
        height:100%;
      }
    
    .dropupbtn {
        background-color:transparent;
        border:none;
        cursor:pointer;
       
      }
    
    /* Dropup content (Hidden by Default) */
    .dropup-content {
        display: ;
        position: absolute;
        background-color: none;
        width: 80px;
        max-height:150px;
        overflow-y:auto;
        bottom:60px;
        right:0px;
        z-index: 1;
        cursor:pointer;
      }
      /* Links inside the dropup */
    .dropup-content span {
        padding: 5px;
        text-decoration: none;
        display: block;
        }
    /* Change color of dropup links on hover */
    .dropup-content a:hover {background-color: #ddd}
   
    /* Show the dropup menu on hover */
    .dropup:hover .dropup-content {
        display: block;
        }

    /* Change the background color of the dropup button when the dropup content is shown */
    .dropup:hover .dropbtn {
        background-color: #2980B9;
        }

    /*tablet version*/
    /*pc version*/
 
    `);
}