const redflagTotal = document.querySelector('.redflag-total');
const redflagDraft = document.querySelector('.redflag-draft');
const redflagResolved = document.querySelector('.redflag-resolved');
const redflagRejected = document.querySelector('.redflag-rejected');
const redflagInvestigation = document.querySelector('.redflag-investigation');

const intervTotal = document.querySelector('.interv-total');
const intervDraft = document.querySelector('.interv-draft');
const intervResolved = document.querySelector('.interv-resolved');
const intervRejected = document.querySelector('.interv-rejected');
const intervInvestigation = document.querySelector('.interv-investigation');

token = localStorage.getItem('token');    // Declared already in viewRecords script

fetch('https://ireporter-heroku.herokuapp.com/api/v1/redflags', {
    headers: {
        'token': token,
    }
})
.then((res) => res.json())
.then((response) => {
    const { data } = response;

    redflagTotal.textContent = data.filter(record => record.type === 'redflag').length;
    redflagDraft.textContent = data.filter(record => record.status === 'draft' && record.type === 'redflag').length;
    redflagResolved.textContent = data.filter(record => record.status === 'resolved' && record.type === 'redflag').length;
    redflagRejected.textContent = data.filter(record => record.status === 'rejected' && record.type === 'redflag').length;
    redflagInvestigation.textContent = data.filter(record => record.status === 'under-investigation' && record.type === 'redflag').length; 
});


fetch('https://ireporter-heroku.herokuapp.com/api/v1/interventions', {
    headers: {
        'token': token,
    }
})
.then((res) => res.json())
.then((response) => {
    const { data } = response;

    intervTotal.textContent = data.filter(record => record.type === 'intervention').length;
    intervDraft.textContent = data.filter(record => record.status === 'draft' && record.type === 'intervention').length;
    intervResolved.textContent = data.filter(record => record.status === 'resolved' && record.type === 'intervention').length;
    intervRejected.textContent = data.filter(record => record.status === 'rejected' && record.type === 'intervention').length;
    intervInvestigation.textContent = data.filter(record => record.status === 'under-investigation' && record.type === 'intervention').length; 

});