function alert_(s,c=false,to=10000) {
  let d = document.createElement('div');

  d.style.position = 'fixed';
  d.style.top = 0;
  d.style.left = 0;
  d.style.right = 0;
  d.style.padding = '1rem';
  d.style.backgroundColor = c ? 'green' : 'red';
  d.style.color = 'white';
  d.style.textAlign = 'center';
  d.className = 'alertt';
  d.innerText = s;

  document.body.appendChild(d);

  setTimeout(()=>d.remove(),to);
}

function get_param(k) {
  return new URLSearchParams(location.search).get(k);
}

function get_month(n) {
  return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][n];
}

function toLocalTime(n) {
  return n ? new Date(n).toLocaleString('en-PH',{hour:'numeric',minute:'numeric',hour12:true}) : null;
}

function toLocalTimeFmt(n) {
  return n ? new Date(n).toLocaleString('en-PH',{hour:'numeric',minute:'numeric',second:'numeric',hour12:true}) : null;
}

function toLocalDateFmt(d) {
  return new Date(d).toLocaleString("en-PH", { month: "long", day: "numeric", year: "numeric" });
}