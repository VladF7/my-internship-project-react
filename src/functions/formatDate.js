module.exports = (d) => {
    let date;
    if(!d){
      date = new Date();
      date.setHours(date.getHours()+1)
    } else {
      date = new Date(d);
    }
    let dd = date.getDate();
    let mm = date.getMonth() + 1; 
    let yyyy = date.getFullYear();
    let hours = date.getHours() ;
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    if(hours < 10) hours = '0' + hours;
    return date = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':00';
}