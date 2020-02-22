import React from 'react'
import {Link} from 'react-router-dom'
import './static/Footer.css'

function Footer() {
    return (
        <div>
            <footer>
                <div><h5 >Social Networks</h5>
                <ul>
                <li><i className="fas fa-github"></i>Github</li>
                <li><i className="fa fa-facebook"></i>Facebook</li>
                <li><i className="fa fa-twitter"></i>Twitter</li>
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
