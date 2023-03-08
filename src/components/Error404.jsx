const Error404 = ()=>{
    return (<div className="flex flex-col justify-center items-center w-screen h-screen font-mont font-bold">
        <h1 className="text-center text-9xl">Oops..!</h1>
        <h4 className="text-3xl py-5">404 Not Found</h4>
        <h5 className="text-lg font-normal">Un error ocurrio, la pagina solicitada no esta disponible!</h5>
    </div>);
}

export default Error404;