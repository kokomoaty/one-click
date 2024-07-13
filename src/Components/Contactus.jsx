import React, { Component } from 'react'
import style from "../Styles/Contact.module.css"
export default class Contactus extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className="row justify-content-center" >
          <div className='col-sm-7 col-lg-5 col-12 m-auto'>
            <form class="py-5">
              <h1 className='text-center text-success'>Contact Us</h1>
              <div class="mb-3">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name" />
              </div>

              <div class="mb-3">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email" />
              </div>

              <div class="mb-3">

                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" column="5" placeholder="Message" ></textarea>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success">Send Message</button>
              </div>
            </form>
          </div>
        </div>


        
      </div>

    )
  }
}

