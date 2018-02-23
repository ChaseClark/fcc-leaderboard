import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import Table from "react-bootstrap/lib/Table"
import Image from "react-bootstrap/lib/Image"
import "font-awesome/css/font-awesome.css"

class App extends Component {
  state = {
    top100Days: [],
    top100AllTime: [],
    current: true
  }

  //Get FCC Data Func
  getFCCData(url, stateName) {
    axios.get(url).then(({ data }) => {
      this.setState({ [stateName]: data })
    })
  }

  componentDidMount() {
    this.getFCCData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      "top100Days"
    )
    this.getFCCData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
      "top100AllTime"
    )
  }

  changeTable(value) {
    if (this.state.current !== value) {
      this.setState({ current: value })
    }
  }

  render() {
    const { top100Days, top100AllTime, current } = this.state
    return (
      <div className="App container">
        <Table striped bordered condensed hover className="color-black">
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th onClick={(event)=>this.changeTable(true)}>Points in 30 Days {current && (<i className="fa fa-caret-down"></i>)}</th>
              <th onClick={(event)=>this.changeTable(false)}>All Time Points {!current && (<i className="fa fa-caret-down"></i>)}</th>
            </tr>
          </thead>

          <tbody>
            { current && (top100Days.map((row, index) => (
              <tr key={row.username}>
                <td>{index + 1}</td>
                <td>
                  <a href={`https://www.freecodecamp.org/${row.username}`}>
                    <Image src={row.img} className="imgHeight" circle /> {row.username}
                  </a>
                </td>
                <td>{row.recent}</td>
                <td>{row.alltime}</td>
              </tr>
            )))}

            { !current && (top100AllTime.map((row, index) => (
              <tr key={row.username}>
                <td>{index + 1}</td>
                <td>
                  <a href={`https://www.freecodecamp.org/${row.username}`}>
                    <Image src={row.img} className="imgHeight" circle /> {row.username}
                  </a>
                </td>
                <td>{row.recent}</td>
                <td>{row.alltime}</td>
              </tr>
            )))}

          </tbody>

        </Table>
      </div>
    )
  }
}

export default App
