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
async function test()
{
    let distId = document.getElementById("districtSelect").value;
    if(distId == "default")
        return;
    let centre = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=31-03-2021`);
    centre = await centre.json();
    centre = centre.sessions;
    console.log(centre);
}
async function testpincode()
{
    let pincode = document.getElementById("pincode").value;
    console.log(pincode);
    pincode = parseInt(pincode);
    let centre = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=31-03-2021`);
    centre = await centre.json();
    console.log(centre);

}
// let distId = document.getElementById("districtSelect").value;

selectStatePopulate();
fetchStates();



