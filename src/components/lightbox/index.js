import React from 'react';
import imageGallery from 'react-image-gallery';

export default class LightBox extends React.Component {
    constructor(props) {
        super(props);

        this.slideIndex = 1;

        this.openModal = this.openModal.bind(this);
        this.currentSlide = this.currentSlide.bind(this);
        this.showSlides = this.showSlides.bind(this);
        this.plusSlides = this.plusSlides.bind(this);
    }

    componentDidMount() {
        let self = this;
        setTimeout(() => {
            self.showSlides(this.slideIndex);
        }, 2000)
    }

    openModal(key) {
        document.getElementById('myModal').style.display = "block";

        this.currentSlide = this.currentSlide.bind(this);
    }

    // Next/previous controls
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    // Thumbnail image controls
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        // debugger
        // var i;
        // var slides = document.getElementsByClassName("mySlides");
        // var dots = document.getElementsByClassName("demo");
        // var captionText = document.getElementById("caption");
        // if (n > slides.length) {this.slideIndex = 1}
        // if (n < 1) {this.slideIndex = slides.length}
        // for (i = 0; i < slides.length; i++) {
        //     slides[i].style.display = "none";
        // }
        // for (i = 0; i < dots.length; i++) {
        //     dots[i].className = dots[i].className.replace(" active", "");
        // }
        // slides[this.slideIndex-1].style.display = "block";
        // dots[this.slideIndex-1].className += " active";
        // captionText.innerHTML = dots[this.slideIndex-1].alt;
    }

    showImageData(images) {
        let output = [];

        images.forEach((image, key) => {
            output.push(
                <div className="mySlides">
                    <div className="numbertext">1 / 4</div>
                    <img src="img1_wide.jpg" style="width:100%" />
                </div>
            )
        })

        return output;
    }

    showThumbnails(images) {
        let output = [];

        images.forEach((image, key) => {
            output.push(
                <div className="column">
                    <img className="demo" src={image} onClick={() => self.currentSlide(key)} alt="Nature" />
                </div>
            )
        });
    }

    render() {
        console.log('##', this.props.images);
        let images = this.props.images.map((name, key) => {
                                            return (
                                                <div className="mySlides" key={key}>
                                                    <div className="numbertext">1 / 4</div>
                                                    <img src={name} style="width:100%" />
                                                </div>
                                            );
                                               
        });
        let thumbnails = this.props.images.map((name, key) => {
                                            return (
                                                <div className="column" key={key}>
                                                    <img className="demo" src={name} onClick={() => self.currentSlide(key)} alt="Nature" />
                                                </div>
                                            );
                                                
        });
        return (
            <div id="myModal" className="modal">
                <span className="close cursor" onClick="closeModal()">&times;</span>
                <div className="modal-content">
                    {
                        images
                    }
                    <div className="caption-container">
                        <p id="caption"></p>
                    </div>

                    {
                        thumbnails
                    }
                </div>
            </div>
        );
    }
}