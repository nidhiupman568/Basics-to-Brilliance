const rangeSlider = document.querySelector(".slider-container .price-slider");
const rangeInputs = document.querySelectorAll(".range-input input");

let priceGap = 500;

// Adding event listeners to price input elements
const priceInputs = document.querySelectorAll(".price-input input");
priceInputs.forEach(input => {
    input.addEventListener("input", e => {
        let minPrice = parseInt(priceInputs[0].value);
        let maxPrice = parseInt(priceInputs[1].value);
        let diff = maxPrice - minPrice;

        if (minPrice < 0) {
            alert("Minimum price cannot be less than 0");
            priceInputs[0].value = 0;
            minPrice = 0;
        }

        if (maxPrice > 10000) {
            alert("Maximum price cannot be greater than 10000");
            priceInputs[1].value = 10000;
            maxPrice = 10000;
        }

        if (minPrice > maxPrice - priceGap) {
            priceInputs[0].value = maxPrice - priceGap;
            minPrice = maxPrice - priceGap;

            if (minPrice < 0) {
                priceInputs[0].value = 0;
                minPrice = 0;
            }
        }

        if (diff >= priceGap && maxPrice <= rangeInputs[1].max) {
            if (e.target.className === "min-input") {
                rangeInputs[0].value = minPrice;
                let value1 = rangeInputs[0].max;
                rangeSlider.style.left = `${(minPrice / value1) * 100}%`;
            } else {
                rangeInputs[1].value = maxPrice;
                let value2 = rangeInputs[1].max;
                rangeSlider.style.right = `${100 - (maxPrice / value2) * 100}%`;
            }
        }
    });
});

// Add event listeners to range input elements
rangeInputs.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);
        let diff = maxVal - minVal;

        if (diff < priceGap) {
            if (e.target.className === "min-range") {
                rangeInputs[0].value = maxVal - priceGap;
            } else {
                rangeInputs[1].value = minVal + priceGap;
            }
        } else {
            priceInputs[0].value = minVal;
            priceInputs[1].value = maxVal;
            rangeSlider.style.left = `${(minVal / rangeInputs[0].max) * 100}%`;
            rangeSlider.style.right = `${100 - (maxVal / rangeInputs[1].max) * 100}%`;
        }
    });
});
