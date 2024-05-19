import { Link } from "wouter";


function NotFoundView() {
    
    
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


export default NotFoundView;