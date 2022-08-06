printCallLog();
document.getElementById('m1').innerText="";
document.getElementById('m2').innerText="";
function processCall(){
    document.getElementById('m2').innerText="";
    let callNo=document.getElementById('callNo').value;
    if(checkNumber(callNo)==0){
        document.form1.reset();
        document.getElementById('m1').innerText="Enter a 10 digit number";
        return;
    }
    document.getElementById('m1').innerText="";
    let arr=JSON.parse(localStorage.getItem('contactNo'));
    if(arr==null){
        let data=[callNo];
        localStorage.setItem('contactNo',JSON.stringify(data));
    }
    else{
        const findx=arr.indexOf(callNo);
        if(findx!=-1){
            arr.splice(findx,1);
            arr.push(callNo);
            localStorage.setItem('contactNo',JSON.stringify(arr));
        }
        else{
            arr.push(callNo);
            localStorage.setItem('contactNo',JSON.stringify(arr));
        }
    }
    updateMap(callNo,Date());
    printCallLog();
    document.form1.reset();
}

function updateMap(key,val){
    let contactMap=JSON.parse(localStorage.getItem('myMap'));
    if(contactMap==null){
        let myMap=new Map();
        let arr=[val];
        myMap.set(key,arr);
        localStorage.myMap = JSON.stringify(Array.from(myMap.entries()));
    }
    else{
        contactMap=new Map(contactMap);
        const findItem=contactMap.get(key);
        if(findItem==undefined){
           contactMap.set(key,[val]);
           localStorage.myMap = JSON.stringify(Array.from(contactMap.entries()));
        }
        else{
            let tempArr=contactMap.get(key);
            tempArr.push(val);
            localStorage.myMap = JSON.stringify(Array.from(contactMap.entries()));
        }
        // let temp=contactMap.get(key);
        // temp.push(val);
        // localStorage.setItem('myMap',temp);
    }
}

function printCallLog(){
    let arr=JSON.parse(localStorage.getItem('contactNo'));
    if(arr!=null){
        let html='';
        for(let i=arr.length-1;i>=0;i--){
            let contactMap=new Map(JSON.parse(localStorage.getItem('myMap')));
            let len=contactMap.get(arr[i]).length;
            html+=`<tr class="btr"><td>${arr[i]}</td><td>(${len})</td></tr>`;
        }
        document.getElementById('callLog').innerHTML=html;
    }
}

function callInfo(){
    document.getElementById('m1').innerText="";
    let no=document.getElementById('findNo').value;
    if(checkNumber(no)==0){
        document.form2.reset();
        document.getElementById('m2').innerText="Enter a 10 digit number";
        return;
    }
    document.getElementById('m2').innerText="";
    let contactMap=new Map(JSON.parse(localStorage.getItem('myMap')));
    let arr=contactMap.get(no);
    if(arr==undefined){
        document.getElementById('m2').innerText="Record Not Found !!";
        document.form2.reset();
        return;
    }
    document.getElementById('givenNo').innerText=`Call History (${no})`;
    let html='';
    for(let i=arr.length-1;i>=0;i--){
        html+=`<tr class="btr"><td>${arr[i]}</td></tr>`;
    }
    document.getElementById('cInfo').innerHTML=html;
    document.form2.reset();
}
function checkNumber(callNo){
    let j;
    for(j=0;j<callNo.length;j++){
        if(callNo[j]>='0' && callNo[j]<=9)
          continue;
        break;
    }
    if(j<callNo.length || j<10 || j>10){
        return 0;
    }
    return 1;
}