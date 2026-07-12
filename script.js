let data=JSON.parse(localStorage.qrdata||'[]');const tb=document.querySelector('#tbl tbody');
function render(){tb.innerHTML='';let s=search.value.toLowerCase();data.filter(r=>r.value.toLowerCase().includes(s)).forEach((r,i)=>tb.innerHTML+=`<tr><td>${i+1}</td><td>${r.value}</td><td>${r.time}</td></tr>`);count.textContent=data.length;localStorage.qrdata=JSON.stringify(data);}
search.oninput=render;render();
function onScanSuccess(txt){if(data.some(x=>x.value===txt))return;data.push({value:txt,time:new Date().toLocaleString()});navigator.vibrate?.(100);render();}
new Html5QrcodeScanner('reader',{fps:10,qrbox:250}).render(onScanSuccess);
function downloadCSV(){let csv='No,Value,Time\n';data.forEach((r,i)=>csv+=`${i+1},"${r.value}","${r.time}"\n`);let b=new Blob([csv],{type:'text/csv'});let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='qr_scans.csv';a.click();}
function clearAll(){if(confirm('Clear all?')){data=[];render();}}