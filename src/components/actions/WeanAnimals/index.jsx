import React from 'react';

// ui components
import {
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Switch,
  FormGroup,
  FormControlLabel,
  Button
} from '@material-ui/core'

// dependancies
import axios from 'axios';
import moment from 'moment';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

export default class WeanAnimals extends React.Component{
  state={
    herdSelected: false,
    animalSelected: false,
    readyToRegister: false,
    weanToHerdSelected: false,
    creatingNewHerd: false,
    registerdCalves: [],
    newHerd: {
      name: '',
      category: ''
    },
    category: ''
  };

  componentDidMount() {
    axios.get('/api/herds')
      .then(res => this.setState({herds: res.data}));
  }

  handleHerdSelect = selectedHerd => () => {
    const newState = this.state;

    newState.herdSelected = true;
    newState.selectedHerd = selectedHerd;
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(animal =>
      animal.category === 'calf' || animal.category === 'bull-calf'
    );

    this.setState(newState);
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;

    this.setState(newState);
  }

  handleWeanToSelect = herd => () => {
    const newState = this.state;
    newState.weanToHerdSelected = true;
    newState.selectedWeanToHerd = herd;

    this.setState(newState);
  }

  handleWeanChange = name => event => {
    const newState = this.state;
    newState[name] = event.target.value;
    this.setState(newState);
  }

  toggleCreateNewHerd = () => {
    this.setState({ creatingNewHerd: true });
  }

  handleNewHerdChange = name => event => {
    const newState = this.state;
    newState.newHerd[name] = event.target.value;
    this.setState(newState);
  }

  handleCreateNewHerd = () => {
    axios.post('/api/herds', this.state.newHerd)
      .then(res => {
        const newState = this.state;
        newState.herds.push(res.data);
        newState.creatingNewHerd = false;
        this.setState(newState);
      });
  }

  render() {
    return(
      <div>
        {this.state.herds &&
          <main>
            {!this.state.selectedHerd ?
              <Typography variant='h5'>Wean a herd</Typography>
              :
              <Typography variant='h5'>Weaning {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.selectedHerd  &&
              <div>
                <Typography variant='subtitle1'>Which heard is getting weaned?</Typography>
                {this.state.herds.map(herd =>
                  <HerdCard
                    key={herd._id}
                    herd={herd}
                    onClick={this.handleHerdSelect(herd)}
                  />
                )}
              </div>
            }

            {(this.state.selectedHerd && !this.state.animalSelected) &&
              <Grid container direction='column'>
                <Typography variant='subtitle2'>Select calf to wean:</Typography>
                {this.state.selectedHerd.animals.map( animal =>
                  <Grid item xs={12} key={animal._id}>
                    <Card>
                      <CardContent onClick={this.handleAnimalSelect(animal)}>
                        <Grid container alignItems='center'>
                          <Grid item xs={8} >
                            <p> { animal.identifier } </p>
                          </Grid>
                          <Grid item xs={4} >
                            <p> { animal.breed } </p>
                            <p> { animal.category } </p>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            }

            {this.state.animalSelected &&
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' gutterBottom>
                    Animal being weaned is: {this.state.selectedAnimal.identifier}
                  </Typography>
                </Grid>
              </Grid>
            }

            {(!this.state.weanToHerdSelected &&
              this.state.animalSelected &&
              !this.state.creatingNewHerd) &&

              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' gutterBottom>
                    Select a herd to wean into or create a new one:
                  </Typography>
                  {this.state.herds.map(herd =>
                    <HerdCard
                      key={herd._id}
                      herd={herd}
                      onClick={this.handleWeanToSelect(herd)}
                    />
                  )}
                </Grid>

                <Button
                  onClick={this.toggleCreateNewHerd}
                  variant='contained'
                  color='secondary'
                >
                  New Herd
                </Button>
              </Grid>
            }

            {this.state.weanToHerdSelected &&
              <Grid container direction='column'>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' gutterBottom>
                    Weaned into {this.state.selectedWeanToHerd.name}
                  </Typography>
                </Grid>

                {/* <Grid item xs={12}> */}
                <FormControl>
                  <InputLabel shrink htmlFor='category'>Categorise animal post weaning</InputLabel>
                  <NativeSelect
                    // fullWidth
                    value={this.state.category}
                    onChange={this.handleWeanChange('category')}
                    input={<Input name='category' id='category' />}
                  >
                    <option value=''>None</option>
                    <option value='calf'>Calf</option>
                    <option value='weaner'>Weaner</option>
                    <option value='heifer'>Heifer</option>
                    <option value='ox'>Ox</option>
                    <option value='cow'>Cow</option>
                    <option value='bull'>Bull</option>
                    <option value='bull-calf'>Bull-Calf</option>
                  </NativeSelect>
                </FormControl>
                {/* </Grid> */}

                <Button
                  onClick={this.toggleCreateNewHerd}
                  variant='contained'
                  color='secondary'
                >
                  Wean Animal
                </Button>
              </Grid>
            }

            {/*  this is basically the create new herd component */}
            {this.state.creatingNewHerd &&
              <Grid container>
                <Grid item xs={12} >
                  <FormControl >
                    <InputLabel shrink htmlFor='name'>Herd Name</InputLabel>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      value={this.state.newHerd.name}
                      onChange={this.handleNewHerdChange('name')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl>
                    <InputLabel shrink htmlFor='category'>Category</InputLabel>
                    <NativeSelect
                      fullWidth={true}
                      value={this.state.newHerd.category}
                      onChange={this.handleNewHerdChange('category')}
                      input={<Input name='category' id='category' />}
                    >
                      <option value=''>None</option>
                      <option value='bull-calves'>Bull Calves</option>
                      <option value='weaners'>Weaners</option>
                      <option value='replacement-heifers'>Replacement Heifers</option>
                      <option value='cows'>Cows</option>
                      <option value='bulls'>Bulls</option>
                      <option value='pasturelot'>Pasturelot</option>
                      <option value='feedlot'>Feedlot</option>
                      <option value='grassland'>Grassland Fattening</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Button
                  onClick={this.handleCreateNewHerd}
                  variant='contained'
                  color='secondary'
                >
                  Create Herd
                </Button>
              </Grid>
            }

          </main>
        }
      </div>
    );
  }
}
