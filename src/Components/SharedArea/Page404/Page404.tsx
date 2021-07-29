import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">

			<h2>The page you are looking for doesn't exist.</h2>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" allow="autoplay" title="Page not Found"></iframe>
            {/* <iframe width="560" height="315"  src="https://www.youtube.com/embed/6MXPCQt1eEA" allow="autoplay" title="Page not Found"></iframe> */}
            {/* <iframe width="560" height="315"  src="https://www.youtube.com/embed/ftdd_SALC-E" allow="autoplay" title="Page not Found"></iframe> */}

        </div>
    );
}

export default Page404;
