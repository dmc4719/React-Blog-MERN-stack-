import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookSquare,faTwitter,faGithub} from '@fortawesome/free-brands-svg-icons'
import './static/Footer.css'

function Footer() {
    return (
        <div>
            <footer>
                <div><h5 >Social Networks</h5>
                <ul>
                <li><FontAwesomeIcon icon={faGithub} size="lg" className="mx-2"/></li>
                <li><FontAwesomeIcon   icon={['fab','facebook-square']}    size="lg" className="mx-2"/></li>
                <li><FontAwesomeIcon icon={faTwitter} size="lg" className="mx-2"/></li>
                </ul></div>

                <div><h5 >Newsletter</h5>
               <li>Subscribe</li></div>

                <div><h5>Contact</h5>
                <ul><li>Email Address</li>
                
                <li>Phone</li>
                <li>Ho</li>
                </ul></div>

            </footer>
        </div>
    )
}

export default Footer
