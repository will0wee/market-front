import React, {Component} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends Component
{
    constructor(props)
    {
        super(props);
    }
	
    render()
    {
        return (
            <MDBFooter className="marginTop50 font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6">
                            
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: A moi 
                    </MDBContainer>
                </div>
            </MDBFooter>
          );
    }
}

export default Footer;