import './App.css';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { data } from './Newjson'
import { margin } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControlLabel, Checkbox } from '@mui/material';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';




function App() {
  const [state, setState] = useState(data);
  const [selected, setSelected] = useState(false);
  const [checked, setchecked] = useState(true);
  const [checkedb, setcheckedb] = useState(true);
  const [formValues, setFormValues] = useState({});




  const handleChangea = () => {
    if (checked) {
      setchecked(false)
      if (document.getElementById("Second_topping")) {
        document.getElementById("Second_topping").style.display = "none";
        document.getElementById("Second_toppingkey").style.display = "none";
      }
    }
    else {
      setchecked(true)
      if (document.getElementById("Second_topping")) {
        document.getElementById("Second_topping").style.display = "flex"
        document.getElementById("Second_toppingkey").style.display = "flex"
      }
    }
  }
  const handlesubmit = (e) => {
    console.log("submit event");
    console.log(e.target);
    alert(JSON.stringify(formValues))
    console.log(document.getElementsByClassName('form').value)


  }

  const handleselectchange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  const handleChangeb = () => {
    if (checkedb) {
      setcheckedb(false)
      if (document.getElementById("Size")) {
        document.getElementById("Size").style.display = "none";
      }
    }
    else {
      setcheckedb(true);
      if (document.getElementById("Size")) {
        document.getElementById("Size").style.display = "flex";
      }
    }
  }
  // const handleradio=(id)=>{
  //   if(document.getElementById(id).checked==true){
  //     console.log("here...")
  //   document.getElementById(id).checked=false;}
  //   else{
  //     document.getElementById(id).checked=true;}
  // }

  let flag = 0;
  const handleempty = () => {
    flag = 1;
    setState(" ");

  }

  return (



    <div className="App">
      <div>
        <h1>Paste Your JSon Schema Here
        </h1>
        {(state != " " && flag != 1) ?
          <textarea type="text" className='textfield' value={JSON.stringify(state)}

            onChange={(e) => e.target.value ? setState(JSON.parse(e.target.value)) : { handleempty }}
          /> : < textarea type="text" className='textfield'
            onChange={(e) => setState(JSON.parse(e.target.value))}
          />}


      </div>
      {(state != " ") && flag != 1 ?
        <div>
          <Grid style={{ padding: "80px 5px 0 5px" }}>
            <Card style={{ maxWidth: 600, margin: "0 auto" }}>
              <CardContent>
                {/* <Typography variant="h4" color="primary" >
             FORM
          </Typography> */}

                <form className="form">

                  <Grid container spacing={1}>
                    {
                      state.map(data => <Grid container display="flex" justifyContent='start'>
                        {data.uiType === "Input" ?
                          <Grid item xs={4} sm={4}>
                            <label id={data.label} className="label"><strong> {data.label}</strong></label>
                          </Grid> : data.uiType === "Select" ? <Grid item xs={6} sm={6}>
                            <label id={data.label} className="label"><strong> {data.label}</strong></label> </Grid> : <Grid item xs={12} sm={12} display="flex" justifyContent="start" alignItems='start'>
                            <label className='grouplabel'><strong> {data.label}</strong></label>
                          </Grid>}

                        {data.uiType === "Input" ?
                          <Grid item xs={8} sm={8} display="flex" justifyContent="flex-start">
                            <TextField required={data.validate.required} variant="outlined"
                              name={data.label} onChange={(event) => handleselectchange(event)}
                            />
                          </Grid>
                          : data.uiType === "Group" ? data.subParameters.map((inneritem) => <>
                            {inneritem.uiType === 'Select' && <Grid item xs={12} sm={12} align="right" display="flex" justifyContent="space-around">
                              <label className='label' id={inneritem.label}><strong> {inneritem.label}</strong></label>
                              <Select className='selectdiv'
                                required={inneritem.validate.required}
                                labelId="demo-simple-select-label"
                                id={inneritem.label + "key"}
                                name={inneritem.label}
                                //value={age}
                                label="slices"
                                onChange={(e) => handleselectchange(e)}
                              >
                                {inneritem.validate.options ? inneritem.validate.options.map((elem) =>
                                  <MenuItem value={elem.label}>{elem.label}</MenuItem>) : " "}
                              </Select>
                            </Grid>}
                            {inneritem.validate.options ? console.log(inneritem.validate.defaultValue) : ""}
                            {inneritem.uiType === 'Radio' && <RadioGroup name={inneritem.label} onChange={(e) => handleselectchange(e)} required={inneritem.validate.required}>
                              {inneritem.validate.options ? inneritem.validate.options.map(
                                (option) => inneritem.uiType === 'Radio' && <Grid item xs={12} sm={12}>

                                  {/* <ToggleButton id={option.label} value={option.label} >{option.label}</ToggleButton>  */}

                                  <FormControlLabel name={inneritem.label} value={option.label} control={<Radio id={option.label} />} label={option.label} />



                                </Grid>) : " "}</RadioGroup>}
                            {inneritem.uiType === 'Switch' ? <FormControlLabel control={<Checkbox defaultChecked />} label={inneritem.label} /> : " "}
                            {inneritem.subParameters ? <Grid item xs={12} sm={12} align="right" className="Containerrow" >
                              {inneritem.subParameters.map((param) =>
                                param.uiType === 'Select' &&
                                <>

                                  <label className='label' id={param.label}><strong> {param.label}</strong></label>


                                  <Select className='selectdiv'
                                    labelId="demo-simple-select-label"
                                    id={param.label}
                                    name={param.label}
                                    required={param.validate.required}
                                    //value={age}
                                    label="slices"
                                    onChange={(e) => handleselectchange(e)}
                                  >
                                    {param.validate.options ? param.validate.options.map((elem) =>
                                      <MenuItem value={elem.label}>{elem.label}</MenuItem>) : " "}
                                  </Select>

                                </>

                              )}
                            </Grid> : " "}</>

                          )


                            : data.uiType === "Select" ? <Grid item xs={12} sm={12} align="right">
                              {checkedb && <Select className='selectdiv'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={data.label}
                                //value={age}
                                label="slices"
                                onChange={(e) => handleselectchange(e)}
                              >

                                {data.validate.options ? data.validate.options.map((elem) =>
                                  <MenuItem value={elem.label}>{elem.label}</MenuItem>) : " "}
                              </Select>} </Grid> : " "}
                      </Grid>)
                    }

                  </Grid>
                  <Grid container spacing={1}></Grid>
                  <Grid item xs={12} sm={12} align="left">
                    <Grid item xs={6} sm={6}>
                      <FormControlLabel control={<Switch checked={checked} onChange={handleChangea} />} label={checked ? "Hide advanced options" : "Show advanced options"} />
                    </Grid>
                    <FormControlLabel control={<Switch checked={checkedb} onChange={handleChangeb} />} label={checkedb ? "Hide advanced options" : "Show advanced options"} />
                  </Grid>




                  <Grid container spacing={1}>
                    <Grid item xs={12} align="right">
                      <Button type="reset" variant="outlined" color="primary">Cancel</Button>
                      <Button type="submit" onClick={(e) => handlesubmit(e)} variant="contained" color="primary">Submit</Button>
                    </Grid>

                  </Grid>
                </form>

              </CardContent>
            </Card>
          </Grid>
        </div>
        : <><h2>No Json Present</h2></>}
    </div>
  );
}

export default App;
