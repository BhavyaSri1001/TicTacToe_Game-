import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }

    // setStateFunction = () => {
    //     this.setState({
    //         value: "X",
    //     })
    // }

    
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}


class Board extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xisnext: true
    //     };
    // }
    // handleClick(i) {
    //     const squares = this.state.squares.slice()
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //       }
    //     squares[i]=this.state.xisnext?"X":"O"
    //     this.setState({
    //         squares: squares,
    //         xisnext: !this.state.xisnext,
    //     });
    // }
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        // status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        //  }
        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepnumber: 0,
            xisnext: true
        };
    }
    jumpTo(step) {
        this.setState({
            stepnumber: step,
            xisnext: (step % 2) === 0,
        });
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepnumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i]=this.state.xisnext?"X":"O"
        this.setState({
            history: history.concat({
                squares: squares,
            }),
            stepnumber: history.length,
            xisnext: !this.state.xisnext,
        });
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepnumber];
        console.log(this.state.stepnumber)
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xisnext ? 'X' : 'O');
         }
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares= {current.squares}
                    onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i=0; i<lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// const props = {name: "Bhavya"}
// const ShoppingList = React.createElement("div",{className:"shopping-list"},
//     React.createElement("h1", null, "Shopping List for ", props.name),
//     React.createElement("ul",null,
//         React.createElement("li",null,"Instagram"),
//         React.createElement("li",null,"Facebook"),
//         React.createElement("li",null,"Twitter")));

// class ShoppingList extends React.Component{
//     render(){
//         return (
//             <div className ="shopping-list">
//                 <h1>Shopping List for {this.props.name}</h1>
//                 <ul>
//                     <li>Instagram</li>
//                     <li>Whatsapp</li>
//                     <li>Oculus</li>
//                 </ul>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<ShoppingList name="Bhavya"/>, document.getElementById('root'));

// ReactDOM.render(ShoppingList, document.getElementById('root'));
ReactDOM.render(<Game />, document.getElementById('root'));
