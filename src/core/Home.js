import React from 'react'
import Base from './Base'
import Carousel from 'react-bootstrap/Carousel'
import ProductCard from './ProductCard'


export default function Home() {
    return (
        <Base title="Home page" description="check-out our cool products">
            <div className="container-fluid d-none d-lg-flex justify-content-around mb-5">
                <Carousel >
                <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-100"
                      style={{height:"200px", width:"200px"}}
                      src="https://storiesflistgv2.azureedge.net/stories/2016/11/harrypotter_inarticle_05.jpg"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Harry Potter Collection</h3>
                      <p>"I solemnly swear I am upto no good"</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-auto"
                      style={{height:"200px"}}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddwIa7EEdstuLtakmsmUdfyzkON9bTd0Wqw&usqp=CAU"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>Game of Thrones Collection</h3>
                      <p>"DACARYS""</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <img
                      className="d-block w-auto"
                      style={{height:"200px"}}
                      src="https://theviralgroup.co.uk/community/wp-content/uploads/2020/06/TVG-Blog-Header-Template-8-1.png"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>F.R.I.E.N.D.S Collection</h3>
                      <p>They don't know that we know they know</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
            </div>
            <div className="container-fluid ">
              {ProductCard()}
            </div>
        </Base>    
    )
}
