import { Link } from "wouter";


function PageNotFoundView() {
    
    
    return (
        <>
            <div className="notFoundContainer">
                <div>PAGE NOT FOUND</div>
                <Link href="/">
                  <span>go back home</span>
                </Link>
            </div>
        </>
    );
};


export default PageNotFoundView;