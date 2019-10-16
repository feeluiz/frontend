import React, {Component} from 'react'
import api from '../services/api'




class Main extends Component {
    constructor(props){
        super(props)
        this.state = ({
            'isLoading': true,
            'details': [],
            'error': null
        })
    }
    

         handleSubmit = async () =>  {
            try {

                const username = this.props.match.params.id
                const response = await api.post('/details',{username})
                console.log(response.data)
                const items = Object.values(response.data)
                this.setState({'details': items, 'isLoading': false,'error' : response.data.error})
            } catch (error) {
                this.setState({'error': error, 'isLoading': false})
                
            }

        }
        componentDidMount = () => this.handleSubmit()
        
    render(){
        const { isLoading, details, error } = this.state;
        const [ name, avatar,bio,git,repos ] = details
        const {match} = this.props
        return (
          <React.Fragment>           
            {!isLoading & !error ? 
                 (
                  <div className='details-container' key={match.params.id}>
                    <h1>{name}</h1>
                    <img alt='img' src={avatar} width='200px' height='200px'></img>
                    <p>Bio: {bio}</p>
                    <a  rel="noopener noreferrer" href={git} target="_blank" >Github</a>
                    <ul>

                    { (repos.map((item,index) =>{
                        return (
                            <li key={index}>
                                <a rel="noopener noreferrer" href={item} key={index} target="_blank" >{item}</a>
                            </li>
                            ) 
                            
                            
                        }))}
                    </ul>
                  </div>
                ) :  !error ? (<h2>Carregando...</h2> ) : (
                     <p>Usuário não encontrado, tente novamente mais tarde.
                         <a href="/">clique aqui para voltar.</a>
                     </p>)}
          </React.Fragment>
        );
}
}

export default Main