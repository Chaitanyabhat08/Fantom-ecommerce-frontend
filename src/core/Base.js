import React from 'react'
import Navbar from './Navbar'


export default function Base({title="My title",description="This is the description",className="text-dark p-4",children}) {
    return (
        
           
            <div>
                <Navbar/>
                <div className="p-3 text-dark text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead small">{description}</p>
                </div>
          
                <div className={className}>{children}</div>

            <footer className="footer w-100 container-fluid bg-danger text-center text-white"> 
                <div className="row w-100 d-flex justify-content-around">
                    <div className="col-4 p-5 text-left">
                        <h5>Our Address</h5>
                        <address>
                            #96, Shivage Malleshwara Hills,<br />
                            91st Main Rd, 1st Stage,<br />
                            Kumaraswamy Layout, Bengaluru,<br />
                            Karnataka - 560078 <br />
                            <i className="fa fa-phone fa-lg pl-5"></i>: +852 1234 5678 <br />
                            <i className="fa fa-fax fa-lg pl-5"></i>: +852 8765 4321 <br />
                            <i className="fa fa-envelope fa-lg pl-5"></i><a className="text-light" href="mailto:fantom@merch.com">fantom@merch.com</a>
                        </address>
                    </div>
                    <div className="col-4 mt-auto mb-auto text-left">
                        <h5>Stay connected</h5>
                    <div className="text-left">
                        <a className="btn-lg btn-social-icon btn-google text-light" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn-lg btn-social-icon btn-facebook text-light" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn-lg btn-social-icon btn-linkedin text-light" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn-lg btn-social-icon btn-twitter text-light" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn-lg btn-social-icon btn-google text-light" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn-lg btn-social-icon text-light" href="mailto:fantom@merch.com"><i className="fa fa-envelope-o"></i></a>
                    </div>

                    </div>
                </div>
                <h6 className="text-white p-3">© 2020,Fantom.com,Inc. or its affliates </h6>

            </footer>
            </div>
    )
}
