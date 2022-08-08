
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <!-- CSS only -->
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
//     <script src="https://kit.fontawesome.com/820903d82a.js" crossorigin="anonymous"></script>
//     <link href="reset.css" rel="stylesheet" type="text/css" />
//     <link rel="stylesheet" href="ShopPage.css" type="text/css" />
// </head>
// <body>

    


import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './reset.css';
import './Home.css';

function Home(){
    return(
        <React.StrictMode>
            <nav class="navbar navbar-expand-lg navigation">
            <div class="container">
            <a class="navbar-brand" href="#">VideoSharing</a>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                </ul>
                <span class="navbar-text">
                    Logout
                </span>
            </div>
            </div>
        </nav>

        <div class="container main">
            <div class="row section">

                {/* <!-- <div class="section-gap col-lg-1"></div> --> */}
                <div class="right-section col-lg-12">

                    {/* <!-- <div class="row"> --> */}
                        
                        <div class="productCard col-lg-3">
                            <div class="row productCardImage">
                                <img src="https://i.ytimg.com/vi/idYUy3hf3D0/maxresdefault.jpg" />
                            </div>
                            <div class="row productCardDetails">
                                <p>Show YouTube videos on your own website! | YouTube API Tutorial</p>
                            </div>
                            {/* <div class="row productCardPrice">
                                <p>Just putting a link to the youtube channel is boring, this video shows you how you can work with the YouTube API to show your videos directly on the website itself.</p>
                            </div> */}
                        </div>

                        <div class="productCard col-lg-3">
                        <div class="row productCardImage">
                            <img src="images/product (2).jpg" />
                        </div>
                        <div class="row productCardDetails">
                            <p>Best quality food ever created please buy it. Contact us in chewy.com</p>
                        </div>
                        <div class="row productCardPrice">
                            <p>Price: <span class="priceTag" >$25.99</span></p>
                        </div>
                    </div>
                    

                    <div class="productCard col-lg-3">
                        <div class="row productCardImage">
                            <img src="images/product (3).jpg" />
                        </div>
                        <div class="row productCardDetails">
                            <p>Best quality food ever created please buy it. Contact us in chewy.com</p>
                        </div>
                        <div class="row productCardPrice">
                            <p>Price: <span class="priceTag" >$25.99</span></p>
                        </div>
                    </div>


                    <div class="productCard col-lg-3">
                    <div class="row productCardImage">
                        <img src="images/product (4).jpg" />
                    </div>
                    <div class="row productCardDetails">
                        <p>Best quality food ever created please buy it. Contact us in chewy.com</p>
                    </div>
                    <div class="row productCardPrice">
                        <p>Price: <span class="priceTag" >$25.99</span></p>
                    </div>
                    </div>

                    <div class="productCard col-lg-3">
                        <div class="row productCardImage">
                            <img src="images/product (4).jpg" />
                        </div>
                        <div class="row productCardDetails">
                            <p>Best quality food ever created please buy it. Contact us in chewy.com</p>
                        </div>
                        <div class="row productCardPrice">
                            <p>Price: <span class="priceTag" >$25.99</span></p>
                        </div>
                    </div>
                


                    {/* <!-- </div> --> */}

                </div>
            </div>
        </div>
      </React.StrictMode>
    );
}


export default Home;














