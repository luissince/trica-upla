import React from "react"
import logoUpla from "../assets/LogoUpla5.png";
import {FiLogOut} from "react-icons/fi"
import {MdOutlineLightMode ,MdDarkMode} from "react-icons/md"
import { Link } from "react-router-dom";
class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menu : true,
      darkTheme : false
    }    
  }
  setStateAsync(state){
    return new Promise((resolve)=>{
      this.setState(state,resolve)
    });
  }

  componentDidMount(){
 
      if(window.localStorage.getItem('dark-theme')===null){
        window.localStorage.setItem('dark-theme', JSON.stringify({"Modo":this.state.darkTheme}));
      }      
 
      const modoDark=JSON.parse(window.localStorage.getItem("dark-theme"))
     if(modoDark!=null){
    this.setStateAsync({darkTheme:modoDark.Modo})
     }
        const bodyClass = window.document.children[0].classList;
        modoDark.Modo ? bodyClass.add('dark') : bodyClass.remove('dark');         
  }
    async handleMode(){        
      await this.setStateAsync({darkTheme:!this.state.darkTheme}) 
      window.localStorage.setItem('dark-theme', JSON.stringify({"Modo":this.state.darkTheme})); 
      const htmlClass =window.document.children[0].classList; 
      this.state.darkTheme ? htmlClass.add('dark') : htmlClass.remove('dark');
    }    
    
   logout(){
    localStorage.removeItem("datosUsuario");
    window.location.href = "/";
  }
  toggle(){
    const menu = document.querySelector("#Aside")

    if(this.state.menu){
      menu.classList.remove("hidden")
      this.setState({menu:!this.state.menu})
  }else{
    menu.classList.add("hidden")
    this.setState({menu:!this.state.menu})
  }
  }
render(){
  return(
<nav className="left-0 md:left-[265px] fixed px-2 w-[100vw] md:w-[calc(100%_-_280px)] font-mont m-0 md:mt-3  shadow-md bg-white border-gray-200 md:rounded dark:bg-gray-800 z-50">
  <div className="flex flex-wrap justify-between md:justify-end items-center mx-auto">
  <Link to="" className="flex md:hidden justify-start items-center">
        <img src={logoUpla} className="w-[32px] h-[28px] sm:h-9" alt="Upla" />
        <div className="flex flex-col ml-2">
        <span className="text-sm leading-3 text-upla-100 font-semibold whitespace-nowrap dark:text-white">
            UPLA
          </span>
          <small className="font-bold dark:text-white">Seguimiento Estudiantil</small>
        </div>
    </Link>
    <button onClick={()=>this.handleMode()} className="md:hidden block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-upla-100 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> {!this.state.darkTheme ? <MdDarkMode className="text-base bg-gray-dark rounded-full w-7 h-7 p-1 text-white"/>: <MdOutlineLightMode className="text-base rounded-full w-7 h-7 p-1 text-white hover:text-yellow-300"/>}</button>
    <button onClick={()=>this.toggle()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex items-center flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
        <li>
          <button onClick={()=>this.handleMode()} className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-upla-100 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> {!this.state.darkTheme ? <MdDarkMode className="text-base bg-gray-dark rounded-full w-7 h-7 p-1 text-white"/>: <MdOutlineLightMode className="text-base rounded-full w-7 h-7 p-1 text-white hover:text-yellow-300"/>}</button>
        </li>
        <li>
          <button onClick={()=>this.logout()} className="flex items-center py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FiLogOut/> Salir</button>
        </li>
      </ul>
    </div>
  </div>
</nav>



  )
}
}
export default Navbar