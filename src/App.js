import React, { Component } from 'react';
import './App.css';
import BarChart from './components/Barchart';
import * as d3 from "d3";
var click=false;
var Month={};
var Week={};
class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    type: "week",
    value: "0",
    data: [],
    width: 510,
    height: 500,
    id: "root"
  }
 Week = {
    week31:[0,53,0,0,24],
    week32:[34,100,0,0,75],
    week33:[59,62,0,0,47],
    week34:[7,84,41,0,57],
    week35:[75,83,75,12,63],
    week36:[87,92,26,72,76],
    week37:[64,91,49,62,36]
}

 Month = {
      month8:[226,368,104,0,266],
      month9:[168,197,87,146,112]
}
  this.optionSelected = this.optionSelected.bind(this);
  this.valueSelected = this.valueSelected.bind(this);
  this.showData = this.showData.bind(this);
}

  optionSelected(event){
    this.setState({type: event.target.value});
  }
  valueSelected(event){
    var option =event.target.value;
    console.log("option",!!option);
    this.setState({value: event.target.value});
    if(!!option){

    if(this.state.type == "week"){
      // document.getElementById("disable1").disabled = true;
      console.log(Week[option]);
      var data = Week[option].map((element)=>{
        return(
          element
        )
      })
    }
    else{
      // document.getElementById("disable2").disabled = true;
      console.log(Month[option]);
      var data = Month[option].map((element)=>{
        return(
          element
        )
      })
    }

    this.setState({data: data});
    }
  }
  showData (){
    this.updateChart()
  }
  startCompare(){
    click=false;
  }

  updateChart() {
    if(click){
      // var svg = d3.select("svg");
      // svg.selectAll("*").remove();
      d3.selectAll("svg").style("display","none");
    }
    var name = ["Denny","Harry","Ho","Kay","Love"];
    const data = this.state.data;
    for(var i=0;i<data.length;i++){
      name[i]=name[i]+" ("+ data[i]+")";
    }
    var svg = d3.select("body")
    .append("svg")
    .attr("width", this.state.width)
    .attr("height", this.state.height)
    .style("background","#ddd")
    .style("margin", 20);



    var y = d3.scaleLinear()
        .domain([0, d3.max(data)+12])
        .range([0,this.state.height]);

    var colors = d3.scaleLinear()
                .domain([0 ,data.length])
                .range(['#FFB832','#C61C6F'])

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 100)
      .attr("y", (d, i) => this.state.height -  y(d))
      .attr("width", 96)
      .attr("height", (d, i) => y(d))
      .attr("fill", (d,i) => colors(i) )

    svg.selectAll("text")
    .data(name)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 100 + 3)
    .attr("y", (d, i) => this.state.height - 3)

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 90)
       .attr("y", 20)
       .attr("font-size", "20px")
       .text("Working Hours of Employ")
       var x = d3.scaleBand().range([0, this.state.width]).padding(0.4),
         y = d3.scaleLinear().range([this.state.height, 0]);

    click=true;

  }


  render() {
    console.log("data",this.state.data);
    return (
      <div className="App">
        <div>
        <h3> Show data By</h3>
        <select value={this.state.type} onChange={this.optionSelected}>
          <option value="month">Month</option>
          <option value="week">Week</option>
        </select>
        <br />

        {
          this.state.type == "month" ?
          <div>
          <select value={this.state.value} onChange={this.valueSelected} >
          <option id="disable2" value=""></option>
            <option value="month9">September</option>
            <option value="month8">August</option>
          </select>
          </div>
          :
          <div>
          <select required value={this.state.value} onChange={this.valueSelected} >
            <option id="disable1" value=""></option>
            <option value="week31">Week 31</option>
            <option value="week32">Week 32</option>
            <option value="week33">Week 33</option>
            <option value="week34">Week 34</option>
            <option value="week35">Week 35</option>
            <option value="week36">Week 36</option>
            <option value="week37">Week 37</option>
          </select>
          </div>
         }
        <button type="button" onClick={this.showData}>Show Stats</button>
        <button type="button" onClick={this.startCompare}>compare</button>
        </div>
      </div>
    );
  }
}

export default App;
