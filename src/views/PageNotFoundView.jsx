import { Link } from "wouter";


function PageNotFoundView() {
    
    
    return (
        <>
            <div>
                <h2>PAGE NOT FOUND</h2>

                <Link href="/">
                  <span>go back home</span>
                </Link>
            </div>
        </>
    );
};


export default PageNotFoundView;