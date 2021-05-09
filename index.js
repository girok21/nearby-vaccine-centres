async function fetchStates()
{
    const jsonstate = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states');
    stateData = await jsonstate.json();
    stateData = stateData.states;
    return stateData;  
}
async function fetchDists(stateId)
{
    const jsondists = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
    distData = await jsondists.json();
    distData = distData.districts;
    return distData;
}

function selectStatePopulate()
{
    let stateData = fetchStates();
    stateData.then(state=>{
        //will start populating state dropdown menu
        // console.log(state);
        var select = document.getElementById("stateSelect");
        for(let i = 0; i<state.length; i++)
        {
            let option = document.createElement("OPTION");
                txt = document.createTextNode(state[i].state_name);
            option.appendChild(txt);
            option.setAttribute("value",state[i].state_id);
            select.insertBefore(option, select.lastChild);
        }

    });
}
function selectDistPopulate()
{
    clearDropdown(document.getElementById("districtSelect"));
    let stateId = document.getElementById("stateSelect").value;
    if(stateId == 'default')
        return;
    let distData = fetchDists(stateId);
    distData.then(dist=>{
        //will start populating state dropdown menu
        // console.log(state);
        var select = document.getElementById("districtSelect");
        for(let i = 0; i<dist.length; i++)
        {
            let option = document.createElement("OPTION");
                txt = document.createTextNode(dist[i].district_name);
            option.appendChild(txt);
            option.setAttribute("value",dist[i].district_id);
            select.insertBefore(option, select.lastChild);
        }
    });
}

function clearDropdown(element){
    //to clear the dropdown menu (district drop down menu) after each selection of state
    let len = element.options.length;
    for(i = len - 1; i>=0; i--){
        element.remove(i);
    }
    let option = document.createElement("OPTION");
    txt = document.createTextNode("select district");
    option.appendChild(txt);
    option.setAttribute("value","default");
    element.insertBefore(option, element.lastChild);
}
async function detailsByDistrict()
{
    let distId = document.getElementById("districtSelect").value;
    if(distId == "default")
        return;
    let centre = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=31-03-2021`);
    centre = await centre.json();
    centre = centre.sessions;
    console.log(centre);
    await clearTableData();
    for(let i = 0; i<centre.length; i++)
    {
        let tr = document.createElement('tr');
        let td_centId = tr.appendChild(document.createElement('td'));
        let td_block = tr.appendChild(document.createElement('td'));
        let td_pincode = tr.appendChild(document.createElement('td'));
        let td_vaccine = tr.appendChild(document.createElement('td'));
        let td_minAge = tr.appendChild(document.createElement('td'));
        let td_feeType = tr.appendChild(document.createElement('td'));
        let td_fee = tr.appendChild(document.createElement('td'));
        let td_avCap = tr.appendChild(document.createElement('td'));
        let td_timing = tr.appendChild(document.createElement('td'));

        td_centId.innerHTML = centre[i].center_id;
        td_block.innerHTML = centre[i].block_name; 
        td_pincode.innerHTML = centre[i].pincode;
        td_vaccine.innerHTML = centre[i].vaccine;
        td_minAge.innerHTML = centre[i].min_age_limit;
        td_feeType.innerHTML = centre[i].fee_type;
        td_fee.innerHTML = centre[i].fee;
        td_avCap.innerHTML = centre[i].available_capacity;
        let timeValue = "";
        let timing = centre[i].from.slice(0,5);
        let hrs = parseInt(timing[0]+timing[1]);
        if(hrs<12)
        {
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " AM - ");
        }
        else
        {
            hrs-=12;
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " PM - ");
        }

        timing = centre[i].to.slice(0,5);
        hrs = parseInt(timing[0]+timing[1]);
        if(hrs<12)
        {
            timeValue += `${hrs}`;
            timeValue += (timing + " AM");
        }
        else
        {
            hrs-=12;
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " PM");
        }

        td_timing.innerHTML = timeValue;   
        document.getElementById("centreTable").appendChild(tr);
    }
    if(document.getElementById("centreTable").rows.length == 1)
        alert("No Data Found");
    resetSelectionBoxes();
}
async function detailsByPincode()
{
    let pincode = document.getElementById("pincode").value;
    console.log(pincode);
    pincode = parseInt(pincode);
    let centre = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=31-03-2021`);
    centre = await centre.json();
    centre = centre.sessions;
    console.log(centre);
    await clearTableData();
    for(let i = 0; i<centre.length; i++)
    {
        let tr = document.createElement('tr');
        let td_centId = tr.appendChild(document.createElement('td'));
        let td_block = tr.appendChild(document.createElement('td'));
        let td_pincode = tr.appendChild(document.createElement('td'));
        let td_vaccine = tr.appendChild(document.createElement('td'));
        let td_minAge = tr.appendChild(document.createElement('td'));
        let td_feeType = tr.appendChild(document.createElement('td'));
        let td_fee = tr.appendChild(document.createElement('td'));
        let td_avCap = tr.appendChild(document.createElement('td'));
        let td_timing = tr.appendChild(document.createElement('td'));

        td_centId.innerHTML = centre[i].center_id;
        td_block.innerHTML = centre[i].block_name; 
        td_pincode.innerHTML = centre[i].pincode;
        td_vaccine.innerHTML = centre[i].vaccine;
        td_minAge.innerHTML = centre[i].min_age_limit;
        td_feeType.innerHTML = centre[i].fee_type;
        td_fee.innerHTML = centre[i].fee;
        td_avCap.innerHTML = centre[i].available_capacity;
        let timeValue = "";
        let timing = centre[i].from.slice(0,5);
        let hrs = parseInt(timing[0]+timing[1]);
        if(hrs<12)
        {
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " AM - ");
        }
        else
        {
            hrs-=12;
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " PM - ");
        }

        timing = centre[i].to.slice(0,5);
        hrs = parseInt(timing[0]+timing[1]);
        if(hrs<12)
        {
            timeValue += `${hrs}`;
            timeValue += (timing + " AM");
        }
        else
        {
            hrs-=12;
            timeValue += `${hrs}`;
            timeValue += (timing.slice(2,5) + " PM");
        }

        td_timing.innerHTML = timeValue;
            document.getElementById("centreTable").appendChild(tr);
    }
    if(document.getElementById("centreTable").rows.length == 1)
    alert("No Data Found");
    resetSelectionBoxes();
}

function resetSelectionBoxes()
{
    document.getElementById("districtSelect").value = "default";
    document.getElementById("stateSelect").value = "default";
    document.getElementById("pincode").value = '';
}

async function clearTableData()
{
    
    let len = document.getElementById("centreTable").rows.length;
    console.log("table length "+len);
    for(let i = 1; i< len; i++)
    {
        console.log()
        document.getElementById("centreTable").deleteRow(1);
    }
}
// let distId = document.getElementById("districtSelect").value;

selectStatePopulate();
fetchStates();



