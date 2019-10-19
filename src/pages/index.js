import React,{ Component} from 'react'
import './index.css'
import api from '../services/api'


class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'hasUsers': false,
            'clicked': false
        }
    }
     

     handleSubmit = async (event) =>  {
        event.preventDefault()
        

        const username = this.username.value
        const repos = this.repos.value
        try {
            
            
            let response
            if(username === ''){
                response = await api.post('/users',{ repos })
            }else if(repos === ''){
                response = await api.post('/users',{username})
            }else{
                response = await api.post('/users',{username, repos})
            }
            
            const items = response.data
            //console.log(items);
            
            if(items.length  > 0) this.setState({'users': items, 'hasUsers': true})
            this.setState({'clicked': true})
        } catch (error) {
            this.setState({'clicked': true})
        }
    }
    

    render() {
        const {users, hasUsers,clicked} = this.state
        return ( 
        <>
        <h1> Pesquisar usuários no Github</h1>
        <div className='search-container'>
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder='Usuário no Github.'
                    name='user'
                    ref={username => (this.username = username)}
                    />
                <input
                    placeholder='Quantidade de repositorios.'
                    name='quantidade'
                    ref={repos => (this.repos = repos)}
                    />
                <button type="submit" >Pesquisar</button>
            </form>

        </div>
        <div className='results-container'>
                <h3>Lista de usuários: </h3>
                <ul>
                    {hasUsers ? (users.map((item, index) =>{
                        return (
                            <div key={index}>
                                <img alt='avatar' width='50px' height='50px' src={item['avatar_url']}/>
                                <a rel="noopener noreferrer" href={`/details/${item['login']}`}>{item['login']}</a>
                                <p>{}</p>
                            </div>
                        )
                    })): clicked ? 
                    (<h3>Nenhum usuário econtrado, tente novamente.</h3>):(<p></p>)}
                </ul>

            </div>
        </>
        )
    }

}
  
export default Index