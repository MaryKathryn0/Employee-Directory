import React from "react";
import API from "../../utils/API";

class Table extends React.Component {
    // state for users and searching
    state = {
        users: [],
        search: "",
    }
    componentDidMount() {
        API.getUsers().then(response => {
            //this is referring to the Table(entire component) setting user state to the array or random people(users)
            this.setState({ users: response.data.results })
        })
    }

    sortEmployee() {
        this.setState({
            users: this.state.users.sort((a, b) =>
                a.name.first > b.name.first ? 1 : -1),
        })
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div class="container">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Search</span>
                    </div>
                    <input name="search" onChange={this.handleInputChange} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                {/* <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form> */}
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Image</th>
                            <th onClick={() => { this.sortEmployee(); }} scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* mapping thru the users array to display on page- Using the user state set above */}
                        {this.state.users.filter(user => user.name.first.toLowerCase().includes(this.state.search.toLowerCase())).map(user => (
                            <tr>
                                <th scope="row"><img src={user.picture.thumbnail} alt="thumbnail"></img></th>
                                <td>{user.name.first} {user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;