import { Link } from "wouter";


function NotFoundView() {
    
    return (
        <>
            <div>
                <h1>PAGE NOT FOUND</h1>
                <Link href="/">
                  <span>go back home</span>
                </Link>
            </div>
        </>
    );
    
};


export default NotFoundView;