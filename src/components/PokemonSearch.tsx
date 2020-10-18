import React , {Component} from 'react'
import User from '../interface/User.interface'
// import { stringify } from 'querystring';

interface SearchState{
    err:boolean,
    name: string,
    numberOfAbilities: number,
    baseExperience: number,
    imageUrl: ''
}

declare namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any
    }
 }

export class PokemonSearch extends Component<User, SearchState> {
    pokemonRef :React.RefObject<HTMLInputElement>;

    constructor(props:User){
        super(props);
        // Todo: this.stateで、勝手にserrchstateの値として認識されるの、よくわからん。。
        // tsxだと、stateの型を指定する必要がある？
        this.state =  {
            err : false, 
            name:'',
            numberOfAbilities:0,
            baseExperience:0,
            imageUrl:'',
        };

        this.pokemonRef = React.createRef();
    }

    onSearchClick = () => {
        const inputValue = this.pokemonRef.current.value;
        console.log(inputValue)
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        .then(res => {
            if(res.status !== 200){
                this.setState({err:true});
                return;
            }
            res.json().then((data) => {
                this.setState({
                    name: data.name,
                    baseExperience: data.base_experience,
                    imageUrl: data.sprites.front_default
                })
            })
        })
    }

    render(){
        // Todo: stateやpropsに対応する変数を勝手に入れてくれる？
        const {name: userName, numberOfPokemons} = this.props
        const { err, name, baseExperience, imageUrl, numberOfAbilities } = this.state

        let resultMarkup: any

        if(err) {
            resultMarkup = <p>No pokemon found...</p>
        }
        else {
            resultMarkup = <div>
                <img src={imageUrl}></img>
                <p>name: {name},  baseExperience: {baseExperience}, numberOfAbilities: {numberOfAbilities}</p>
            </div>
        }
        
        return(
            <div>
                <h1>hello pokemon!!</h1>
                {userName}{' '}
                {numberOfPokemons &&  <span>has {numberOfPokemons} pokemons</span>}
                <input type="text" ref={this.pokemonRef} />
                <button onClick={this.onSearchClick} className="my-button">
                    serch
                </button>
                {resultMarkup}
            </div>
        )
    }
}

export default PokemonSearch